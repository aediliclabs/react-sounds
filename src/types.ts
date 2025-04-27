import { Howl } from 'howler';

/**
 * Categories of sounds available in the library
 */
export type SoundCategory = 'ui' | 'notification' | 'game';

/**
 * UiSoundName sound names
 */
export type UiSoundName = 'button_1';

/**
 * NotificationSoundName sound names
 */
export type NotificationSoundName = 'error_1' | 'success_1';

/**
 * GameSoundName sound names
 */
export type GameSoundName = 'coin_1';

/**
 * All available sound names
 */
export type SoundName = 
  | `ui/${UiSoundName}`
  | `notification/${NotificationSoundName}`
  | `game/${GameSoundName}`;

/**
 * Sound options for playback
 */
export interface SoundOptions {
  /**
   * Volume of the sound (0.0 to 1.0)
   */
  volume?: number;
  
  /**
   * Playback rate (1.0 is normal speed)
   */
  rate?: number;
  
  /**
   * Sound should loop
   */
  loop?: boolean;
}

/**
 * Return type for useSound hook
 */
export interface SoundHookReturn {
  /**
   * Play the sound with optional options
   */
  play: (options?: SoundOptions) => Promise<void>;
  
  /**
   * Stop the sound
   */
  stop: () => void;
  
  /**
   * Pause the sound
   */
  pause: () => void;
  
  /**
   * Resume the sound
   */
  resume: () => void;
  
  /**
   * Check if the sound is currently playing
   */
  isPlaying: boolean;
  
  /**
   * Check if the sound is loaded
   */
  isLoaded: boolean;
  
  /**
   * The underlying Howl instance (if loaded)
   */
  soundRef: React.Ref<Howl | null>;
}