import styled from "styled-components";

export const Pager = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    @media (max-width: 768px) { gap: 8px; }
`;

export const Label = styled.div`
    font-family: "PT Sans", sans-serif;
    font-size: 14px;
    color: var(--color-text-weak);
`;

export const Buttons = styled.div`
    display: flex;
    gap: 20px;
    @media (max-width: 768px) { gap: 12px; }
`;

export const Btn = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 999px;
    border: 1px solid var(--color-border-strong);
    background: #fff;
    color: var(--color-text-weak);
    font-size: 20px;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: box-shadow .2s ease, transform .1s ease, opacity .2s ease;

    &:hover:not(:disabled) { box-shadow: 0 4px 18px var(--shadow); }
    &:active:not(:disabled) { transform: scale(.98); }
    &:disabled { opacity: .4; cursor: default; }

    @media (max-width: 768px) {
        width: 31px;
        height: 31px;
        font-size: 16px;
        background: var(--color-bg);
    }
`;