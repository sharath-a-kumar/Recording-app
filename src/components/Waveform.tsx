import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  audioData: number[];
}

export const Waveform: React.FC<WaveformProps> = ({ audioData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#D4A373';
    
    const barWidth = canvas.width / audioData.length;
    const heightScale = canvas.height / 2;

    audioData.forEach((value, i) => {
      const height = value * heightScale;
      const x = i * barWidth;
      const y = (canvas.height - height) / 2;
      ctx.fillRect(x, y, barWidth - 1, height);
    });
  }, [audioData]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="absolute bottom-32 left-1/2 -translate-x-1/2"
    />
  );
};