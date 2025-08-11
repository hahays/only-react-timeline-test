import styled from "styled-components";

export const Container = styled.section`
    position: relative;
    width: calc(100% - 480px);
    max-width: none;
    height: 100vh;
    margin-left: 320px;
    margin-right: 160px;
    border-left: 1px solid rgba(13, 34, 70, 0.08);
    border-right: 1px solid rgba(13, 34, 70, 0.08);
    background: #F4F5F9;
    overflow: hidden;
    --circle-top: 215px;

    &::before, &::after {
        content: "";
        position: absolute;
        background: rgba(13, 34, 70, .08);
        z-index: 0;
    }


    @media (max-width: 768px) {
        height: auto;
        min-height: 100vh;
        margin: 0;
        width: 100%;
        &::before, &::after {
            content: none;
        }
    }
`;


export const Header = styled.header`
    position: absolute;
    left: 0;
    top: 170px;
    padding-left: 78px;
    align-items: center;
    border-left: 5px solid;
    border-image: linear-gradient(#3877EE, #EF5DA8) 1;
    max-width: 520px;
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
        position: static;
        left: auto;
        top: auto;
        margin: 60px 20px 56px;
        padding-left: 0;
        border-left: 0;
        max-width: 260px;
    }
`;

export const Title = styled.h1`
    margin: 0;
    font-family: "PT Sans", sans-serif;
    font-size: 56px;
    font-weight: 700;
    line-height: 120%;
    color: #2b4468;
    pointer-events: none;

    @media (max-width: 768px) {
        font-size: 24px;
        line-height: 1.2;
        white-space: normal;
        word-break: break-word;
        max-width: 220px;
        display: block;
    }
`;
export const CircleMount = styled.div`
    position: absolute;
    left: 50%;
    top: var(--circle-top);
    transform: translateX(-50%);
    width: 530px;
    height: 530px;
    z-index: 3;

    &::before, &::after {
        content: "";
        position: absolute;
        background: rgba(13, 34, 70, 0.08);
        z-index: 0;
    }

    &::before {
        left: 0;
        right: 0;
        top: 50%;
        height: 1px;
        transform: translateY(-50%);
    }

    &::after {
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1px;
        transform: translateX(-50%);
    }

    @media (max-width: 768px) {
        display: none;
    }
`;


export const PagerMount = styled.div`
    position: absolute;
    left: 118px;
    top: calc(var(--circle-top) + 350px + 75px);
    z-index: 5;

    @media (max-width: 768px) {
        position: relative;
        left: auto;
        top: auto;
        margin: 20px;
    }
`;
export const SliderMount = styled.div`
    position: absolute;
    left: 40px;
    right: 40px;
    top: calc(var(--circle-top) + 530px + 24px);
    bottom: 104px;

    @media (max-width: 768px) {
        position: relative;
        left: auto;
        right: auto;
        top: auto;
        bottom: auto;
        padding: 0 20px;
        margin-bottom: 78px;
    }
`;


export const MobileDate = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;