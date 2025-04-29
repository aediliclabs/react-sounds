import React from "react";
import { SoundName, useSound } from "react-sounds";

interface SoundButtonProps {
  soundName: SoundName;
  children: React.ReactNode;
}

// Simple button component that plays a sound
const SoundButton: React.FC<SoundButtonProps> = ({ soundName, children }) => {
  const { play } = useSound(soundName);
  return (
    <button
      onClick={() => play()}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow transition duration-150 ease-in-out transform hover:scale-105"
    >
      {children}
    </button>
  );
};

const SoundDemo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Hear it in Action!</h3>
      <p className="text-gray-600 mb-8 text-center max-w-lg mx-auto">
        Click the buttons below to hear some example sounds from the library.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        <SoundButton soundName="ui/button_squishy">UI Button 1</SoundButton>
        <SoundButton soundName="notification/success">Success</SoundButton>
        <SoundButton soundName="game/coin">Game Coin</SoundButton>
        <SoundButton soundName="notification/error">Error</SoundButton>
        {/* Add more sound buttons as needed */}
        {/* Example using a different sound name structure if available */}
        {/* <SoundButton soundName="ambient/nature_1">Nature Sound</SoundButton> */}
      </div>
    </div>
  );
};

export default SoundDemo;
