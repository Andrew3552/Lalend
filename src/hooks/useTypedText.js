import { useEffect, useState } from "react";

export default function useTypedText(fullText, speed = 30, start = true) {
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!start) return;

    let i = 0;
    setDisplayedText("");
    setFinished(false);

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;

      if (i === fullText.length) {
        clearInterval(interval);
        setFinished(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed, start]);

  return [displayedText, finished];
}
