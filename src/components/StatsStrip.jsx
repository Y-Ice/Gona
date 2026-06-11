const stats = [
  { main: "12,000+", sub: "Farmers onboard" },
  { main: "₦4.7B", sub: "Farm revenue tracked" },
  { main: "98%", sub: "User satisfaction" },
  { main: "23%", sub: "Avg yield improvement" },
];

const StatsStrip = () => {
  
  return (
    <div>
      <div className="bg-green-900 text-amber-50 px-6 md:px-16 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-[0px_0px_20px_rgba(26,18,8)]">
        {stats.map((s) => (
          <div key={s.sub}>
            <span className="font-playfair text-[2.5rem] font-bold text-straw block leading-none">
              {s.main}
            </span>
            <div className="text-[0.82rem] text-straw/55 font-light mt-1">
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsStrip;
