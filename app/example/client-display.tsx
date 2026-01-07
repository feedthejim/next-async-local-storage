"use client";

import { useRequestContext, useFeatureFlag } from "../request-context";

export function ClientDisplay() {
  const { requestId, userName, featureFlags } = useRequestContext();
  const isDarkMode = useFeatureFlag("darkMode");

  return (
    <div className="mb-8 p-4 bg-yellow-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">
        Client Component (using useRequestContext hook)
      </h2>
      <p className="text-sm text-gray-600">Request ID: {requestId}</p>
      <p className="text-sm text-gray-600">User: {userName}</p>
      <p className="text-sm text-gray-600">
        Dark Mode (via useFeatureFlag): {isDarkMode ? "enabled" : "disabled"}
      </p>
      <div className="mt-2">
        <p className="text-sm font-medium">All Feature Flags:</p>
        <ul className="text-sm text-gray-600 ml-4">
          <li>Dark Mode: {featureFlags.darkMode ? "enabled" : "disabled"}</li>
          <li>New Checkout: {featureFlags.newCheckout ? "enabled" : "disabled"}</li>
          <li>Experimental Search: {featureFlags.experimentalSearch ? "enabled" : "disabled"}</li>
          <li>Beta Analytics: {featureFlags.betaAnalytics ? "enabled" : "disabled"}</li>
        </ul>
      </div>
      <button
        onClick={() => alert(`Request ID: ${requestId}`)}
        className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Show Request ID
      </button>
    </div>
  );
}
