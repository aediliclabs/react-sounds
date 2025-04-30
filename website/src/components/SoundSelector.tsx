import React, { useEffect, useMemo, useState } from "react";
import { LibrarySoundName } from "react-sounds";
import manifest from "../manifest.json";

interface SoundSelectorProps {
  onSelect: (sound: LibrarySoundName) => void;
  value?: LibrarySoundName;
}

const SoundSelector: React.FC<SoundSelectorProps> = ({ onSelect, value }) => {
  const [searchTerm, setSearchTerm] = useState(value ?? "");
  const [isOpen, setIsOpen] = useState(false);

  // Group sounds by category for better organization
  const soundGroups = useMemo(() => {
    const groups: Record<string, LibrarySoundName[]> = {};

    // Extract sounds from manifest and group by category
    Object.keys(manifest.sounds).forEach((soundKey) => {
      const [category, name] = soundKey.split("/");
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1) + " Sounds";

      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(soundKey as LibrarySoundName);
    });

    return groups;
  }, []);

  // Filter sounds based on search term
  const filteredSounds = useMemo(() => {
    if (!searchTerm) return soundGroups;

    const filtered: Record<string, LibrarySoundName[]> = {};
    Object.entries(soundGroups).forEach(([category, sounds]) => {
      const matchingSounds = sounds.filter((sound) => sound.toLowerCase().includes(searchTerm.toLowerCase()));
      if (matchingSounds.length > 0) {
        filtered[category] = matchingSounds;
      }
    });
    return filtered;
  }, [searchTerm, soundGroups]);

  const handleSelect = (sound: LibrarySoundName) => {
    onSelect(sound);
    setSearchTerm(sound);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".sound-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sound-selector">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a sound..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {Object.entries(filteredSounds).map(([category, sounds]) => (
            <div key={category} className="border-b border-gray-200 last:border-b-0">
              <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700">{category}</div>
              {sounds.map((sound) => (
                <button
                  key={sound}
                  onClick={() => handleSelect(sound)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition duration-150 ease-in-out"
                >
                  {sound}
                </button>
              ))}
            </div>
          ))}
          {Object.keys(filteredSounds).length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center">No sounds found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SoundSelector;
