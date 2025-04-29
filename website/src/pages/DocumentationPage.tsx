import React, { useRef, useState } from "react";
import { playSound } from "react-sounds";
import { cn } from "../utils/cn";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language = "bash" }) => {
  return (
    <pre className={cn(`bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 language-${language}`)}>
      <code>{children}</code>
    </pre>
  );
};

const DocumentationPage: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState<string>("Copy to Clipboard");
  const docRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (): void => {
    if (!docRef.current) return;

    playSound("ui/copy");
    const content = docRef.current.innerText;
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy to Clipboard"), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setCopyStatus("Failed to copy");
        setTimeout(() => setCopyStatus("Copy to Clipboard"), 2000);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl" ref={docRef}>
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold text-gray-800">Documentation</h1>
        <button
          disabled={copyStatus !== "Copy to Clipboard"}
          onClick={copyToClipboard}
          className={cn("bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors", {
            "cursor-pointer": copyStatus === "Copy to Clipboard",
            "bg-green-500 hover:bg-green-500": copyStatus === "Copied!",
            "bg-red-500": copyStatus === "Failed to copy",
          })}
        >
          {copyStatus}
        </button>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Introduction</h2>
        <p className="text-gray-600 mb-4">
          <code className={cn("font-mono bg-gray-200 px-1 rounded")}>react-sounds</code> provides a library of
          ready-to-play sound effects for your React applications, designed to be lightweight, easy to use, and
          flexible.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            🪶 <strong>Lightweight</strong>: Only JS wrappers included; audio files hosted on CDN.
          </li>
          <li>
            🔄 <strong>Lazy Loading</strong>: Sounds fetched only when needed.
          </li>
          <li>
            📦 <strong>Offline Support</strong>: Download sounds via CLI for self-hosting.
          </li>
          <li>
            🎯 <strong>Simple API</strong>: Easy-to-use hooks and components.
          </li>
          <li>
            🔊 <strong>Extensive Sound Library</strong>: Organized by category (UI, notification, game).
          </li>
        </ul>
      </section>

      {/* Installation */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Installation</h2>
        <p className="text-gray-600 mb-2">Install the library and its peer dependency, Howler.js:</p>
        <CodeBlock language="bash">
          {`npm install react-sounds howler
# or
yarn add react-sounds howler`}
        </CodeBlock>
        <p className="text-gray-600 mt-2">
          Note:{" "}
          <a
            href="https://howlerjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-blue-600 hover:underline")}
          >
            Howler.js
          </a>{" "}
          is a required peer dependency.
        </p>
      </section>

      {/* Basic Usage */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Basic Usage</h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Playing a Sound with the <code className={cn("font-mono bg-gray-200 px-1 rounded")}>useSound</code> Hook
        </h3>
        <p className="text-gray-600 mb-2">
          The <code className={cn("font-mono bg-gray-200 px-1 rounded")}>useSound</code> hook is the primary way to
          interact with sounds.
        </p>
        <CodeBlock language="tsx">
          {`import { useSound } from 'react-sounds';

function Button() {
  const { play } = useSound('ui/button_1');
  
  return (
    <button onClick={() => play()}>
      Click Me
    </button>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
          Direct Sound Playing with <code className={cn("font-mono bg-gray-200 px-1 rounded")}>playSound</code>
        </h3>
        <p className="text-gray-600 mb-2">For simple, one-off sound playback without needing state or controls.</p>
        <CodeBlock language="tsx">
          {`import { playSound } from 'react-sounds';

function Button() {
  // TypeScript completion for available sounds
  const handleClick = () => playSound('ui/button_1');
  
  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}`}
        </CodeBlock>
      </section>

      {/* Advanced Usage */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Advanced Usage</h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">Custom CDN</h3>
        <p className="text-gray-600 mb-2">Configure a custom base URL for loading sound files.</p>
        <CodeBlock language="tsx">
          {`import { setCDNUrl, getCDNUrl } from 'react-sounds';

// Set a custom CDN base URL
setCDNUrl('https://your-cdn.com/sounds');

// Get the current CDN URL
const currentUrl = getCDNUrl();`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Sound Enabling/Disabling</h3>
        <p className="text-gray-600 mb-2">Globally enable or disable all sounds.</p>
        <CodeBlock language="tsx">
          {`import { setSoundEnabled, isSoundEnabled } from 'react-sounds';

// Check if sounds are enabled
const enabled = isSoundEnabled();

// Disable all sounds
setSoundEnabled(false);

// Re-enable sounds
setSoundEnabled(true);`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Preloading Sounds</h3>
        <p className="text-gray-600 mb-2">Preload sounds to ensure they are ready for immediate playback.</p>
        <CodeBlock language="tsx">
          {`import { preloadSounds } from 'react-sounds';

// Preload sounds you'll need later
preloadSounds(['ui/button_1', 'notification/success', 'game/coin']);`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Custom Sound Options</h3>
        <p className="text-gray-600 mb-2">Pass options like volume, rate, or loop when playing sounds.</p>
        <CodeBlock language="tsx">
          {`import { useSound } from 'react-sounds';

function CoinCollector() {
  const { play } = useSound('game/coin');
  
  const handleCollect = () => {
    // Play with custom volume and rate
    play({ volume: 0.8, rate: 1.2, loop: false });
  };
  
  return (
    <button onClick={handleCollect}>
      Collect Coin
    </button>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Advanced Hook Usage</h3>
        <p className="text-gray-600 mb-2">
          The <code className={cn("font-mono bg-gray-200 px-1 rounded")}>useSound</code> hook returns more than just{" "}
          <code className={cn("font-mono bg-gray-200 px-1 rounded")}>play</code>. You get access to playback controls,
          state, and the underlying Howl instance.
        </p>
        <CodeBlock language="tsx">
          {`import { useSound } from 'react-sounds';

function SoundController() {
  const { 
    play,
    stop,
    pause,
    resume,
    isPlaying,
    isLoaded,
    soundRef // Access to the Howler.js instance
  } = useSound('notification/success');
  
  return (
    <div>
      <button onClick={() => play()} disabled={!isLoaded}>Play</button>
      <button onClick={() => pause()} disabled={!isPlaying}>Pause</button>
      <button onClick={() => resume()} disabled={isPlaying}>Resume</button>
      <button onClick={() => stop()} disabled={!isPlaying}>Stop</button>
      <div>Status: {isLoaded ? 'Loaded' : 'Loading'}, {isPlaying ? 'Playing' : 'Stopped'}</div>
    </div>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">React Components</h3>
        <p className="text-gray-600 mb-2">Components for declarative sound playback.</p>
        <CodeBlock language="tsx">
          {`import { Sound, SoundButton } from 'react-sounds';

// Component that plays a sound on mount
function Success() {
  return (
    <Sound 
      name="notification/success" 
      trigger="mount"
      options={{ volume: 0.8 }}
      onLoad={() => console.log('Sound loaded')}
      onPlay={() => console.log('Sound playing')}
      onStop={() => console.log('Sound stopped')}
    >
      <div>Operation successful!</div>
    </Sound>
  );
}

// Button that plays a sound when clicked
function CloseButton({ onClose }) {
  return (
    <SoundButton 
      sound="ui/button_1" 
      soundOptions={{ volume: 0.7 }}
      onClick={onClose}
    >
      Close
    </SoundButton>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
          Preloading with <code className={cn("font-mono bg-gray-200 px-1 rounded")}>SoundProvider</code>
        </h3>
        <p className="text-gray-600 mb-2">Use the provider to preload sounds at the application root.</p>
        <CodeBlock language="tsx">
          {`import { SoundProvider } from 'react-sounds';

function App() {
  return (
    <SoundProvider preload={['ui/button_1', 'notification/success']}>
      <YourApp />
    </SoundProvider>
  );
}`}
        </CodeBlock>
      </section>
    </div>
  );
};

export default DocumentationPage;
