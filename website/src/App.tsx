import { useEffect, useState } from "react";
import "./App.css";
import { Benefits, CodeExample, Cta, FeatureTiles, Footer, Hero, SocialProof, Soundboard } from "./components";

function App() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = ["features", "examples"]; // hero & others can be added if needed

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.4,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600 mr-2" fill="currentColor">
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.84-5 6.7v2.07c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77zm-4 0c-4.01.91-7 4.49-7 8.77 0 4.28 2.99 7.86 7 8.77v-2.07c-2.89-.86-5-3.54-5-6.7s2.11-5.85 5-6.71V3.23zm5 8.77c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"></path>
            </svg>
            <span className="text-xl font-bold text-blue-600">react-sounds</span>
          </div>
          <div className="flex items-center space-x-8">
            <a
              href="#features"
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-blue-600 after:transition-transform after:origin-left hover:text-blue-600 hover:after:scale-x-100 ${
                activeSection === "features" ? "text-blue-600 after:scale-x-100" : "text-slate-600"
              }`}
            >
              Features
            </a>
            <a
              href="#examples"
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-blue-600 after:transition-transform after:origin-left hover:text-blue-600 hover:after:scale-x-100 ${
                activeSection === "examples" ? "text-blue-600 after:scale-x-100" : "text-slate-600"
              }`}
            >
              Examples
            </a>
            <a href="#docs" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Docs
            </a>
            <a
              href="https://github.com/username/react-sounds"
              className="text-sm font-medium py-2 px-4 bg-slate-100 text-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Above the fold */}
      <Hero />
      <Soundboard />

      {/* Mid-page */}
      <div id="features">
        <Benefits />
      </div>
      <FeatureTiles />
      <div id="examples">
        <CodeExample />
      </div>

      {/* Below the fold */}
      <SocialProof />
      <Cta />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
