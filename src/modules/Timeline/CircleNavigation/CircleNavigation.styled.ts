import styled from "styled-components";

export const Circle = styled.div`
    position: relative;
    width: 530px;
    height: 530px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 1px solid var(--color-border-strong);
    z-index: 20;
`;

export const CircleInner = styled.div`
    position: absolute;
    inset: 0;
    border-radius: 50%;
    will-change: transform;
    z-index: 21;
`;

export const Upright = styled.div`
    position: absolute;
    inset: 0;
    transform: rotate(calc(-1 * var(--rot, 0deg)));
    will-change: transform;
    pointer-events: none;
`;

export const Point = styled.button`
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--color-text-weak);
    border: none;
    cursor: pointer;
    z-index: 32;
    padding: 2px;
    display: block;
    transition: width .3s ease, height .3s ease, background .3s ease, border-color .3s ease;

    &:hover,
    &[data-active="true"] {
        width: 56px;
        height: 56px;
        background: var(--color-bg);
        border: 1px solid #303E58;
    }
`;

export const DotNumber = styled.span`
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    font-family: "PT Sans", sans-serif;
    font-size: 20px;
    line-height: 1;
    color: var(--color-ink);
    opacity: 0;
    transition: opacity .2s ease;

    .Point:hover &,
    [data-active="true"] & { opacity: 1; }
`;

export const Tooltip = styled.span`
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(48px, -50%);
    font-family: "PT Sans", sans-serif;
    font-size: 20px;
    line-height: 1.1;
    color: #2B4468;
    white-space: nowrap;
`;
