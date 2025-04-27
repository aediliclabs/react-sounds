import { Howl } from "howler";
import manifest from "./manifest.json";
import { SoundName, SoundOptions } from "./types";

// Default CDN base URL
let cdnBaseUrl = "https://reacticons.sfo3.cdn.digitaloceanspaces.com/v1";

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
  // Check if the sound is in the manifest
  if (!manifest.sounds[name]) {
    throw new Error(`Sound "${name}" not found in manifest`);
  }

  // First try to load from local path
  const localPath = getLocalSoundPath(name);
  if (localPath) {
    return new Promise((resolve) => {
      const howl: Howl = new Howl({
        src: [localPath],
        format: ["mp3"],
        preload: true,
        onload: () => resolve(howl),
        onloaderror: (_, error) => {
          console.warn(`Error loading local sound "${name}", falling back to CDN:`, error);
          // Fall back to CDN
          loadSoundFromCDN(name).then(resolve);
        },
      });
    });
  }

  // If no local path, load from CDN
  return loadSoundFromCDN(name);
}

/**
 * Load a sound from the CDN
 */
async function loadSoundFromCDN(name: SoundName): Promise<Howl> {
  const soundInfo = manifest.sounds[name];
  const soundUrl = `${cdnBaseUrl}/${soundInfo.src}`;

  // Try to fetch the sound from the cache (if in a browser environment)
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(soundUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      return new Promise((resolve) => {
        const howl: Howl = new Howl({
          src: [objectUrl],
          format: ["mp3"],
          preload: true,
          onload: () => resolve(howl),
          onloaderror: (_, error) => {
            console.error(`Error loading sound "${name}":`, error);
            resolve(howl); // Resolve anyway to prevent hanging promises
          },
        });
      });
    } catch (error) {
      console.error(`Error fetching sound "${name}":`, error);
      // Fall back to direct loading
      return new Howl({
        src: [soundUrl],
        format: ["mp3"],
      });
    }
  } else {
    // Server-side or non-browser environment - return a mock
    return new Howl({
      src: [soundUrl],
      format: ["mp3"],
    });
  }
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
  const sound = await makeRemoteSound(name)();

  if (options) {
    if (options.volume !== undefined) sound.volume(options.volume);
    if (options.rate !== undefined) sound.rate(options.rate);
    if (options.loop !== undefined) sound.loop(options.loop);
  }

  sound.play();
}

/**
 * Check if the environment should have sound enabled
 */
export function isSoundEnabled(): boolean {
  // Don't play sounds on the server
  if (typeof window === "undefined") return false;

  // User might have set a preference
  const savedPreference = typeof localStorage !== "undefined" ? localStorage.getItem("react-sounds-enabled") : null;

  return savedPreference !== "false";
}

/**
 * Enable or disable all sounds
 */
export function setSoundEnabled(enabled: boolean): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("react-sounds-enabled", enabled ? "true" : "false");
  }
}

/**
 * Get the local path for a sound when using the offline mode
 */
export function getLocalSoundPath(name: SoundName): string | null {
  // First check if the sound exists in the public directory
  const publicPath = `/sounds/${name}.mp3`;

  // Check if file exists in DOM context
  if (typeof document !== "undefined") {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", publicPath, false);
    try {
      xhr.send();
      if (xhr.status === 200) {
        return publicPath;
      }
    } catch (e) {
      // Ignore errors and try alternative methods
    }
  }

  try {
    // webpack/vite will throw if this fails to resolve
    // @ts-ignore - dynamic require for sounds
    require(`../assets/${name}.mp3`);
    return `../assets/${name}.mp3`;
  } catch (e) {
    return null;
  }
}
