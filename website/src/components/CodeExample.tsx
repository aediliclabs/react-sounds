import { useState } from "react";

export function CodeExample() {
  const [activeTab, setActiveTab] = useState<"ts" | "js">("ts");
  const [copied, setCopied] = useState(false);

  const tsCode = `import { useSound } from 'react-sounds';

function Button() {
  const { play } = useSound('ui/button_1');
  return <button onClick={() => play()}>Click Me</button>;
}`;

  const jsCode = `import { useSound } from 'react-sounds';

function Button() {
  const { play } = useSound('ui/button_1');
  return <button onClick={() => play()}>Click Me</button>;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(activeTab === "ts" ? tsCode : jsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="examples" className="py-20 px-4 max-w-6xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Simple, Developer-Friendly API</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Just a few lines of code to add engaging sound effects to your application.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-shadow">
          <div className="flex items-center border-b border-slate-100 px-4 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex space-x-2">
              <button
                className={`py-3 px-4 font-medium text-sm relative ${
                  activeTab === "ts" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
                onClick={() => setActiveTab("ts")}
              >
                TypeScript
                {activeTab === "ts" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
              </button>
              <button
                className={`py-3 px-4 font-medium text-sm relative ${
                  activeTab === "js" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                }`}
                onClick={() => setActiveTab("js")}
              >
                JavaScript
                {activeTab === "js" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
              </button>
            </div>
            <div className="ml-auto">
              <button
                onClick={copyCode}
                className="text-xs py-1.5 px-3 rounded-md bg-slate-100 hover:bg-blue-100 hover:text-blue-700 transition-colors text-slate-700 font-medium flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="p-6 font-mono text-sm bg-slate-50 text-slate-800 overflow-x-auto">
            <pre className="whitespace-pre leading-relaxed">
              <span className="text-blue-800 font-semibold">import</span>
              <span className="text-slate-800"> {`{ useSound }`} </span>
              <span className="text-blue-800 font-semibold">from</span>
              <span className="text-green-600"> 'react-sounds'</span>;
              <br />
              <br />
              <span className="text-blue-800 font-semibold">function</span>
              <span className="text-purple-700"> Button</span>() {`{`}
              <br />
              &nbsp;&nbsp;<span className="text-blue-800 font-semibold">const</span> {`{ play }`} =
              <span className="text-purple-700"> useSound</span>(<span className="text-green-600">'ui/button_1'</span>);
              <br />
              &nbsp;&nbsp;<span className="text-blue-800 font-semibold">return</span>{" "}
              <span className="text-slate-500">{`<`}</span>
              <span className="text-blue-600">button</span> <span className="text-purple-700">onClick</span>=
              <span className="text-slate-500">{`{() => `}</span>
              <span className="text-blue-600">play</span>
              <span className="text-slate-500">{`()}`}</span>
              <span className="text-slate-500">{`>`}</span>Click Me<span className="text-slate-500">{`</`}</span>
              <span className="text-blue-600">button</span>
              <span className="text-slate-500">{`>`}</span>;
              <br />
              {`}`}
            </pre>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://github.com/username/react-sounds/blob/main/README.md"
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 group"
          >
            <span>View full documentation</span>
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
