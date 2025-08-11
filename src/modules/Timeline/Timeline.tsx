import React, {useMemo, useRef, useState} from "react";
import {CircleMount, Container, Header, MobileDate, PagerMount, SliderMount, Title} from "./Timeline.styled";
import {timelineData} from "./data";
import {CircleNavigation, CircleNavRef} from "./CircleNavigation/CircleNavigation";
import {DateRangeDisplay} from "./DateRangeDisplay/DateRangeDisplay";
import {SwiperCarousel} from "./SwiperCarousel/SwiperCarousel";
import {CategoryPagerDock} from "@/modules/Timeline/CategoryPager/CategoryPagerDock/CategoryPagerDock";

export const Timeline: React.FC = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [showActiveLabel, setShowActiveLabel] = useState(false);
    const [fadingEvents, setFadingEvents] = useState(false);

    const circleRef = useRef<CircleNavRef>(null);

    const activeCategory = timelineData[activeCategoryIndex];
    const events = activeCategory.events;

    const startYear = useMemo(() => events?.[0]?.year ?? 0, [events]);
    const endYear = useMemo(() => events?.[events.length - 1]?.year ?? 0, [events]);

    return (
        <Container>
            <Header><Title>Исторические даты</Title></Header>

            <CircleMount>
                <CircleNavigation
                    ref={circleRef}
                    categories={timelineData}
                    activeCategoryIndex={activeCategoryIndex}
                    setActiveCategoryIndex={(i) => {
                        setActiveCategoryIndex(i);
                        setActiveSlideIndex(0);
                    }}
                    onBeforeRotate={() => {
                        setShowActiveLabel(false);
                        setFadingEvents(true);
                    }}
                    onRotateComplete={() => {
                        setTimeout(() => {
                            setShowActiveLabel(true);
                            setFadingEvents(false);
                        }, 700);
                    }}
                />
                <DateRangeDisplay startYear={startYear} endYear={endYear}/>
            </CircleMount>

            <MobileDate>
                <DateRangeDisplay startYear={startYear} endYear={endYear}/>
            </MobileDate>


            <SliderMount>
                <SwiperCarousel
                    events={events}
                    activeSlideIndex={activeSlideIndex}
                    onSlideChange={setActiveSlideIndex}
                    fading={fadingEvents}
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
};
