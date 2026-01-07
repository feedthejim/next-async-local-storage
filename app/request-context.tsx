"use client";

import { createContext, useContext } from "react";
import type { FeatureFlags } from "./request";

export interface RequestContextValue {
  requestId: string;
  userName: string;
  featureFlags: FeatureFlags;
}

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: RequestContextValue;
}) {
  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
}

export function useRequestContext(): RequestContextValue {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error(
      "useRequestContext must be used within a component wrapped by withRequestContext"
    );
  }
  return context;
}

export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  return useRequestContext().featureFlags[flag];
}
