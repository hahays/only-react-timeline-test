import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduced(mql.matches);
        onChange();
        mql.addEventListener?.("change", onChange);
        return () => mql.removeEventListener?.("change", onChange);
    }, []);

    return reduced;
}
