# react-sounds 🔊

Hundreds of ready-to-play sound effects for your React applications.

[![npm version](https://img.shields.io/npm/v/react-sounds.svg)](https://www.npmjs.com/package/react-sounds)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Key Features

- 🪶 **Lightweight**: Only the JS wrappers are included in the npm package, audio files are hosted on a CDN
- 🔄 **Lazy Loading**: Sounds are only fetched when they're needed
- 📦 **Offline Support**: Download and bundle sounds for self-hosting with the included CLI
- 🎯 **Simple API**: Easy-to-use hooks and components
- 🔊 **Extensive Sound Library**: Organized by sound category (UI, notification, game)

## Installation

```bash
npm install react-sounds howler
# or
yarn add react-sounds howler
```

Note: [Howler.js](https://howlerjs.com/) is a peer dependency.

## Basic Usage

### Playing a Sound with a Hook

```tsx
import { useSound } from 'react-sounds';

function Button() {
  const { play } = useSound('ui/button_1');
  
  return (
    <button onClick={() => play()}>
      Click Me
    </button>
  );
}
```

### Direct Sound Playing

```tsx
import { playSound } from 'react-sounds';

function Button() {
  // TypeScript completion for available sounds
  const handleClick = () => playSound('ui/button_1');
  
  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

## Advanced Usage

### Custom CDN

By default, sounds are loaded from a CDN. You can configure your own CDN base URL:

```tsx
import { setCDNUrl, getCDNUrl } from 'react-sounds';

// Set a custom CDN base URL
setCDNUrl('https://your-cdn.com/sounds');

// Get the current CDN URL
const currentUrl = getCDNUrl();
```

### Sound Enabling/Disabling

```tsx
import { setSoundEnabled, isSoundEnabled } from 'react-sounds';

// Check if sounds are enabled
const enabled = isSoundEnabled();

// Disable all sounds
setSoundEnabled(false);

// Re-enable sounds
setSoundEnabled(true);
```

### Preloading Sounds

```tsx
import { preloadSounds } from 'react-sounds';

// Preload sounds you'll need later
preloadSounds(['ui/button_1', 'notification/success', 'game/coin']);
```

### Custom Sound Options

```tsx
import { useSound } from 'react-sounds';

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
}
```

### Advanced Hook Usage

```tsx
import { useSound } from 'react-sounds';

function SoundController() {
  const { 
    play,
    stop,
    pause,
    resume,
    isPlaying,
    isLoaded,
    soundRef
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
}
```

### React Components

The library provides React components for playing sounds:

```tsx
import { Sound, SoundButton } from 'react-sounds';

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
}
```

### Preloading with SoundProvider

```tsx
import { SoundProvider } from 'react-sounds';

function App() {
  return (
    <SoundProvider preload={['ui/button_1', 'notification/success']}>
      <YourApp />
    </SoundProvider>
  );
}
```

### Playing Sounds When Values Change

```tsx
import { useSoundOnChange } from 'react-sounds';

function Counter({ count }) {
  // Play a sound whenever the count changes
  useSoundOnChange('ui/button_1', count, { volume: 0.5 });
  
  return <div>Count: {count}</div>;
}
```

## Offline Support

The library automatically tries to load sounds from your local project before falling back to the CDN:

1. First checks for sounds in your public directory: `/sounds/{soundname}.mp3`
2. Then checks for sounds in your assets directory: `../assets/{soundname}.mp3`
3. Finally falls back to the CDN

To use offline sounds, simply place your sound files in one of these locations with the appropriate naming convention.

### CLI for Sound Download

The library includes a CLI tool to easily download sounds for offline use:

```bash
# List all available sounds
npx react-sounds-cli list

# Download specific sounds
npx react-sounds-cli pick ui/button_1 notification/success

# Specify a custom output directory (default is ./public/sounds)
npx react-sounds-cli pick game/coin --output=./my-sounds
```

After downloading, the CLI will create the necessary folder structure and provide instructions for configuring your application to use the local sounds.

## Available Sound Categories

The library includes sounds organized by category:

- **UI**: `ui/button_1`
- **Notification**: `notification/success`, `notification/error`
- **Game**: `game/coin`

## Browser Compatibility

Works in all modern browsers that support the Web Audio API:

- Chrome/Edge (desktop & mobile)
- Firefox (desktop & mobile)
- Safari (desktop & iOS)

## License

MIT © Aedilic Inc.

---

Made with ♥ by Aedilic Inc.
