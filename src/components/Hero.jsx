import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div
      id="hero"
      className="relative h-screen flex items-center justify-center"
    >
      <div className="text-center max-w-3xl mx-auto mt-20 px-4">
        <h1 className="text-amber-100 font-playfair text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.2] tracking-[-0.02em] text-straw mb-6">
          Smart farm management for the modern farmer
        </h1>
        <p className="text-[1.05rem] text-gray-200 font-semibold text-straw/75 mb-8">
          Gona is an all-in-one farm management app designed to help farmers
          optimize their operations, increase yields, and make data-driven
          decisions.
        </p>
        <Link
          to="/login"
          className="bg-black text-white inline-block bg-soil text-cream px-10 py-4 rounded-2xl text-[14px] font-medium no-underline
          shadow-[0_4px_20px_rgba(26,18,8,.25)] hover:-translate-y-0.5
          hover:shadow-[0_8px_28px_rgba(26,18,8,.3)] transition-all duration-150"
        >
          Get Started Free
        </Link>
      </div>
      <div className="absolute inset-0 bg-cover bg-center -z-10">
        <img
          src="/images/logo2.jfif"
          alt="Farm background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
