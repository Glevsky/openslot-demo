import { defineMiddleware } from "astro:middleware";
import { createRemoteJWKSet, jwtVerify } from "jose";

const LIVE_URL = "https://demo.glevsky.com";
const team = "https://web-preview.cloudflareaccess.com";
const audience = "c0de5a8aba3ce26ae1f79887c3f47f2fabfbdf02ed5bbafad88e6d17d549140c";
const preview = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";

const CLOSED = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Staging | Openslot</title>
  </head>
  <body style="font-family: system-ui, sans-serif; padding: 3rem 1.5rem; max-width: 36rem; margin: 0 auto;">
    <h1>Staging is closed</h1>
    <p>This address only opens after signing in. The live site is at <a href="${LIVE_URL}">${LIVE_URL.replace("https://", "")}</a>.</p>
  </body>
</html>`;

const keys = createRemoteJWKSet(new URL("/cdn-cgi/access/certs", team));

const allowed = async (token: string | null) => {
  if (!token) return false;
  try {
    await jwtVerify(token, keys, { issuer: team, audience });
    return true;
  } catch {
    return false;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (!preview) return next();

  if (!(await allowed(context.request.headers.get("cf-access-jwt-assertion")))) {
    return new Response(CLOSED, {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const response = await next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
});
