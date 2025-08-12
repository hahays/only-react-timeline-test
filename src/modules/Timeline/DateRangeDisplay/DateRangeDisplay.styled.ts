import styled from "styled-components";

export const DateRange = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 24px;
    align-items: center;
    z-index: 12;
    pointer-events: none;

    span {
        font-variant-numeric: tabular-nums;
        font-family: "PT Sans", sans-serif;
        font-weight: 700;
        min-width: 4ch;
        font-size: 200px;
        line-height: 160px;
        will-change: contents;
        letter-spacing: -0.02em;
    }

    span:first-child {
        color: var(--range-from);
    }

    span:last-child {
        color: var(--range-to);
    }

    @media (max-width: 768px) {
        position: static;
        transform: none;
        width: 100%;
        justify-content: space-between;
        gap: 0px;
        margin-bottom: 58px;
        padding: 0 20px;
        box-sizing: border-box;

        span {
            font-size: 56px;
            line-height: 1;
            letter-spacing: -0.02em;
        }
    }
`;
