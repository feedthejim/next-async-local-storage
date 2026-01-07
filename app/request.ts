import { cache, createElement } from "react";
import { RequestContextProvider } from "./request-context";

export interface FeatureFlags {
  darkMode: boolean;
  newCheckout: boolean;
  experimentalSearch: boolean;
  betaAnalytics: boolean;
}

interface RequestContext {
  requestId: string | null;
  featureFlags: FeatureFlags | null;
  userName: string | null;
}

// Internal cache storage - creates one context object per request
const getRequestContext = cache((): RequestContext => ({
  requestId: null,
  featureFlags: null,
  userName: null,
}));

// Simulated async fetch for feature flags
async function fetchFeatureFlags(): Promise<FeatureFlags> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return {
    darkMode: true,
    newCheckout: false,
    experimentalSearch: true,
    betaAnalytics: false,
  };
}

// Simulated async fetch for user name
async function fetchUserName(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 30));
  return "john.doe@example.com";
}

// Internal prepare function
async function prepare(): Promise<void> {
  const ctx = getRequestContext();
  if (ctx.requestId !== null) {
    // Already prepared for this request
    return;
  }
  ctx.requestId = crypto.randomUUID();
  ctx.featureFlags = await fetchFeatureFlags();
  ctx.userName = await fetchUserName();
  console.log("Prepared request context:", ctx.requestId);
}

// Cached prepare call - idempotent per request, safe to call from layout AND pages
export const prepareRequestContext = cache(prepare);

// Synchronous getters - safe to call after prepareRequestContext()
export function getRequestId(): string {
  const ctx = getRequestContext();
  if (ctx.requestId === null) {
    throw new Error("Request context not prepared. Call prepareRequestContext() first.");
  }
  return ctx.requestId;
}

export function getFeatureFlags(): FeatureFlags {
  const ctx = getRequestContext();
  if (ctx.featureFlags === null) {
    throw new Error("Request context not prepared. Call prepareRequestContext() first.");
  }
  return ctx.featureFlags;
}

export function getUserName(): string {
  const ctx = getRequestContext();
  if (ctx.userName === null) {
    throw new Error("Request context not prepared. Call prepareRequestContext() first.");
  }
  return ctx.userName;
}

// Helper to check if a specific feature is enabled
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return getFeatureFlags()[feature];
}

// HOC to wrap server components with request context preparation
// Also provides client context for useRequestContext hook
export function withRequestContext<P extends object>(
  Component: (props: P) => Promise<React.ReactNode>
) {
  return async function WrappedComponent(props: P) {
    await prepareRequestContext();

    const contextValue = {
      requestId: getRequestId(),
      userName: getUserName(),
      featureFlags: getFeatureFlags(),
    };

    return createElement(
      RequestContextProvider,
      { value: contextValue },
      await Component(props)
    );
  };
}
