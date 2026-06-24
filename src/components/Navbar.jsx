import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-2
        bg-cream/85 backdrop-blur-xl border-b border-soil/8 transition-shadow duration-200 rounded-3xl
        ${scrolled ? "shadow-md" : ""}`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center font-playfair text-xl font-bold text-straw no-underline"
        >
          <img src="/images/logo3.png" alt="Logo" className="h-14 w-14" />
          <p className="text-[30px] font-bold italic text-amber-400">
            Go<span className="text-harvest">na</span>
          </p>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "Reviews"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-semibold text-soil/65 hover:text-soil transition-opacity duration-200 no-underline"
            >
              {link}
            </a>
          ))}

          {/* <Link
            to="/login"
            className="text-black border border-gray-300 px-4 py-2 rounded-4xl text-sm font-medium hover:-translate-y-0.5
          hover:shadow-[0_8px_28px_rgba(26,18,8,.3)] transition-all duration-150"
          >
            Login
          </Link> */}
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded-4xl text-sm font-medium shadow-[0_4px_20px_rgba(26,18,8,.25)] hover:-translate-y-0.5
          hover:shadow-[0_8px_28px_rgba(26,18,8,.3)] transition-all duration-150"
          >
            Get Started Free
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu />
          <span
            className={`block w-[22px] h-[2px] bg-soil rounded transition-transform duration-250
          ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-soil rounded transition-opacity duration-250
          ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-soil rounded transition-transform duration-250
          ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="bg-cream/70 absolute top-full left-0 right-0 backdrop-blur-2xl border-b border-soil/8
          flex flex-col px-6 py-4 gap-4 animate-slideDown md:hidden"
          >
            {["Features", "Pricing", "Reviews"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={close}
                className="text-base text-soil/75 hover:text-soil no-underline transition-opacity"
              >
                {link}
              </a>
            ))}
            <Link
              to="/login"
              onClick={close}
              className="bg-black text-white px-4 py-2 rounded-4xl text-sm font-medium shadow-[0_4px_20px_rgba(26,18,8,.25)] hover:-translate-y-0.5
          hover:shadow-[0_8px_28px_rgba(26,18,8,.3)] transition-all duration-150 text-center no-underline"
            >
              Login
            </Link>
            
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
