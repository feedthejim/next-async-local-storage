"use client";

import type { FeatureFlags } from "../request";

interface ClientDisplayProps {
  requestId: string;
  userName: string;
  flags: FeatureFlags;
}

export function ClientDisplay({ requestId, userName, flags }: ClientDisplayProps) {
  return (
    <div className="mb-8 p-4 bg-yellow-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Client Component (receives props from server)</h2>
      <p className="text-sm text-gray-600">Request ID: {requestId}</p>
      <p className="text-sm text-gray-600">User: {userName}</p>
      <p className="text-sm text-gray-600">
        Dark Mode: {flags.darkMode ? "enabled" : "disabled"}
      </p>
      <button
        onClick={() => alert(`Request ID: ${requestId}`)}
        className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Show Request ID
      </button>
    </div>
  );
}
