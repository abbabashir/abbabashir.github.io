import React, { useEffect, useState } from 'react';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600);
          }, 200);
          return 100;
        }
        const diff = Math.random() * 25 + 10;
        return Math.min(100, Math.floor(prev + diff));
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <span className="font-mono text-2xl md:text-3xl font-bold tracking-[0.35em] text-white">
            BASHIR
          </span>
          <span className="absolute -right-3 top-0 h-2 w-2 rounded-full bg-blue-500 animate-ping" />
        </div>

        <div className="w-48 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
            Initializing Engine
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
