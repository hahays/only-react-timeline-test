import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import "swiper/css";

import {
    TimelineWrapper,
    Container,
    Header,
    Title,
    DateRange,
    Circle,
    CircleInner,
    Category,
    SliderWrapper,
    DesktopLayout,
    EventCard,
    EventTitle,
    EventDescription,
    Navigation,
    ArrowButton,
    ButtonText,
    MobileLayout,
    MobileHeader,
    MobileCard,
    MobileRange,
    MobileFooter,
    Counter,
    DotsContainer,
    Dot,
} from "./Timeline.styled";

interface Event {
    year: number;
    description: string;
    category: string;
}

const events: Event[] = [
    {
        year: 2015,
        description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
        category: "Наука",
    },
    {
        year: 2016,
        description: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
        category: "Наука",
    },
    {
        year: 2017,
        description: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
        category: "Наука",
    },
    {
        year: 2018,
        description: "Запуск космического телескопа James Webb",
        category: "Наука",
    },
    {
        year: 2019,
        description: "Первая фотография черной дыры, сделанная Event Horizon Telescope",
        category: "Наука",
    },
    {
        year: 2022,
        description: "Успешный запуск миссии Artemis 1 к Луне",
        category: "Наука",
    },
];

const SwiperNavButtons: React.FC = () => {
    const swiper = useSwiper();
    return (
        <Navigation>
            <ArrowButton onClick={() => swiper.slidePrev()}>
                <ButtonText>&lt;</ButtonText>
            </ArrowButton>
            <ArrowButton onClick={() => swiper.slideNext()}>
                <ButtonText>&gt;</ButtonText>
            </ArrowButton>
        </Navigation>
    );
};

export const Timeline: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const startYearRef = useRef(null);
    const endYearRef = useRef(null);

    const currentYear = events[activeSlideIndex].year;
    const startYear = events[0].year;
    const endYear = events[events.length - 1].year;
    const totalSlides = events.length;
    const progress = (activeSlideIndex / (totalSlides - 1)) * 360;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            const tl = gsap.timeline();
            tl.fromTo(startYearRef.current, { x: 0 }, { x: 20, duration: 0.5, ease: "power2.out" }, "<")
                .fromTo(endYearRef.current, { x: 0 }, { x: -20, duration: 0.5, ease: "power2.out" }, "<");
        }
    }, [currentYear, isMobile]);

    return (
        <TimelineWrapper>
            <Container>
                <Header>
                    <Title>Исторические даты</Title>
                </Header>
                {!isMobile ? (
                    <DesktopLayout>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentYear}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <DateRange>
                                    <motion.div
                                        key={`start-${currentYear}`}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        ref={startYearRef}
                                    >
                                        {startYear}
                                    </motion.div>
                                    <motion.div
                                        key={`end-${currentYear}`}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        ref={endYearRef}
                                    >
                                        {endYear}
                                    </motion.div>
                                </DateRange>
                            </motion.div>
                        </AnimatePresence>
                        <Circle>
                            <CircleInner style={{ transform: `rotate(${progress}deg)` }} />
                            <Category>6. Наука</Category>
                        </Circle>
                        <SliderWrapper>
                            <Swiper
                                spaceBetween={40}
                                slidesPerView={3}
                                onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
                                onSwiper={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
                            >
                                {events.map((event, index) => (
                                    <SwiperSlide key={index}>
                                        <EventCard $isActive={index === activeSlideIndex}>
                                            <EventTitle>{event.year}</EventTitle>
                                            <EventDescription>{event.description}</EventDescription>
                                        </EventCard>
                                    </SwiperSlide>
                                ))}
                                <SwiperNavButtons />
                            </Swiper>
                        </SliderWrapper>
                    </DesktopLayout>
                ) : (
                    <MobileLayout>
                        <MobileHeader>
                            <MobileRange>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={startYear}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {startYear}
                                    </motion.span>
                                </AnimatePresence>
                                <span>—</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={endYear}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {endYear}
                                    </motion.span>
                                </AnimatePresence>
                            </MobileRange>
                        </MobileHeader>
                        <Swiper
                            spaceBetween={16}
                            slidesPerView={1}
                            onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
                        >
                            {events.map((event, index) => (
                                <SwiperSlide key={index}>
                                    <MobileCard>
                                        <EventTitle>{event.year}</EventTitle>
                                        <EventDescription>{event.description}</EventDescription>
                                    </MobileCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <MobileFooter>
                            <Counter>{`${String(activeSlideIndex + 1).padStart(2, '0')}/${String(totalSlides).padStart(2, '0')}`}</Counter>
                            <SwiperNavButtons />
                            <DotsContainer>
                                {events.map((_, index) => (
                                    <Dot key={index} $isActive={index === activeSlideIndex} />
                                ))}
                            </DotsContainer>
                        </MobileFooter>
                    </MobileLayout>
                )}
            </Container>
        </TimelineWrapper>
    );
};