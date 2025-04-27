export function Cta() {
  return (
    <section className="py-28 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50">
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-200 rounded-full opacity-20 translate-x-1/2 translate-y-1/2 blur-xl"></div>

        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6">
            Ready to Get Started?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Add immersive sound to your <span className="text-blue-600">React applications</span>
          </h2>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get started in less than 5 minutes with our simple guides and enhance your app's user experience today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="https://www.npmjs.com/package/react-sounds"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
            >
              Start Using React-Sounds
            </a>

            <a
              href="https://github.com/username/react-sounds"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 w-full sm:w-auto bg-white hover:bg-slate-50 rounded-xl font-semibold border border-slate-200 transition-all flex items-center justify-center text-slate-800 shadow-md hover:shadow-lg hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Star on GitHub
            </a>
          </div>

          <p className="text-slate-500 text-sm mt-8">No credit card required. Free and open source.</p>
        </div>
      </div>
    </section>
  );
}
