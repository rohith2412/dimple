"use client";
import { useEffect, useState } from "react";

export default function GlobalMatchCountdown({ nextReset }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const reset = new Date(nextReset);
      const now = new Date();
      const diff = reset - now;

      if (diff <= 0) {
        setTimeLeft("Matching again soon...");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextReset]);

  return (
    <p className="text-gray-400 text-sm mt-2">🔁 Next match in: {timeLeft}</p>
  );
}
