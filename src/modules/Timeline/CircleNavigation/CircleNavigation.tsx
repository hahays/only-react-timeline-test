import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState,} from "react";
import {Circle, CircleInner, DotNumber, Point, Tooltip, Upright} from "./CircleNavigation.styled";
import {gsap} from "gsap";
import {CircleNavigationProps} from "@/modules/Timeline/types";


const SIZE = 530;
const RADIUS = SIZE / 2;
const SLOT_ANGLE = 60;
const ANGLE_OFFSET = -30;
const START_AT = 330 + ANGLE_OFFSET;


const baseAngleForIndex = (i: number) => (START_AT + i * SLOT_ANGLE) % 360;

const targetRotationCW = (currentRot: number, index: number) => {
    let desired = START_AT - baseAngleForIndex(index);
    while (desired <= currentRot) desired += 360;
    return desired;
};

export type CircleNavRef = {
    rotateToIndex: (index: number) => Promise<void>;
    rotateByStep: (step: number, total: number) => Promise<number>;
};

export const CircleNavigation = forwardRef<CircleNavRef, CircleNavigationProps>(function CircleNavigation(
    {categories, activeCategoryIndex, setActiveCategoryIndex, onBeforeRotate, onRotateComplete},
    ref
) {
    const circleRef = useRef<HTMLDivElement>(null);
    const [rotationAbs, setRotationAbs] = useState(0);
    const [showLabel, setShowLabel] = useState(false);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [isRotating, setIsRotating] = useState(false);


    useEffect(() => {
        if (circleRef.current) {
            circleRef.current.style.setProperty("--rot", `${rotationAbs}deg`);
        }
    }, [rotationAbs]);

    const animateTo = (desired: number) =>
        new Promise<void>((resolve) => {
            setIsRotating(true);
            setShowLabel(false);
            gsap.to(circleRef.current, {
                rotation: desired,
                duration: 1.25,
                ease: "power4.inOut",
                onUpdate: () => {
                    const v = gsap.getProperty(circleRef.current!, "rotation") as number;
                    circleRef.current!.style.setProperty("--rot", `${v}deg`);
                },
                onComplete: () => {
                    setRotationAbs(desired);
                    setIsRotating(false);
                    resolve();
                },
            });
        });

    const rotateToIndex = async (index: number) => {
        if (index === activeCategoryIndex) return;

        onBeforeRotate?.(index);
        setPreviewIndex(index);

        const desired = targetRotationCW(rotationAbs, index);
        await animateTo(desired);

        setPreviewIndex(null);
        setShowLabel(true);

        setActiveCategoryIndex(index);
        onRotateComplete?.(index);
    };

    const rotateByStep = async (step: number, total: number) => {
        const next = (activeCategoryIndex + step + total) % total;
        await rotateToIndex(next);
        return next;
    };

    useImperativeHandle(ref, () => ({
        rotateToIndex,
        rotateByStep,
    }));

    return (
        <Circle>
            <CircleInner ref={circleRef}>
                {categories.map((cat: any, index: number) => {
                    const angle = baseAngleForIndex(index);
                    const isActive = index === activeCategoryIndex;
                    const isPreview = previewIndex === index;
                    const isActiveVisual = isPreview || (!isRotating && isActive);
                    return (
                        <Point
                            className="Point"
                            key={cat.category + index}
                            data-active={String(isActiveVisual)}
                            style={{
                                transform: `translate(-50%,-50%) rotate(${angle}deg) translate(${RADIUS}px) rotate(${-angle}deg)`,
                            }}
                            onClick={() => rotateToIndex(index)}
                        >
                            <Upright>
                                <DotNumber>{index + 1}</DotNumber>
                                {isActive && showLabel && !isRotating && <Tooltip>{cat.category}</Tooltip>}
                            </Upright>
                        </Point>
                    );
                })}
            </CircleInner>
        </Circle>
    );
});
