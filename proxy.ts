import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  console.log("Proxy activated for request:", request.url);
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/example"],
};
