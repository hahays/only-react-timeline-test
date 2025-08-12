import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --rot: 0deg;
        --circle-top: 260px;

        --color-bg: #F4F5F9;
        --color-text: #0D2246;
        --color-text-weak: #42567A;
        --color-title: #2B4468;
        --color-accent: #3877EE;
        --color-accent-2: #EF5DA8;
        --color-border: rgba(13, 34, 70, 0.08);
        --color-border-strong: rgba(13, 34, 70, 0.16);
        --color-divider: #C7CDD9;
        --color-ink: #111;

        --range-from: #3A62F8;
        --range-to: #F4599D;

        --shadow: rgba(26, 78, 155, .16);
        --shadow-hover: rgba(26, 78, 155, .22);
    }

    html, body {
        margin: 0;
        padding: 0;
        background: var(--color-bg);
    }
`;