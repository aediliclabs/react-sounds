export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-600 mr-3" fill="currentColor">
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.84-5 6.7v2.07c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77zm-4 0c-4.01.91-7 4.49-7 8.77 0 4.28 2.99 7.86 7 8.77v-2.07c-2.89-.86-5-3.54-5-6.7s2.11-5.85 5-6.71V3.23zm5 8.77c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"></path>
            </svg>
            <h3 className="font-bold text-xl text-blue-600">react-sounds</h3>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com/username/react-sounds"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-full transition-all transform hover:-translate-y-1 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/react-sounds"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-full transition-all transform hover:-translate-y-1 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 0v24h24v-24h-24zm13 21h-2v-9h-4v9h-4v-12h10v12zm8 0h-6v-12h2v10h4v2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-700 rounded-full transition-all transform hover:-translate-y-1 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Add sound effects to your React applications with ease. Lightweight, flexible, and easy to use.
            </p>
            <p className="text-xs text-slate-500">© {currentYear} All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Documentation</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Examples
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Community</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/username/react-sounds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/react-sounds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  npm
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  MIT License
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Built with <span className="text-red-500">♥</span> for the React community
          </p>
        </div>
      </div>
    </footer>
  );
}
