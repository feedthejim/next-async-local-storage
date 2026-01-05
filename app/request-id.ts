import { AsyncLocalStorage } from "node:async_hooks";

const storage = new AsyncLocalStorage<string>();

export function getRequestId() {
  const store = storage.getStore();
  return store;
}

export function runWithRequestId<T>(requestId: string, fn: () => T): T {
  return storage.run(requestId, fn);
}
