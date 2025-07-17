"use client";

import Navbar from "../../components/Navbar";

export default function TermsConditionsPage() {
  return (
    <div>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-10 text-white  min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By using <strong>dimple</strong> (dimple.website), you agree to the following terms:
      </p>

      <ol className="list-decimal ml-6 space-y-3">
        <li>
          The service pairs users based on age, location, and opposite sex preferences.
          We do not provide messaging or communication features.
        </li>
        <li>
          You agree to provide accurate information during registration and onboarding.
        </li>
        <li>
          We do not guarantee any matches or specific outcomes from using the service.
        </li>
        <li>
          Your use of the service is at your own risk. We are not liable for any interactions or
          consequences outside the app.
        </li>
        <li>
          We may update these terms at any time. Continued use of the service means you accept the
          updated terms.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        For any questions about these terms, please use the support features within the app.
      </p>
    </main>
    </div>
  );
}
