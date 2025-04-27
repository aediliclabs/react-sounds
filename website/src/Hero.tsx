import { useState } from "react";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyNpmCommand = () => {
    navigator.clipboard.writeText("npm install react-sounds howler");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6">
              Easy to use sound effects
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
              Add sound to React <span className="text-blue-600">in one line</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Elevate your user experience with hundreds of ready-to-play sound effects—no complex audio setup required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative group">
                <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 py-3 px-4 font-mono text-sm text-slate-700 pr-20">
                  npm install react-sounds howler
                </div>
                <button
                  onClick={copyNpmCommand}
                  className="absolute right-2 top-1/2 -translate-y-1/2 py-1.5 px-3 rounded bg-white border border-slate-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all text-slate-700 text-xs shadow-sm font-medium"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <a
                href="#examples"
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white text-center font-medium shadow-sm hover:shadow-md transition-all"
              >
                See Examples
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 md:w-3 bg-blue-500 rounded-full animate-pulse opacity-80"
                      style={{
                        height: `${Math.sin(i / 2) * 30 + 50}px`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: `${800 + i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
