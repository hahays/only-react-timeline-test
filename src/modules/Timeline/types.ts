export interface TimelineEvent {
    year: number;
    title?: string;
    description?: string;
    text?: string;
}

export interface TimelineCategory {
    category: string;
    events: TimelineEvent[];
}

export interface CategoryPagerProps {
    label?: string;
    onPrev: () => void | Promise<any>;
    onNext: () => void | Promise<any>;
    disablePrev?: boolean;
    disableNext?: boolean;
}

export interface SwiperCarouselProps {
    events: TimelineEvent[];
    activeSlideIndex: number;
    onSlideChange: (index: number) => void;
    fading?: boolean;
    category: string;
}

export interface DateRangeDisplayProps {
    startYear: number;
    endYear: number;
}

export interface CircleNavigationProps {
    categories: TimelineCategory[];
    activeCategoryIndex: number;
    setActiveCategoryIndex: (i: number) => void;
    onBeforeRotate?: (nextIndex: number) => void;
    onRotateComplete?: (nextIndex: number) => void;
}

export interface IconArrowProps {
    dir: "left" | "right";
    size?: number;
    strokeWidth?: number
}