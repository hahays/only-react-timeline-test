import React from "react";
import {ThemeProvider} from "styled-components";
import {theme} from "@/theme/theme";

import {Timeline} from "@/modules/Timeline/Timeline";
import {GlobalStyle} from "@/GlobalStyle";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Timeline/>
        </ThemeProvider>
    );
}
