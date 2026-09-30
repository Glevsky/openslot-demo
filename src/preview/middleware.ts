import { defineMiddleware } from "astro:middleware";
import { LIVE_URL } from "./constants";

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

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.request.headers.get("cf-access-jwt-assertion")) {
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
