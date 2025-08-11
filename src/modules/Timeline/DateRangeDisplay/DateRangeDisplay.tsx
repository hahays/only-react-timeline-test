import React, {useEffect, useState} from "react";
import {DateRange} from "./DateRangeDisplay.styled";

type Props = { startYear: number; endYear: number };

export const DateRangeDisplay: React.FC<Props> = ({startYear, endYear}) => {
    const [from, setFrom] = useState(startYear);
    const [to, setTo] = useState(endYear);

    useEffect(() => {
        let id = 0;
        const step = startYear > from ? 1 : -1;
        const tick = () => {
            setFrom((prev) => {
                const next = prev + step;
                if ((step > 0 && next >= startYear) || (step < 0 && next <= startYear)) {
                    cancelAnimationFrame(id);
                    return startYear;
                }
                return next;
            });
            id = requestAnimationFrame(tick);
        };
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [startYear]);

    useEffect(() => {
        let id = 0;
        const t0 = performance.now();
        const run = (t: number) => {
            if (t - t0 < 140) {
                id = requestAnimationFrame(run);
                return;
            }
            const step = endYear > to ? 1 : -1;
            setTo((prev) => {
                const next = prev + step;
                if ((step > 0 && next >= endYear) || (step < 0 && next <= endYear)) {
                    cancelAnimationFrame(id);
                    return endYear;
                }
                return next;
            });
            id = requestAnimationFrame(run);
        };
        id = requestAnimationFrame(run);
        return () => cancelAnimationFrame(id);
    }, [endYear]);

    return (
        <DateRange>
            <span>{from}</span>
            <span>{to}</span>
        </DateRange>
    );
};
