"use client";

import { useEffect } from "react";

export default function GoogleAnalytics() {
  useEffect(() => {
    // Inject gtag.js script
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-W4Z4F6JYR2";
    script1.async = true;
    document.head.appendChild(script1);

    // Inject inline config
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-W4Z4F6JYR2');
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
}
