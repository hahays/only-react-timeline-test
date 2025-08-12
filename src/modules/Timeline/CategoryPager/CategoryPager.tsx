import React from "react";
import {Btn, Buttons, Label, Pager} from "./CategoryPager.styled";
import {CategoryPagerProps} from "@/modules/Timeline/types";



export const CategoryPager: React.FC<CategoryPagerProps> = ({
                                                   label,
                                                   onPrev,
                                                   onNext,
                                                   disablePrev = false,
                                                   disableNext = false,
                                               }) => {
    return (
        <Pager>
            {label ? <Label>{label}</Label> : null}
            <Buttons>
                <Btn aria-label="Предыдущая тема" onClick={onPrev} disabled={disablePrev}>‹</Btn>
                <Btn aria-label="Следующая тема" onClick={onNext} disabled={disableNext}>›</Btn>
            </Buttons>
        </Pager>
    );
};
