import React, {JSX, useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {gsap} from "gsap";
import {Card, CardBody, CardHead, Dots, NavButton, NavLayer, SliderWrap} from "./SwiperCarousel.styled";

import type {SwiperCarouselProps} from "@/modules/Timeline/types";
import {usePrefersReducedMotion} from "@/shared/hooks/usePreferReducedMotion";
import {IconArrow} from "@/shared/ui/icon/IconArrow";


export function SwiperCarousel({events, onSlideChange, fading = false,}: SwiperCarouselProps): JSX.Element {
    const swiperRef = useRef<any>(null);
    const [current, setCurrent] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);
    const [appearing, setAppearing] = useState(false);
    const arrowTimer = useRef<number | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const reduced = usePrefersReducedMotion();

    const ARROW_APPEAR_DELAY_MS = reduced ? 0 : 280;

    const MOBILE_BP = 768;

    function applyAutoHeight(sw: any) {
        if (!sw) return;
        const isMobile = window.innerWidth < MOBILE_BP;
        sw.params.autoHeight = isMobile;
        sw.updateAutoHeight(0);
    }

    const updateNav = (s: any) => {
        if (!s) return;
        setCanPrev(!s.isBeginning);
        setCanNext(!s.isEnd);
    };

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0, 0);
            setCurrent(0);
            onSlideChange(0);
            updateNav(swiperRef.current);
        }
    }, [events, onSlideChange]);

    useEffect(() => {
        if (!wrapRef.current || !fading) return;

        if (reduced) {
            gsap.set(".swiper-slide", {opacity: 0, y: 0});
            return;
        }
        const ctx = gsap.context(() => {
            gsap.killTweensOf(".swiper-slide");
            gsap.to(".swiper-slide", {
                opacity: 0,
                y: 24,
                duration: 0.5,
                ease: "power2.inOut",
                stagger: 0.04,
                autoRound: false,
                force3D: true,
                overwrite: "auto",
            });
        }, wrapRef);
        return () => ctx.revert();
    }, [fading, reduced]);

    useEffect(() => {
        if (!wrapRef.current) return;
        if (arrowTimer.current) {
            clearTimeout(arrowTimer.current);
            arrowTimer.current = null;
        }

        if (reduced) {
            gsap.set(".swiper-slide", {opacity: 1, y: 0});
            setAppearing(false);
            return;
        }
        const ctx = gsap.context(() => {
            setAppearing(true);
            arrowTimer.current = window.setTimeout(() => {
                setAppearing(false);
                arrowTimer.current = null;
            }, ARROW_APPEAR_DELAY_MS);

            gsap.killTweensOf(".swiper-slide");
            gsap.set(".swiper-slide", {opacity: 0, y: 24});
            requestAnimationFrame(() => {
                gsap.to(".swiper-slide", {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.06,
                    autoRound: false,
                    force3D: true,
                    overwrite: "auto",
                    clearProps: "transform",
                    onComplete: () => {
                        if (!arrowTimer.current) setAppearing(false);
                    }
                });
            });
        }, wrapRef);
        return () => {
            if (arrowTimer.current) {
                clearTimeout(arrowTimer.current);
                arrowTimer.current = null;
            }
            ctx.revert();
        };
    }, [events, reduced]);

    const uiHidden = fading || appearing;

    return (
        <SliderWrap data-fading={String(fading)} ref={wrapRef}>
            <NavLayer data-hidden={String(uiHidden)}>
                {canPrev && (
                    <NavButton
                        type="button"
                        data-pos="left"
                        onClick={() => {
                            swiperRef.current?.slidePrev();
                            updateNav(swiperRef.current);
                        }}
                        aria-label="Назад"
                    >
                        <IconArrow dir="left"/>
                    </NavButton>
                )}
                {canNext && (
                    <NavButton
                        type="button"
                        data-pos="right"
                        onClick={() => {
                            swiperRef.current?.slideNext();
                            updateNav(swiperRef.current);
                        }}
                        aria-label="Вперёд"
                    >
                        <IconArrow dir="right"/>
                    </NavButton>
                )}
            </NavLayer>

            <Swiper
                spaceBetween={24}
                slidesPerView={3}
                onSwiper={(s) => {
                    swiperRef.current = s;
                    updateNav(s);
                    applyAutoHeight(s);
                }}
                onSlideChange={(s) => {
                    setCurrent(s.realIndex);
                    onSlideChange(s.realIndex);
                    updateNav(s);
                }}
                onTransitionEnd={(s) => updateNav(s)}
                onResize={(s) => {
                    requestAnimationFrame(() => {
                        updateNav(s);
                        applyAutoHeight(s);
                    });
                }}
                onBreakpoint={(s) => {
                    requestAnimationFrame(() => {
                        updateNav(s);
                        applyAutoHeight(s);
                    });
                }}
                onReachBeginning={(s) => {
                    setCanPrev(false);
                    setCanNext(!s.isEnd);
                }}
                onReachEnd={(s) => {
                    setCanNext(false);
                    setCanPrev(!s.isBeginning);
                }}
                breakpoints={{
                    0: {slidesPerView: 1.5, spaceBetween: 25, slidesOffsetAfter: 100},
                    640: {slidesPerView: 2, spaceBetween: 20},
                    1024: {slidesPerView: 3, spaceBetween: 80},
                }}
                autoHeight={false}
                watchOverflow
            >
                {events.map((e, i) => (
                    <SwiperSlide key={`${e.year}-${i}`}>
                        <Card>
                            <CardHead>{e.year}</CardHead>
                            <CardBody>
                                {e.description ? (<p className="desc">{e.description}</p>) : null}
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Dots/>
        </SliderWrap>
    );
}
