import styled from "styled-components";

interface SliderWrapProps {
    fading?: boolean;
}

export const SliderWrap = styled.div<SliderWrapProps>`
    position: relative;
    overflow: visible;
    padding: 0 80px;

    .swiper-slide {
        width: 420px;
    }

    &[data-fading="true"] {
        pointer-events: none;
    }

    &[data-fading="false"] {
        pointer-events: auto;
    }

    @media (max-width: 768px) {

        .swiper-slide {
            opacity: .35;
            transition: opacity .25s ease;
        }

        .swiper-slide.swiper-slide-active {
            opacity: 1;
        }

        padding: 0;
        height: 114px;
        border-top: 1px solid #C7CDD9;
    }
`;

export const NavLayer = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 3;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;

    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(13, 34, 70, .16);
    background: #fff;
    color: #3877EE;
    font-size: 18px;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(26, 78, 155, .16);
    transition: box-shadow .2s ease, transform .1s ease;
    z-index: 4;

    &[data-pos="left"] {
        left: 24px;
    }

    &[data-pos="right"] {
        right: 24px;
    }

    &:hover {
        box-shadow: 0 10px 28px rgba(26, 78, 155, .22);
    }

    &:active {
        transform: translateY(-50%) scale(.98);
    }

    button {
        pointer-events: auto;
        margin: 0 80px;
    }

`;


export const Card = styled.article`
    max-width: 420px;
    transition: box-shadow .25s ease, transform .25s ease;
    padding: 0;

    &:hover {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        height: auto;
        padding: 16px 0;
    }
`;

export const CardHead = styled.div`
    color: #3877EE;
    font-family: "Bebas Neue", sans-serif;
    font-size: 25px;
    font-weight: 400;
    line-height: 1;


    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const CardBody = styled.div`
    font-family: "PT Sans", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    color: #42567A;

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 20px;
    }
`;

export const Dots = styled.div`
    display: none;
`;
