import { Howl, Howler } from "howler";
import manifest from "./manifest.json";
import { SoundName, SoundOptions } from "./types";

// Default CDN base URL
let cdnBaseUrl = "https://reacticons.sfo3.cdn.digitaloceanspaces.com/v1";

// Global sound enabled state
let soundEnabledGlobal = true;

// Global event listeners for sound state changes
const soundStateListeners: Array<(enabled: boolean) => void> = [];

// Track if we've already set up audio context unlocking
let audioUnlockInitialized = false;

/**
 * Set a custom CDN base URL
 */
export function setCDNUrl(url: string): void {
  cdnBaseUrl = url;
}

/**
 * Get the CDN base URL
 */
export function getCDNUrl(): string {
  return cdnBaseUrl;
}

/**
 * Cache of preloaded sounds
 */
const soundCache: Record<string, Promise<Howl>> = {};

/**
 * Make a sound loader function that first tries local files then falls back to CDN
 */
export function makeRemoteSound(name: SoundName): () => Promise<Howl> {
  return () => {
    if (!soundCache[name]) {
      soundCache[name] = loadSound(name);
    }
    return soundCache[name];
  };
}

/**
 * Try to load a sound from the local filesystem first, then fall back to CDN
 */
async function loadSound(name: SoundName): Promise<Howl> {
  if (!manifest.sounds[name]) {
    throw new Error(`Sound "${name}" not found in manifest`);
  }

  const localPath = await getLocalSoundPath(name);
  if (!localPath) return loadSoundFromCDN(name);

  return new Promise((resolve) => {
    const howl: Howl = new Howl({
      src: [localPath],
      format: ["mp3"],
      preload: true,
      onload: () => resolve(howl),
      onloaderror: (_, error) => {
        console.warn(`Error loading local sound "${name}", falling back to CDN:`, error);
        loadSoundFromCDN(name).then(resolve);
      },
    });
  });
}

/**
 * Load a sound from the CDN
 */
async function loadSoundFromCDN(name: SoundName): Promise<Howl> {
  const soundInfo = manifest.sounds[name];
  const soundUrl = `${cdnBaseUrl}/${soundInfo.src}`;

  return new Howl({
    src: [soundUrl],
    format: ["mp3"],
    preload: true,
    html5: true, // Enable streaming
  });
}

/**
 * Preload multiple sounds
 */
export function preloadSounds(names: SoundName[]): Promise<Howl[]> {
  return Promise.all(
    names.map((name) => {
      if (!soundCache[name]) {
        soundCache[name] = loadSound(name);
      }
      return soundCache[name];
    })
  );
}

/**
 * Play a sound by name
 */
export async function playSound(name: SoundName, options?: SoundOptions): Promise<void> {
  if (!isSoundEnabled()) return;

  const soundPromise = makeRemoteSound(name)();
  const sound = await soundPromise;

  if (options) {
    if (options.volume !== undefined) sound.volume(options.volume);
    if (options.rate !== undefined) sound.rate(options.rate);
    if (options.loop !== undefined) sound.loop(options.loop);
  }

  sound.play();
}

/**
 * Check if sounds are enabled
 */
export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false; // Server environment not supported
  return soundEnabledGlobal;
}

/**
 * Enable or disable all sounds
 * This is used internally by the SoundProvider
 */
export function setSoundEnabled(enabled: boolean): void {
  soundEnabledGlobal = enabled;

  // Store in localStorage for persistence
  if (typeof localStorage !== "undefined") localStorage.setItem("react-sounds-enabled", enabled ? "true" : "false");

  soundStateListeners.forEach((listener) => listener(enabled));
}

/**
 * Initialize the sound enabled state
 * Called at startup to load saved preference
 */
export function initSoundEnabledState(): void {
  if (typeof localStorage === "undefined") return;

  const savedPreference = localStorage.getItem("react-sounds-enabled");
  if (savedPreference !== null) {
    soundEnabledGlobal = savedPreference !== "false";
  }
}

/**
 * Subscribe to sound enabled state changes
 */
export function subscribeSoundState(callback: (enabled: boolean) => void): () => void {
  soundStateListeners.push(callback);

  // Return unsubscribe function
  return () => {
    const index = soundStateListeners.indexOf(callback);
    if (index !== -1) soundStateListeners.splice(index, 1);
  };
}

/**
 * Get the local path for a sound when using the offline mode
 */
export async function getLocalSoundPath(name: SoundName): Promise<string | null> {
  const publicPath = `/sounds/${name}.mp3`;

  if (typeof document === "undefined") return null;

  try {
    const response = await fetch(publicPath, { method: "HEAD" });
    if (response.ok) return publicPath;
  } catch (e) {}

  return null;
}

/**
 * Unlock the audio context globally to allow playback without direct user interaction
 */
export async function unlockAudioContext(): Promise<void> {
  if (typeof window === "undefined" || !Howler.ctx) return;

  if (Howler.ctx.state === "suspended") {
    try {
      await Howler.ctx.resume();
    } catch (error) {
      console.warn("Failed to unlock audio context:", error);
    }
  }
}

/**
 * Setup global event listeners to unlock audio context on user interaction
 * Can be called multiple times safely (will only set up listeners once)
 */
export function initAudioContextUnlock(): () => void {
  if (typeof window === "undefined" || audioUnlockInitialized) return () => {};

  audioUnlockInitialized = true;

  const events = ["click", "touchstart", "keydown"];

  const handleInteraction = () => {
    unlockAudioContext();
    events.forEach((event) => document.removeEventListener(event, handleInteraction));
  };

  events.forEach((event) => document.addEventListener(event, handleInteraction));

  // Return cleanup function
  return () => {
    events.forEach((event) => document.removeEventListener(event, handleInteraction));
  };
}

// Initialize sound state
initSoundEnabledState();

// Initialize audio context unlocking if we're in a browser environment
if (typeof window !== "undefined") {
  initAudioContextUnlock();
}
