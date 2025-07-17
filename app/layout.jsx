"use client";

import "./globals.css";
import Background from "./components/Background";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Background />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
