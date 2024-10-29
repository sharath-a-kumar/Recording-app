import React, { useState, useCallback } from 'react';
import { Activity, Mic } from 'lucide-react';
import { Stars } from './components/Stars';
import { Waveform } from './components/Waveform';
import { Countdown } from './components/Countdown';
import { useAudioRecording } from './hooks/useAudioRecording';

function App() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const { isRecording, setIsRecording, audioData } = useAudioRecording();

  const startRecording = useCallback(() => {
    let count = 3;
    setCountdown(count);
    
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        setIsRecording(true);
      }
    }, 1000);
  }, [setIsRecording]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, [setIsRecording]);

  return (
    <div className="relative min-h-screen bg-[#1f2937] overflow-hidden">
      <Stars />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Title at the top */}
        <div className="absolute top-8 text-white/80 text-xl font-light tracking-wider">
          babble
        </div>

        {/* Center circle with text/countdown */}
        <div className="relative">
          <button
            onClick={!isRecording ? startRecording : stopRecording}
            className="w-48 h-48 rounded-full bg-white flex items-center justify-center transition-all hover:scale-105"
          >
            <span className="text-[#1f2937] text-2xl font-light tracking-wider">
              {countdown ? countdown : isRecording ? 'Stop' : 'Babble'}
            </span>
          </button>
        </div>

        {/* Waveform */}
        {isRecording && <Waveform audioData={audioData} />}

        {/* Bottom buttons */}
        <div className="absolute bottom-12 flex gap-6">
          <button className="w-12 h-12 rounded-full bg-[#1f2937] border border-[#D4A373] flex items-center justify-center text-[#D4A373] transition-all hover:bg-[#D4A373] hover:text-white">
            <Activity size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-[#1f2937] border border-[#D4A373] flex items-center justify-center text-[#D4A373] transition-all hover:bg-[#D4A373] hover:text-white">
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;