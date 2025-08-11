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
        font-family: "PT Sans", sans-serif;
        font-weight: 700;
        font-size: 200px;
        line-height: 160px;
        letter-spacing: -0.02em;
    }

    span:first-child {
        color: #3A62F8;
    }

    span:last-child {
        color: #F4599D;
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