import { useEffect, useState, useRef } from "react";

export default function useAudioAnalyzer(audioRef) {
  const [audioLevel, setAudioLevel] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setAudioLevel(avg);
      animationRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationRef.current);
      analyser.disconnect();
      source.disconnect();
    };
  }, [audioRef]);

  return audioLevel;
}
