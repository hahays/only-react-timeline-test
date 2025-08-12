import React, {JSX, useEffect, useRef, useState} from "react";
import {DateRange} from "./DateRangeDisplay.styled";

import type {DateRangeDisplayProps} from "@/modules/Timeline/types";
import {usePrefersReducedMotion} from "@/shared/hooks/usePreferReducedMotion";

type RAF = number;

function easeOutCubic(t: number): number {
    const value = 1 - Math.pow(1 - t, 3);
    return value;
}

export function DateRangeDisplay({startYear, endYear}: DateRangeDisplayProps): JSX.Element {
    const [from, setFrom] = useState(startYear);
    const [to, setTo] = useState(endYear);

    const rafFrom = useRef<RAF | null>(null);
    const rafTo = useRef<RAF | null>(null);
    const reduced = usePrefersReducedMotion();

    const animateInt = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        getCurrent: () => number,
        target: number,
        rafRef: React.MutableRefObject<RAF | null>,
        durationMs: number,
        delayMs: number
    ) => {
        if (reduced) {
            setter(target);
            return;
        }
        const startValue = getCurrent();
        if (startValue === target) {
            setter(target);
            return;
        }
        const startAt = performance.now() + delayMs;
        const endAt = startAt + durationMs;
        const tick = (now: number) => {
            if (now < startAt) {
                rafRef.current = requestAnimationFrame(tick);
                return;
            }
            const t = Math.min(1, (now - startAt) / (endAt - startAt));
            const v = Math.round(startValue + (target - startValue) * easeOutCubic(t));
            setter(v);
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        if (rafFrom.current) cancelAnimationFrame(rafFrom.current);
        animateInt(setFrom, () => from, startYear, rafFrom, 600, 0);
        return () => {
            if (rafFrom.current) cancelAnimationFrame(rafFrom.current);
        };
    }, [startYear, reduced]);

    useEffect(() => {
        if (rafTo.current) cancelAnimationFrame(rafTo.current);
        animateInt(setTo, () => to, endYear, rafTo, 700, reduced ? 0 : 120);
        return () => {
            if (rafTo.current) cancelAnimationFrame(rafTo.current);
        };
    }, [endYear, reduced]);

    return (
        <DateRange aria-live="polite" aria-atomic="true">
            <span>{from}</span>
            <span>{to}</span>
        </DateRange>
    );
}
