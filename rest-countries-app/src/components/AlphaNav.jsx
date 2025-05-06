import React from "react";

export default function AlphaNav({ onJump, activeLetter }) {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  return (
    <div className="w-full flex justify-center gap-2 py-6 bg-gradient-to-r from-[#2a165d] to-[#1a174b] rounded-xl shadow-inner mt-10">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onJump(letter)}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition
            ${activeLetter === letter
              ? "bg-pink-500 text-white shadow-lg scale-110"
              : "bg-purple-700 text-pink-200 hover:bg-pink-400 hover:text-white"}
          `}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
