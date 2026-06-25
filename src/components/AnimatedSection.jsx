import { useScrollReveal } from "../hooks/useScrollReveal";

/**
 * Wraps any section in a scroll-triggered reveal.
 *
 * Props:
 *   variant  — "fade-up" | "fade-in" | "fade-left" | "fade-right"  (default: "fade-up")
 *   delay    — Tailwind delay class e.g. "delay-100", "delay-200"   (default: "")
 *   className — extra classes forwarded to the wrapper div
 *   threshold — 0–1 intersection ratio to trigger (default: 0.12)
 */
const variants = {
  "fade-up": {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0",
  },
  "fade-in": {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "fade-left": {
    hidden: "opacity-0 -translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
};

const AnimatedSection = ({
  children,
  variant = "fade-up",
  delay = "",
  className = "",
  threshold = 0.12,
  as: Tag = "div",
}) => {
  const [ref, isVisible] = useScrollReveal(threshold);
  const { hidden, visible } = variants[variant] ?? variants["fade-up"];

  return (
    <Tag
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${delay}
        ${isVisible ? visible : hidden}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;
