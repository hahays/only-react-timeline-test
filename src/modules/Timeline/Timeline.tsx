import React, {useMemo, useRef, useState, useCallback, JSX} from "react";
import { CircleMount, Container, Header, MobileDate, PagerMount, SliderMount, Title } from "./Timeline.styled";
import { timelineData } from "./data";
import { CircleNavigation, CircleNavRef } from "./CircleNavigation/CircleNavigation";
import { DateRangeDisplay } from "./DateRangeDisplay/DateRangeDisplay";
import { SwiperCarousel } from "./SwiperCarousel/SwiperCarousel";
import { CategoryPagerDock } from "@/modules/Timeline/CategoryPager/CategoryPagerDock/CategoryPagerDock";

export function Timeline(): JSX.Element {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [fadingEvents, setFadingEvents] = useState(false);
    const [previewRange, setPreviewRange] = useState<{ start: number; end: number } | null>(null);

    const circleRef = useRef<CircleNavRef>(null);

    const activeCategory = timelineData[activeCategoryIndex];
    const events = activeCategory.events;

    const activeStart = useMemo(() => events?.[0]?.year ?? 0, [events]);
    const activeEnd = useMemo(() => events?.[events.length - 1]?.year ?? 0, [events]);

    const range = previewRange ?? { start: activeStart, end: activeEnd };

    const handleSetCategory = useCallback((i: number) => {
        setActiveCategoryIndex(i);
        setActiveSlideIndex(0);
    }, []);

    const handleBeforeRotate = useCallback((nextIndex: number) => {
        const next = timelineData[nextIndex]?.events ?? [];
        const start = next[0]?.year ?? 0;
        const end = next[next.length - 1]?.year ?? 0;
        setPreviewRange({ start, end });
        setFadingEvents(true);
    }, []);

    const handleRotateComplete = useCallback((nextIndex: number) => {
        setActiveCategoryIndex(nextIndex);
        setPreviewRange(null);
        setTimeout(() => setFadingEvents(false), 400);
    }, []);

    return (
        <Container>
            <Header><Title>Исторические даты</Title></Header>

            <CircleMount>
                <CircleNavigation
                    ref={circleRef}
                    categories={timelineData}
                    activeCategoryIndex={activeCategoryIndex}
                    setActiveCategoryIndex={handleSetCategory}
                    onBeforeRotate={handleBeforeRotate}
                    onRotateComplete={handleRotateComplete}
                />
                <DateRangeDisplay startYear={range.start} endYear={range.end} />
            </CircleMount>

            <MobileDate>
                <DateRangeDisplay startYear={range.start} endYear={range.end} />
            </MobileDate>

            <SliderMount>
                <SwiperCarousel
                    events={events}
                    activeSlideIndex={activeSlideIndex}
                    onSlideChange={setActiveSlideIndex}
                    fading={fadingEvents}
                    category={activeCategory.category}
                />
            </SliderMount>

            <PagerMount>
                <CategoryPagerDock
                    label={`${String(activeCategoryIndex + 1).padStart(2, "0")}/${String(timelineData.length).padStart(2, "0")}`}
                    onPrev={() => circleRef.current?.rotateByStep(-1, timelineData.length)}
                    onNext={() => circleRef.current?.rotateByStep(1, timelineData.length)}
                    disablePrev={activeCategoryIndex === 0}
                    disableNext={activeCategoryIndex === timelineData.length - 1}
                    total={timelineData.length}
                    activeIndex={activeCategoryIndex}
                    onDotClick={(i) => circleRef.current?.rotateToIndex(i)}
                />
            </PagerMount>
        </Container>
    );
}
