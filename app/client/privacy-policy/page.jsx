"use client";

import Navbar from "../../components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-10 text-white  min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Welcome to <strong>dimple</strong> (dimple.website). Your privacy is important to us.
        This Privacy Policy outlines how we handle your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>We collect your age, location, and a profile photo during onboarding.</li>
        <li>
          Login is handled securely using Google OAuth; we do not store your password.
        </li>
        <li>No messaging or user-to-user communication features are present.</li>
        <li>Cookies are used only for session management via NextAuth.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <p className="mb-4">
        We use your data solely to pair you with other users based on age, location, and
        opposite sex preferences.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing and Security</h2>
      <p className="mb-4">
        We do not share your personal information with third parties except for authentication
        via Google OAuth. Your data is securely stored and handled with care.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal data. Contact support via
        the app if you wish to exercise these rights.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        We do not provide a public email address. Please use the app’s support features for
        any questions regarding privacy.
      </p>
    </main>
    </div>
  );
}
