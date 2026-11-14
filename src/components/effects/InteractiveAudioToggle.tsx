import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../utils/audio';

export const InteractiveAudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [enabled, setEnabled] = useState(sound.isEnabled());

  const handleToggle = () => {
    const nextState = sound.toggle();
    setEnabled(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
        enabled
          ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:border-purple-400/60'
          : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
      } ${className}`}
      title={enabled ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects'}
      aria-label="Toggle sound effects"
      data-cursor="AUDIO"
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">AUDIO ON</span>
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 bg-cyan-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 bg-purple-400 rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 bg-pink-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">MUTED</span>
        </>
      )}
    </button>
  );
};
