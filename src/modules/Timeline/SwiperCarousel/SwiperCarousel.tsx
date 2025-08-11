import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {gsap} from "gsap";
import {Card, CardBody, CardHead, Dots, NavButton, NavLayer, SliderWrap} from "./SwiperCarousel.styled";

type Props = {
    events: any[];
    activeSlideIndex: number;
    onSlideChange: (index: number) => void;
    fading?: boolean;
};

export const SwiperCarousel: React.FC<Props> = ({
                                                    events,
                                                    onSlideChange,
                                                    fading = false,
                                                }) => {
    const swiperRef = useRef<any>(null);
    const [current, setCurrent] = useState(0);

    const wrapRef = useRef<HTMLDivElement>(null);
    const prevFading = useRef(fading);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0, 0);
            setCurrent(0);
        }
    }, [events]);

    useEffect(() => {
        if (!wrapRef.current) return;
        if (fading && !prevFading.current) {
            const ctx = gsap.context(() => {
                gsap.killTweensOf(".swiper-slide");
                gsap.to(".swiper-slide", {
                    opacity: 0,
                    y: 24,
                    duration: 0.5,
                    ease: "power2.inOut",
                    stagger: 0.04,
                    overwrite: "auto",
                });
            }, wrapRef);
            return () => ctx.revert();
        }
        prevFading.current = fading;
    }, [fading]);

    useEffect(() => {
        if (!wrapRef.current || fading) return;
        const ctx = gsap.context(() => {
            gsap.killTweensOf(".swiper-slide");
            gsap.set(".swiper-slide", {opacity: 0, y: 24});
            gsap.to(".swiper-slide", {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.06,
                overwrite: "auto",
            });
        }, wrapRef);
        return () => ctx.revert();
    }, [events, fading]);

    const total = events.length;
    const canPrev = current > 0;
    const canNext = current < total - 1;

    return (
        <SliderWrap fading={fading} ref={wrapRef}>
            <NavLayer>
                {canPrev && (
                    <NavButton data-pos="left" onClick={() => swiperRef.current?.slidePrev()} aria-label="Назад">
                        ‹
                    </NavButton>
                )}
                {canNext && (
                    <NavButton data-pos="right" onClick={() => swiperRef.current?.slideNext()} aria-label="Вперёд">
                        ›
                    </NavButton>
                )}
            </NavLayer>

            <Swiper
                spaceBetween={24}
                slidesPerView={3}
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => {
                    setCurrent(s.realIndex);
                    onSlideChange(s.realIndex);
                }}
                breakpoints={{
                    0: {slidesPerView: 1.4, spaceBetween: 20},
                    640: {slidesPerView: 1.6, spaceBetween: 20},
                    1024: {slidesPerView: 3, spaceBetween: 24},
                }}
                autoHeight
            >
                {events.map((e: any, i: number) => (
                    <SwiperSlide key={`${e.year}-${i}`}>
                        <Card>
                            <CardHead>{e.year}</CardHead>
                            <CardBody>
                                <strong>{e.title || ""}</strong>
                                {e.description ? (<><br/>{e.description}</>) : null}
                            </CardBody>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Dots/>
        </SliderWrap>
    );
};
