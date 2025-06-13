import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");

  const response = new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Restricted Area"',
    },
  });

  // Add a custom debug header
  response.headers.set("x-debug-middleware", "fired");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic") {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");

      if (user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS) {
        const nextResponse = NextResponse.next();
        nextResponse.headers.set("x-debug-middleware", "passed");
        return nextResponse;
      }
    }
  }

  return response;
}


export const config = {
   matcher: ["/((?!_next|.*\\..*).*)"],
};
