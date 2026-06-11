

const Footer = () => {
  return (
    <div>
      <footer
        className="bg-soil px-6 md:px-16 py-12 flex flex-col sm:flex-row
      justify-between items-center gap-4 flex-wrap"
      >
        <div className="flex items-center font-playfair text-xl font-bold text-straw">
          <img src="/images/logo3.png" alt="Logo" className="h-14 w-14" />
          <p className="text-[30px] font-bold italic text-amber-400">
            Go<span className="text-harvest">na</span>
          </p>
        </div>
        <p className="text-[0.78rem] text-straw/30">
          © 2026 Gona. Built for the modern farmer.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
