import CodeBlock from "@/components/CodeBlock";
import { cn } from "@/utils/cn";
import React, { useRef, useState } from "react";
import { playSound } from "react-sounds";

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
          flexible. It's built on top of Howler.js and provides a simple API for playing sounds in your React apps.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            🔊 <strong>Extensive Sound Library</strong>: Organized by category (ui, notification, game, etc.).
          </li>
          <li>
            🪶 <strong>Lightweight</strong>: Only JS wrappers included; audio files hosted on CDN.
          </li>
          <li>
            🔄 <strong>Lazy Loading</strong>: Sounds fetched only when needed.
          </li>
          <li>
            📦 <strong>Offline Support</strong>: Local sound files with automatic fallback to CDN.
          </li>
          <li>
            🎯 <strong>Simple API</strong>: Easy-to-use hooks and components.
          </li>
          <li>
            💾 <strong>Persistent Settings</strong>: Sound preferences saved to localStorage.
          </li>
          <li>
            🎮 <strong>Controls</strong>: Play, pause, resume and stop with sound state management.
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

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
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
  const handleClick = () => playSound('ui/button_1'); 
  
  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Setup with <code className={cn("font-mono bg-gray-200 px-1 rounded")}>SoundProvider</code>
        </h3>
        <p className="text-gray-600 mb-2">
          For best results, wrap your application with the{" "}
          <code className={cn("font-mono bg-gray-200 px-1 rounded")}>SoundProvider</code> component. This allows control
          of sound enabled state, preloads sounds, and establishes the sound context.
        </p>
        <CodeBlock language="tsx">
          {`import { SoundProvider } from 'react-sounds';

function App() {
  return (
    <SoundProvider 
      // Optional: preload commonly used sounds for immediate playback
      preload={['ui/button_click', 'notification/success']} 
      // Optional: set initial sound enabled state (defaults to true)
      initialEnabled={true}
    >
      <YourApp />
    </SoundProvider>
  );
}`}
        </CodeBlock>
      </section>

      {/* Core API */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Core API</h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          The <code className={cn("font-mono bg-gray-200 px-1 rounded")}>useSound</code> Hook
        </h3>
        <p className="text-gray-600 mb-2">
          The <code className={cn("font-mono bg-gray-200 px-1 rounded")}>useSound</code> hook provides full control over
          sound playback.
        </p>
        <CodeBlock language="tsx">
          {`import { useSound } from 'react-sounds';

function SoundPlayer() {
  // Full API with all returned values
  const { 
    play,   // Function to play the sound
    stop,   // Function to stop the sound
    pause,  // Function to pause the sound
    resume, // Function to resume a paused sound
    isPlaying, // Boolean indicating if sound is currently playing
    isLoaded,  // Boolean indicating if sound has been loaded
  } = useSound('ui/button_1');
  
  // With default options
  const { play: playWithOptions } = useSound('notification/success', { 
    volume: 0.8, 
    rate: 1.2,
    loop: false
  });
  
  return (
    <div>
      <button onClick={() => play()} disabled={!isLoaded}>Play Sound</button>
      <button onClick={() => play({ volume: 0.5 })}>Play Quiet</button>
      <button onClick={() => pause()} disabled={!isPlaying}>Pause</button>
      <button onClick={() => resume()} disabled={isPlaying}>Resume</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">React Components</h3>
        <p className="text-gray-600 mb-2">For declarative sound playback within your components.</p>
        <CodeBlock language="tsx">
          {`import { Sound, SoundButton, SoundProvider } from 'react-sounds';

// Component that plays a sound on mount, unmount, or manually
function NotificationBanner() {
  return (
    <Sound 
      name="notification/alert" 
      trigger="mount" // 'mount', 'unmount', or 'none'
      options={{ volume: 0.8 }}
      onLoad={() => console.log('Sound loaded')}
      onPlay={() => console.log('Sound playing')}
      onStop={() => console.log('Sound stopped')}
      onError={(error) => console.error('Sound error:', error)}
    >
      <div className="banner">Notification Banner</div>
    </Sound>
  );
}

// Button that plays a sound when clicked
function ActionButton({ onClick }) {
  return (
    <SoundButton 
      sound="ui/click" 
      soundOptions={{ volume: 0.7 }}
      onClick={onClick}
      onSoundError={(error) => console.error('Sound error:', error)}
    >
      Action Button
    </SoundButton>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Utility Hooks</h3>
        <p className="text-gray-600 mb-2">Additional hooks for specific sound use cases.</p>
        <CodeBlock language="tsx">
          {`import { useSoundOnChange, useSoundEnabled } from 'react-sounds';

// Play a sound when a value changes
function Counter() {
  const [count, setCount] = useState(0);
  
  // Play a sound whenever count changes
  useSoundOnChange('ui/increment', count, { volume: 0.5 });
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Access and control the global sound enabled state
function SoundToggle() {
  // Must be used within a SoundProvider
  const [enabled, setEnabled] = useSoundEnabled();
  
  return (
    <button onClick={() => setEnabled(!enabled)}>
      Sounds: {enabled ? 'On' : 'Off'}
    </button>
  );
}`}
        </CodeBlock>
      </section>

      {/* Advanced Usage */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Advanced Usage</h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">Configuring CDN URL</h3>
        <p className="text-gray-600 mb-2">Configure where sound files are loaded from.</p>
        <CodeBlock language="tsx">
          {`import { setCDNUrl, getCDNUrl } from 'react-sounds';

// Set a custom CDN base URL
setCDNUrl('https://your-cdn.com/sounds');

// Get the current CDN URL
const currentUrl = getCDNUrl();`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Sound Enabling/Disabling</h3>
        <p className="text-gray-600 mb-2">
          Globally enable or disable all sounds. The setting is automatically persisted in localStorage.
        </p>
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

// Preload multiple sounds at once
preloadSounds(['ui/button_1', 'notification/success', 'game/coin'])
  .then(() => console.log('All sounds preloaded'))
  .catch((error) => console.error('Error preloading sounds:', error));`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Custom Sound Options</h3>
        <p className="text-gray-600 mb-2">Customize sound playback with various options.</p>
        <CodeBlock language="tsx">
          {`import { useSound, playSound, SoundOptions } from 'react-sounds';

// SoundOptions interface:
// {
//   volume?: number;  // 0.0 to 1.0
//   rate?: number;    // playback speed (1.0 is normal)
//   loop?: boolean;   // whether to loop the sound
// }

function SoundPlayer() {
  const { play } = useSound('game/explosion');
  
  const playWithOptions = () => {
    // Play with custom options
    play({ 
      volume: 0.8,  // 80% volume
      rate: 1.2,    // 20% faster
      loop: false   // don't loop
    });
    
    // Direct play with options
    playSound('ui/click', { volume: 0.5 });
  };
  
  return <button onClick={playWithOptions}>Play with Options</button>;
}`}
        </CodeBlock>
      </section>

      {/* Type Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">TypeScript Support</h2>
        <p className="text-gray-600 mb-2">
          react-sounds provides TypeScript definitions for all exported functions, hooks, components, and types.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">Sound Categories</h3>
        <p className="text-gray-600 mb-2">
          Sounds are organized by category to help with discoverability and organization.
        </p>
        <CodeBlock language="tsx">
          {`import type { 
  SoundName,         // Union of all sound categories
  UiSoundName,       // UI sounds (clicks, toggles, etc.)
  GameSoundName,     // Game sounds (achievements, actions, etc.)
  NotificationSoundName // Notification sounds (alerts, success, etc.)
} from 'react-sounds';

// Using with type safety
function PlaySounds() {
  const playUiSound = (sound: UiSoundName) => playSound(sound);
  const playGameSound = (sound: GameSoundName) => playSound(sound);
  
  return (
    <div>
      <button onClick={() => playUiSound('ui/click')}>UI Sound</button>
      <button onClick={() => playGameSound('game/win')}>Game Sound</button>
    </div>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Sound Hook Return Type</h3>
        <p className="text-gray-600 mb-2">
          Type definition for what <code className={cn("font-mono bg-gray-200 px-1 rounded")}>useSound</code> hook
          returns.
        </p>
        <CodeBlock language="tsx">
          {`import type { SoundHookReturn } from 'react-sounds';

// SoundHookReturn contains:
// {
//   play: (options?: SoundOptions) => Promise<void> | undefined;
//   stop: () => void;
//   pause: () => void;
//   resume: () => void;
//   isPlaying: boolean;
//   isLoaded: boolean;
// }`}
        </CodeBlock>
      </section>
    </div>
  );
};

export default DocumentationPage;
