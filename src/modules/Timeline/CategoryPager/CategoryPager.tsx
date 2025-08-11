import React from "react";
import {Btn, Buttons, Label, Pager} from "./CategoryPager.styled";

type Props = {
    label?: string;
    onPrev: () => void | Promise<any>;
    onNext: () => void | Promise<any>;
    disablePrev?: boolean;
    disableNext?: boolean;
};

export const CategoryPager: React.FC<Props> = ({
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
