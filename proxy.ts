import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "portfolio_dashboard_session";

async function createSessionToken(username: string, password: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(username));
  return Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function unauthorized(isApiRequest: boolean) {
  if (isApiRequest) {
    return NextResponse.json(
      { error: "Dashboard authentication required" },
      { status: 401 }
    );
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Portfolio dashboard"' },
  });
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isApiRequest = pathname.startsWith("/api/contacts");
  const isPublicPost = pathname === "/api/contacts" && request.method === "POST";
  if (isPublicPost) return NextResponse.next();

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return unauthorized(isApiRequest);

  const expectedToken = await createSessionToken(username, password);
  if (request.cookies.get(SESSION_COOKIE)?.value === expectedToken) {
    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Basic ")) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(":");
      const user = decoded.slice(0, separator);
      const pass = decoded.slice(separator + 1);

      if (separator > -1 && user === username && pass === password) {
        const response = NextResponse.next();
        response.cookies.set(SESSION_COOKIE, expectedToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 8,
        });
        return response;
      }
    } catch {}
  }

  return unauthorized(isApiRequest);
}

export const config = { matcher: ["/dashboard/:path*", "/api/contacts/:path*"] };
