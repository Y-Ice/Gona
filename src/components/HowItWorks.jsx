

const steps = [
  {
    num: "01",
    icon: "🏡",
    title: "Set up your farm",
    desc: "Add your fields, crop types, and livestock. Customize everything to match your actual farm layout.",
  },
  {
    num: "02",
    icon: "📍",
    title: "Connect your data",
    desc: "Log daily activities and sync your farm records in one place.",
  },
  {
    num: "03",
    icon: "📈",
    title: "Grow with insights",
    desc: "Gona surfaces patterns and alerts that help you make better decisions every single season.",
  },
];


const HowItWorks = () => {
  return (
    <div>
      <section className="bg-white px-6 md:px-16 py-20">
        <div className="text-[0.75rem] tracking-[0.15em] uppercase text-harvest font-medium mb-3">
          How It Works
        </div>
        <h2
          className="font-playfair text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2]
        tracking-[-0.02em] text-soil mb-4"
        >
          Up and running in
          <br />
          <em className="not-italic text-sage">minutes, not months</em>
        </h2>
        <p className="text-base font-light leading-relaxed text-soil/60 max-w-[520px] mb-12">
          No complicated setup. No tech degree required. Gona is built so any
          farmer can start tracking smarter, instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center px-6 py-10">
              <div className="font-playfair text-[3.5rem] font-bold text-harvest opacity-[0.18] leading-none mb-2">
                {s.num}
              </div>
              <div
                className="w-14 h-14 rounded-full bg-fog flex items-center justify-center text-2xl
              mx-auto mb-4 border-2 border-soil/[0.07]"
              >
                {s.icon}
              </div>
              <h3 className="text-[0.98rem] font-medium text-soil mb-2">
                {s.title}
              </h3>
              <p className="text-[0.85rem] font-light leading-[1.65] text-soil/60">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HowItWorks
