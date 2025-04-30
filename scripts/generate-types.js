#!/usr/bin/env node

/**
 * This script generates TypeScript type definitions for sound names
 * based on the manifest.json file.
 */

const fs = require("fs");
const path = require("path");

// Configuration
const MANIFEST_FILE = path.resolve(__dirname, "../src/manifest.json");
const TYPES_FILE = path.resolve(__dirname, "../src/types.ts");

// Main function
async function generateTypes() {
  console.log("Generating TypeScript types...");

  // Load manifest
  if (!fs.existsSync(MANIFEST_FILE)) {
    console.error(`Manifest file not found: ${MANIFEST_FILE}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));

  // Group sounds by category
  const soundsByCategory = {};

  for (const soundId in manifest.sounds) {
    const [category, name] = soundId.split("/");

    if (!soundsByCategory[category]) {
      soundsByCategory[category] = [];
    }

    soundsByCategory[category].push(name);
  }

  // Generate TypeScript content
  let content = `
/**
 * Categories of sounds available in the library
 */
export type SoundCategory = ${Object.keys(soundsByCategory)
    .map((cat) => `'${cat}'`)
    .join(" | ")};

`;

  // Generate type definitions for each category
  for (const category in soundsByCategory) {
    const soundNames = soundsByCategory[category];
    const categoryTypeName = `${category.charAt(0).toUpperCase()}${category.slice(1)}SoundName`;

    content += `/**
 * ${categoryTypeName} sound names
 */
export type ${categoryTypeName} = ${soundNames.map((name) => `'${name}'`).join(" | ")};

`;
  }

  // Generate SoundName type
  content += `/**
 * All available sound names
 */
export type LibrarySoundName =
  ${Object.entries(soundsByCategory)
    .map(([category, _]) => {
      const categoryTypeName = `${category.charAt(0).toUpperCase()}${category.slice(1)}SoundName`;
      return `| \`${category}/\${${categoryTypeName}}\``;
    })
    .join("\n  ")};

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
}`;

  // Save the file
  fs.writeFileSync(TYPES_FILE, content);
  console.log(`TypeScript types saved to ${TYPES_FILE}`);
}

// Run the script
generateTypes().catch((err) => {
  console.error("Error generating TypeScript types:", err);
  process.exit(1);
});
