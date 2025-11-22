import { useEffect, useState } from "react";

export default function TypingEffect({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 10); // speed: lower = faster

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p style={{ whiteSpace: "pre-wrap" }}>
      {displayed}
    </p>
  );
}
