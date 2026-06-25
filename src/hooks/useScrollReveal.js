import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible].
 * Attach ref to any element — isVisible flips true once it enters the viewport.
 * @param {number} threshold  0–1, how much of the element must be visible (default 0.15)
 * @param {boolean} once      if true (default), stays visible after first trigger
 */
export function useScrollReveal(threshold = 0.15, once = true) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect prefers-reduced-motion
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReduced) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, once]);

    return [ref, isVisible];
}