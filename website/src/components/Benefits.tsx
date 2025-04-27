export function Benefits() {
  const benefits = [
    {
      title: "Lightweight",
      description: "Only JS wrappers in npm package, audio hosted on CDN",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Lazy-loaded",
      description: "Sounds fetched only when needed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Offline-ready",
      description: "Download sounds for self-hosting with CLI",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
    },
    {
      title: "Typed API",
      description: "Full TypeScript support with sound autocompletion",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-br from-white via-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Why Choose React-Sounds?
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">
            Designed for <span className="text-blue-600">modern React apps</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Built from the ground up to enhance your React applications with minimal overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex p-6 bg-white rounded-2xl shadow-sm border border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              style={{ boxShadow: "0 0 0 1px rgba(226,232,240,0.6)" }}
            >
              <div className="mr-5 flex-shrink-0 text-blue-600 bg-blue-50 p-5 rounded-xl group-hover:rotate-6 transition-transform">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#examples"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <span>See it in action</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
