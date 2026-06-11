import {ArrowRight} from 'lucide-react';
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div>
      <section
        id="cta"
        className="bg-orange-100 px-6 md:px-16 py-24 text-center"
      >
        <div className="text-[0.75rem] tracking-[0.15em] uppercase text-harvest font-medium mb-3">
          Get Started Today
        </div>
        <h2
          className="font-playfair text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.2]
        tracking-[-0.02em] text-soil mb-3"
        >
          Your best season
          <br />
          <em className="not-italic text-sage">starts here</em>
        </h2>
        <p className="text-base font-light leading-relaxed text-soil/60 mb-10">
          Join thousands of farmers already using Gona to grow smarter.
          <br />
          Free to start. No credit card needed.
        </p>
        <Link
          to="/login"
          className="bg-black text-white inline-block bg-soil text-cream px-10 py-4 rounded-2xl text-[14px] font-medium no-underline
          shadow-[0_4px_20px_rgba(26,18,8,.25)] hover:-translate-y-0.5
          hover:shadow-[0_8px_28px_rgba(26,18,8,.3)] transition-all duration-150"
        >
          Open Gona <ArrowRight className="inline-block ml-2" />
        </Link>
      </section>
    </div>
  );
}

export default CTA
