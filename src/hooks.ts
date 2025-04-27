import { Howl } from "howler";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isSoundEnabled, makeRemoteSound } from "./runtime";
import { SoundHookReturn, SoundName, SoundOptions } from "./types";

/**
 * Hook for using a sound in a React component.
 * Will use local bundled sounds if available before falling back to remote.
 */
export function useSound(
  soundNameOrLoader: SoundName | (() => Promise<Howl>),
  defaultOptions: SoundOptions = {}
): SoundHookReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const activeIdsRef = useRef<number[]>([]);

  // Stabilize the soundLoader reference to prevent unnecessary effect reruns
  const soundLoader = useMemo(() => {
    return typeof soundNameOrLoader === "string" ? makeRemoteSound(soundNameOrLoader) : soundNameOrLoader;
  }, [soundNameOrLoader]);

  useEffect(() => {
    let mounted = true;

    // Load the sound when the component mounts
    soundLoader()
      .then((loadedHowl) => {
        if (!mounted) return;

        loadedHowl.on("end", (id) => {
          if (!mounted) return;

          activeIdsRef.current = activeIdsRef.current.filter((soundId) => soundId !== id);

          if (activeIdsRef.current.length === 0) setIsPlaying(false);
        });

        soundRef.current = loadedHowl;
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading sound:", error);
      });

    return () => {
      mounted = false;

      // Clean up by stopping all sounds and releasing audio resources
      if (soundRef.current) {
        soundRef.current.stop();

        // Remove all sound ids from active list
        activeIdsRef.current = [];
      }
    };
  }, [soundLoader]);

  const play = useCallback(
    async (options: SoundOptions = defaultOptions) => {
      if (!isLoaded || !soundRef.current || !isSoundEnabled()) return; // Make sure sound is ready to play

      const howl = soundRef.current;
      if (options.volume !== undefined) howl.volume(options.volume);
      if (options.rate !== undefined) howl.rate(options.rate);
      if (options.loop !== undefined) howl.loop(options.loop);

      const id = howl.play(); // Uses Howler's clone method internally (howler.js creates a new sound node)

      activeIdsRef.current.push(id);
      setIsPlaying(true);
    },
    [isLoaded, defaultOptions]
  );

  const stop = useCallback(() => {
    if (!soundRef.current) return;

    soundRef.current.stop();
    activeIdsRef.current = [];
    setIsPlaying(false);
  }, []);

  const pause = useCallback(() => {
    if (!soundRef.current) return;

    soundRef.current.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (!soundRef.current || !isSoundEnabled() || activeIdsRef.current.length === 0) return;

    activeIdsRef.current.forEach((id) => soundRef.current?.play(id));

    setIsPlaying(true);
  }, []);

  return { play, stop, pause, resume, isPlaying, isLoaded, soundRef };
}

/**
 * Hook for playing a sound when a value changes
 */
export function useSoundOnChange<T>(soundName: SoundName, value: T, options?: SoundOptions): void {
  const { play } = useSound(soundName);

  // Play the sound when the value changes
  useEffect(() => {
    play(options);
  }, [value, play, options]);
}
