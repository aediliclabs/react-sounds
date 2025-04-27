import React, { ReactNode, useEffect } from "react";
import { useSound } from "./hooks";
import { playSound, preloadSounds } from "./runtime";
import { SoundName, SoundOptions } from "./types";

/**
 * Props for the Sound component
 */
interface SoundProps {
  /**
   * The sound to play (will use local bundled sounds if available)
   */
  name: SoundName;

  /**
   * When to play the sound
   */
  trigger?: "mount" | "unmount" | "none";

  /**
   * Sound playback options
   */
  options?: SoundOptions;

  /**
   * Children components
   */
  children?: ReactNode;

  /**
   * Event handler for when the sound is loaded
   */
  onLoad?: () => void;

  /**
   * Event handler for when the sound is played
   */
  onPlay?: () => void;

  /**
   * Event handler for when the sound is stopped
   */
  onStop?: () => void;
}

/**
 * A component for playing a sound.
 * Will use locally downloaded sounds if available before falling back to CDN.
 */
export function Sound({
  name,
  trigger = "none",
  options,
  children,
  onLoad,
  onPlay,
  onStop,
}: SoundProps): React.ReactElement {
  const { play, stop, isLoaded, isPlaying } = useSound(name, options);

  // Handle load event
  useEffect(() => {
    if (isLoaded && onLoad) {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  // Handle play event
  useEffect(() => {
    if (isPlaying && onPlay) {
      onPlay();
    }
  }, [isPlaying, onPlay]);

  // Handle trigger events
  useEffect(() => {
    if (trigger === "mount") {
      play(options);
    }

    return () => {
      if (trigger === "unmount") {
        playSound(name, options);
      }

      // Clean up the sound when the component is unmounted
      stop();
      if (onStop) onStop();
    };
  }, [trigger, name, play, stop, onStop, options]);

  return <>{children}</>;
}

/**
 * Props for the SoundButton component
 */
interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The sound to play when clicked (will use local bundled sounds if available)
   */
  sound: SoundName;

  /**
   * Sound playback options
   */
  soundOptions?: SoundOptions;

  /**
   * Children components
   */
  children?: ReactNode;
}

/**
 * A button that plays a sound when clicked.
 * Will use locally downloaded sounds if available before falling back to CDN.
 */
export function SoundButton({
  sound,
  soundOptions,
  children,
  onClick,
  ...props
}: SoundButtonProps): React.ReactElement {
  const { play } = useSound(sound, soundOptions);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    play();
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

/**
 * Props for the SoundProvider component
 */
interface SoundProviderProps {
  /**
   * Sounds to preload (will use local bundled sounds if available)
   */
  preload?: SoundName[];

  /**
   * Children components
   */
  children: ReactNode;
}

/**
 * A provider that preloads sounds.
 * Will use locally downloaded sounds if available before falling back to CDN.
 */
export function SoundProvider({ preload = [], children }: SoundProviderProps): React.ReactElement {
  // Preload sounds when the component mounts
  useEffect(() => {
    if (preload.length > 0) {
      preloadSounds(preload).catch((error) => {
        console.error("Error preloading sounds:", error);
      });
    }
  }, [preload]);

  return <>{children}</>;
}
