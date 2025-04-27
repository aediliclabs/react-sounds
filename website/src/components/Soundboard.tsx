import { useState } from "react";
import { playSound, SoundName } from "react-sounds";

const DEMO_SOUNDS = [
  { id: "ui/button_1" as SoundName, label: "Button Click", category: "UI", icon: "🔘" },
  { id: "notification/success_1" as SoundName, label: "Success", category: "Notification", icon: "✅" },
  { id: "notification/error_1" as SoundName, label: "Error", category: "Notification", icon: "❌" },
  { id: "game/coin_1" as SoundName, label: "Coin", category: "Game", icon: "🪙" },
  { id: "ui/switch_1" as SoundName, label: "Switch", category: "UI", icon: "🔄" },
  { id: "notification/message_1" as SoundName, label: "Message", category: "Notification", icon: "💬" },
];

export function Soundboard() {
  const [muted, setMuted] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const playDemoSound = (soundId: SoundName) => {
    if (!muted) {
      playSound(soundId);
      setActiveButton(soundId);
      setTimeout(() => setActiveButton(null), 500);
    }
  };

  return (
    <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-slate-900">Try The Sounds</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Try out some of our most popular sound effects directly in your browser.
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm border border-slate-100">
            <span className="mr-2 text-sm text-slate-600">Mute Demo</span>
            <button
              onClick={() => setMuted(!muted)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                muted ? "bg-slate-300" : "bg-blue-500"
              }`}
              aria-pressed={muted}
              aria-labelledby="mute-toggle"
            >
              <span className="sr-only" id="mute-toggle">
                Toggle mute
              </span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${
                  muted ? "translate-x-1" : "translate-x-6"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {DEMO_SOUNDS.map((sound) => (
            <button
              key={sound.id}
              onClick={() => playDemoSound(sound.id)}
              className={`
                group flex flex-col items-center justify-center p-8
                bg-white rounded-2xl shadow-sm border 
                ${activeButton === sound.id ? "border-blue-500 shadow-lg scale-[1.02]" : "border-slate-100"}
                hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-200
              `}
            >
              <div className="text-4xl mb-4 transition-transform group-hover:rotate-6 group-hover:scale-110">
                {sound.icon}
              </div>
              <div className="w-full">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1 block">
                  {sound.category}
                </span>
                <span className="text-slate-800 font-medium text-lg block">{sound.label}</span>
                {activeButton === sound.id && (
                  <div className="w-full h-1 bg-blue-100 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block px-5 py-3 bg-blue-50 rounded-xl text-sm text-blue-700 shadow-sm border border-blue-100">
            <span className="font-semibold">Lightweight</span>: All sounds loaded on-demand via CDN (&lt; 70kB JS)
          </div>
        </div>
      </div>
    </section>
  );
}
