import styled from "styled-components";

export const SliderWrap = styled.div`
    position: relative;
    overflow: hidden;
    padding: 0 80px;

    .swiper-slide {
        will-change: transform, opacity;
        width: 420px;
    }

    &[data-fading="true"] { pointer-events: none; }
    &[data-fading="false"] { pointer-events: auto; }

    @media (max-width: 768px) {
        overflow: visible;

        .swiper-slide {
            opacity: .35;
            will-change: transform, opacity;
        }
        .swiper-slide.swiper-slide-active { opacity: 1; }

        padding: 0;
        height: 114px;
        border-top: 1px solid var(--color-divider);
    }
`;

export const NavLayer = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    opacity: 1;
    transition: opacity .3s ease;
    &[data-hidden="true"] { opacity: 0; }
    @media (max-width: 768px) { display: none; }
`;

export const NavButton = styled.button`
    position: absolute;
    top: 50%;
    pointer-events: auto;
    transform: translate3d(0, -50%, 0);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: #fff;
    color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 6px 18px ${({ theme }) => theme.colors.shadow};
    font-size: 18px;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: box-shadow .2s ease, transform .1s ease;
    z-index: 4;

    &[data-pos="left"] { left: 9px; }
    &[data-pos="right"] { right: 24px; }

    &:hover { box-shadow: 0 10px 28px ${({ theme }) => theme.colors.shadowHover}; }
    &:active { transform: translateY(-50%) scale(.98); }
`;

export const Card = styled.article`
    max-width: 420px;
    transition: box-shadow .25s ease, transform .25s ease;
    padding: 0;

    &:hover { transform: translateY(-2px); }

    @media (max-width: 768px) {
        height: auto;
        padding: 16px 0;
    }
`;

export const CardHead = styled.div`
    color: ${({ theme }) => theme.colors.accent};
    font-family: "Bebas Neue", sans-serif;
    font-size: 25px;
    font-weight: 400;
    line-height: 1;

    @media (max-width: 768px) { font-size: 16px; }
`;

export const CardBody = styled.div`
    font-family: "PT Sans", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    color: var(--color-text-weak);

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 20px;
    }
`;

export const Dots = styled.div`
    display: none;
`;
