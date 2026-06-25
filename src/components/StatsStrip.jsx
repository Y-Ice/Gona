import { useEffect, useRef, useState } from "react";

const stats = [
  { main: "12,000+", sub: "Farmers onboard",       target: 12000, prefix: "",  suffix: "+",  decimals: 0 },
  { main: "₦4.7B",   sub: "Farm revenue tracked",  target: 4.7,   prefix: "₦", suffix: "B",  decimals: 1 },
  { main: "98%",     sub: "User satisfaction",      target: 98,    prefix: "",  suffix: "%",  decimals: 0 },
  { main: "23%",     sub: "Avg yield improvement",  target: 23,    prefix: "",  suffix: "%",  decimals: 0 },
];

function useCountUp(target, decimals, duration = 1800, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, decimals, duration]);

  return value;
}

function StatItem({ stat, active }) {
  const value = useCountUp(stat.target, stat.decimals, 1800, active);
  const display = `${stat.prefix}${stat.decimals > 0 ? value.toFixed(stat.decimals) : value.toLocaleString()}${stat.suffix}`;

  return (
    <div>
      <span className="font-playfair text-[2.5rem] font-bold text-straw block leading-none">
        {active ? display : stat.main}
      </span>
      <div className="text-[0.82rem] text-straw/55 font-light mt-1">
        {stat.sub}
      </div>
    </div>
  );
}

const StatsStrip = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="bg-green-900 text-amber-50 px-6 md:px-16 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-[0px_0px_20px_rgba(26,18,8)]">
        {stats.map((s) => (
          <StatItem key={s.sub} stat={s} active={active} />
        ))}
      </div>
    </div>
  );
};

export default StatsStrip;