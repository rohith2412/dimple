"use client";

import "./globals.css";
import Background from "./components/Background";
import { SessionProvider } from "next-auth/react";
import GoogleAnalytics from "../components/GoogleAnalytics"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics /> 
        <Background />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
