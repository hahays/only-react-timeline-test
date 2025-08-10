import styled, { css } from "styled-components";

interface CardProps {
    $isActive?: boolean;
}

interface DotProps {
    $isActive?: boolean;
}

export const TimelineWrapper = styled.div`
    background: #f0f2f5;
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    position: relative;
    overflow: hidden;

    &:before, &:after {
        content: '';
        position: absolute;
        background: #e0e0e0;
    }

    &:before {
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        transform: translateY(-50%);
    }

    &:after {
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1px;
        transform: translateX(-50%);
    }

    @media (max-width: 768px) {
        padding: 20px;
        &:before, &:after {
            display: none;
        }
    }
`;

export const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    background: #fff;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const Header = styled.header`
    padding-left: 20px;
    border-left: 4px solid;
    border-image: linear-gradient(to bottom, #F971C2, #1A4E9B) 1;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        border-left: none;
        padding-left: 0;
        text-align: center;
    }
`;

export const Title = styled.h2`
    font-size: 48px;
    font-weight: 700;
    color: #333;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export const DesktopLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    gap: 40px;
    align-items: center;
    position: relative;
`;

// Переименован из `Range` в `DateRange`
export const DateRange = styled.div`
    grid-column: 1 / 2;
    font-size: 120px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    color: #1a4e9b;
    position: relative;
    z-index: 10;
`;

export const Circle = styled.div`
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CircleInner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border-right: 2px dashed #f971c2;
    transform-origin: 0 0;
    pointer-events: none;
`;

export const Category = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #888;
`;

export const SliderWrapper = styled.div`
    grid-column: 1 / 3;
    position: relative;
    width: 100%;
`;

export const EventCard = styled.div<CardProps>`
    background: #f0f2f5;
    padding: 20px;
    border-radius: 12px;
    transition: all 0.3s ease;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${(props) =>
            props.$isActive &&
            css`
                background: #1a4e9b;
                color: #fff;
            `}
`;

export const EventTitle = styled.h3`
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 8px;
`;

export const EventDescription = styled.p`
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
`;

export const Navigation = styled.div`
    display: flex;
    gap: 16px;
    position: absolute;
    bottom: -60px;
    right: 0;
    z-index: 10;
`;

export const ArrowButton = styled.button`
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #f0f2f5;
    }
`;

export const ButtonText = styled.span`
    font-size: 20px;
    color: #333;
`;

export const MobileLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MobileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const MobileRange = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #1a4e9b;
    display: flex;
    gap: 10px;
`;

export const MobileCard = styled.div`
    padding: 20px;
    background: #f0f2f5;
    border-radius: 12px;
`;

export const MobileFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;

export const Counter = styled.span`
    font-size: 16px;
    color: #888;
`;

export const DotsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const Dot = styled.span<DotProps>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ddd;
    transition: background-color 0.3s ease;

    ${(props) =>
            props.$isActive &&
            css`
                background-color: #f971c2;
            `}
`;