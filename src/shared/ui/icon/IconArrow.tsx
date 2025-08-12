import React, {JSX} from "react";
import {IconArrowProps} from "@/modules/Timeline/types";


export function IconArrow({dir, size = 18, strokeWidth = 2}: IconArrowProps): JSX.Element {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            {dir === "left" ? (
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
                      strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
                      strokeLinejoin="round"/>
            )}
        </svg>
    );
}
