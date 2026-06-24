const InstallPWA = () => {
  return (
    <section className="bg-[#f7f4ee] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold text-[#c47a0a] tracking-widest uppercase mb-2">
          Mobile App
        </p>
        <h2 className="text-3xl font-bold text-[#1e1a14] mb-3">
          Use Gona on your phone
        </h2>
        <p className="text-gray-500 text-sm mb-12 max-w-md mx-auto">
          Install Gona directly from your browser — no app store needed. Works on Android and iPhone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Android */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#d8f0e0] flex items-center justify-center text-xl">🤖</div>
              <h3 className="font-semibold text-gray-800">Android (Chrome)</h3>
            </div>
            <ol className="flex flex-col gap-4">
              {[
                { step: "1", text: 'Open Gona in Chrome and tap the menu (⋮) at the top right' },
                { step: "2", text: 'Tap "Add to Home Screen"' },
                { step: "3", text: 'Tap "Add" to confirm — Gona appears on your home screen!' },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1e3a2f] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <p className="text-sm text-gray-600 font-sans">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* iPhone */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#f0e8da] flex items-center justify-center text-xl">🍎</div>
              <h3 className="font-semibold text-gray-800">iPhone (Safari)</h3>
            </div>
            <ol className="flex flex-col gap-4">
              {[
                { step: "1", text: 'Open Gona in Safari and tap the Share button (□↑) at the bottom' },
                { step: "2", text: 'Scroll down and tap "Add to Home Screen"' },
                { step: "3", text: 'Tap "Add" — Gona is now on your home screen!' },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c47a0a] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <p className="text-sm text-gray-600 font-sans">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#1e3a2f] text-white text-sm font-medium px-5 py-3 rounded-xl">
           Free to install · Works offline · No app store required
        </div>
      </div>
    </section>
  );
};

export default InstallPWA;