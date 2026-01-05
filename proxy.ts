import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { runWithRequestId } from "./app/request-id";

export async function proxy(request: NextRequest) {
  console.log("Proxy activated for request:", request.url);
  const requestId = "some id"; // placeholder data as an example
  const response = runWithRequestId(requestId, () => NextResponse.next());

  return response;
}

export const config = {
  matcher: ["/example"],
};
