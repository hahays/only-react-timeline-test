import React from "react";
import {DesktopOnly, Dots, MobileRow, Wrapper} from "./CategoryPagerDock.styled";
import {CategoryPager} from "../CategoryPager";

type Props = {
    label: string;
    onPrev: () => void | Promise<any>;
    onNext: () => void | Promise<any>;
    disablePrev?: boolean;
    disableNext?: boolean;
    total: number;
    activeIndex: number;
    onDotClick: (i: number) => void;
};

export const CategoryPagerDock: React.FC<Props> = ({
                                                       label, onPrev, onNext, disablePrev = false, disableNext = false,
                                                       total, activeIndex, onDotClick
                                                   }) => {
    return (
        <Wrapper>
            <DesktopOnly>
                <CategoryPager
                    label={label}
                    onPrev={onPrev}
                    onNext={onNext}
                    disablePrev={disablePrev}
                    disableNext={disableNext}
                />
            </DesktopOnly>

            <MobileRow>
                <CategoryPager
                    label={label}
                    onPrev={onPrev}
                    onNext={onNext}
                    disablePrev={disablePrev}
                    disableNext={disableNext}
                />
                <Dots>
                    {Array.from({length: total}).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            data-active={String(i === activeIndex)}
                            onClick={() => onDotClick(i)}
                            aria-label={`Перейти к теме ${i + 1}`}
                        />
                    ))}
                </Dots>
            </MobileRow>
        </Wrapper>
    );
};