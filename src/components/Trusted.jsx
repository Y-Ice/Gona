const logos = ['GreenAcres Co.', 'HarvestPlus', 'SeedWorks Ltd', 'AgriFlow', 'FarmLink NG'];

export default function Trusted() {
  return (
    <div className="px-6 md:px-16 py-2 text-center border-t border-b border-soil/[0.07] bg-cream">
      <p className="text-[0.78rem] tracking-[0.1em] uppercase text-[#aaa] mb-4">
        Trusted by farms across Africa &amp; beyond
      </p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {logos.map(l => (
          <span key={l} className="font-playfair text-[0.95rem] font-bold text-soil opacity-20 tracking-wide">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
