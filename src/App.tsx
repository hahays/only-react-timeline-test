import React from 'react';
import { Timeline } from "@/modules/Timeline/Timeline";
import { GlobalStyle } from "@/styles/globals";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Timeline />
        </>
    );
};

export default App;
