import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
`;

export const DesktopOnly = styled.div`
    display: block;
    @media (max-width: 768px) { display: none; }
`;

export const MobileRow = styled.div`
    display: none;
    @media (max-width: 768px) {
        position: relative;
        display: flex;
        align-items: center;
        min-height: 50px;
    }
`;

export const Dots = styled.div`
    display: none;
    @media (max_width: 768px) { display: none; }
    @media (max-width: 768px) {
        display: flex;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 50%;
        translate: 0 -50%;

        button {
            width: 14px;
            height: 14px;
            border: 0;
            padding: 0;
            background: transparent;
            position: relative;
            cursor: pointer;
        }

        button::before {
            content: "";
            position: absolute;
            inset: 0;
            margin: 4px;
            border-radius: 50%;
            background: var(--color-text-weak);
            opacity: 0.4;
            transition: opacity .2s ease, transform .2s ease;
        }

        button[data-active="true"]::before {
            background: var(--color-text-weak);
            opacity: 1;
            transform: scale(1.1);
        }
    }
`;