import {Star} from 'lucide-react';

const testimonials = [
  {
    bg: "bg-green-900",
    quote:
      '"Before Gona I was tracking everything in notebooks. Now I can see my entire operation at a glance. My yield went up 30% in one season."',
    author: "Emeka Okafor",
    farm: "Plateau State, Nigeria — 45 hectares",
  },
  {
    bg: "bg-green-900",
    quote:
      '"The irrigation planner alone saved us so much water this dry season. The weather alerts are incredibly accurate for our area."',
    author: "Amara Diallo",
    farm: "Plateau State, Nigeria — Mixed crop farm",
  },
  {
    bg: "bg-green-900",
    quote:
      '"I finally understand where my money is going on the farm. The financial ledger is simple but so powerful. I recommend it to every farmer I know."',
    author: "Fatima Bello",
    farm: "Plateau State, Nigeria — Livestock & crops",
  },
];


const Testimonials = () => {
  return (
    <div>
      <section id='reviews' className="bg-soil px-6 md:px-16 py-20 text-center">
        <div className="text-[0.75rem] tracking-[0.15em] uppercase text-harvest font-medium mb-3">
          What Farmers Say
        </div>
        <h2
          className="font-playfair text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2]
        tracking-[-0.02em] text-straw mb-3"
        >
          Real results from{" "}
          <span className="not-italic text-harvest">real farms</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left max-w-5xl mx-auto ">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className={`${t.bg} text-white rounded-[1.2rem] p-7 shadow-[0_4px_20px_rgba(26,18,8,.25)] hover:-translate-y-1 transition-all duration-400`}
            >
              <div className=" flex items-center text-harvest tracking-[0.1em] mb-3">
                <Star className='size-4.5 text-white'/>
                <Star className='size-4.5 text-white'/>
                <Star className='size-4.5 text-white'/>
                <Star className='size-4.5 text-white'/>
                <Star className='size-4.5 text-white'/>
              </div>
              <p className="text-[0.88rem] font-light leading-[1.7] text-straw/75 mb-5">
                {t.quote}
              </p>
              <div className="text-[0.8rem] text-harvest font-medium">
                {t.author}
              </div>
              <div className="text-[0.75rem] text-straw/35">{t.farm}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Testimonials
