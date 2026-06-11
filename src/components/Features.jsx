import { Flower2, Sun, BarChart3, Droplets, Package } from "lucide-react";

const features = [
  {
    img: "/images/pic1.jpeg",
    title: "Speaker the Language of Your Farm",
    desc: "Access your farm data in local languages, including Hausa, Yoruba, Igbo, and more, for seamless management across Africa.",
  },
  {
    img: "/images/pic2.jpeg",
    title: "Employee Management",
    desc: "Manage farm workers, assign tasks, monitor attendance, and track productivity with ease.",
  },
  {
    img: "/images/pic3.jpeg",
    title: "Farm Analytics",
    desc: "Gain insights into farm performance with reports, activity logs, and data-driven recommendations.",
  },
];

const Features = () => {
  return (
    <div>
      <section id="features" className="px-6 md:px-16 py-20 bg-cream">
        <div className="text-center">
          <div className="text-[0.85rem] text-amber-400 font-bold tracking-[0.15em] uppercase text-harvest mb-3">
            Why Gona
          </div>
          <h2
            className="font-playfair text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2]
          tracking-[-0.02em] text-soil mb-4"
          >
            Built for farms that
            <br />
            <em className="italic text-sage text-green-800">
              take growing seriously
            </em>
          </h2>
          <p className="opacity-30 font-bold inline-block whitespace-pre-line text-soil/80 mb-4">
            From a single plot to a multi-field operation.
            <br />
            <span>
              Gona scales with you and gives you the tools professional farmers
              actually need.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-[1.2rem] p-4 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,18,8,.1)]
              transition-all duration-200 cursor-default"
            >
              <div
                className={`w-full h-60 rounded-[0.8rem] flex items-center justify-center text-xl mb-5 ${f.bg}`}
              >
                <img src={f.img} alt="Image" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="text-[1.25rem] font-medium text-center text-soil mb-2">
                {f.title}
              </div>
              <p className="text-[0.85rem] text-center font-light leading-[1.65] text-soil/60">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
