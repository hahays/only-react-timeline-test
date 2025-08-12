export const theme = {
    colors: {
        bg: "var(--color-bg)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        shadow: "var(--shadow)",
        shadowHover: "var(--shadow-hover)",
    },
    fonts: {
        base: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans, sans-serif",
        year: "'Bebas Neue', Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        mono: "'JetBrains Mono', SFMono-Regular, ui-monospace, Menlo, Consolas, monospace",
    },
    layout: {
        circleTop: "215px",
        edgeGutter: 40,
        arrowToCard: 80,
    },
};
export type AppTheme = typeof theme;
