const ORIGIN = "https://vorlek-status.fly.dev";
const ALLOWED_ORIGIN_PATTERN = /^https:\/\/([a-z0-9-]+\.)?(status\.vorlek\.com|vorlek-status\.pages\.dev)$/;

function applyCorsHeaders(headers, request) {
  const requestOrigin = request.headers.get("origin");

  if (requestOrigin && ALLOWED_ORIGIN_PATTERN.test(requestOrigin)) {
    headers.set("access-control-allow-origin", requestOrigin);
    headers.set("access-control-allow-credentials", "true");
    headers.append("vary", "Origin");
  }

  return headers;
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: applyCorsHeaders(
          new Headers({
            "access-control-allow-methods": "GET, HEAD, OPTIONS",
            "access-control-allow-headers": "content-type, authorization",
            "access-control-max-age": "86400",
          }),
          request,
        ),
      });
    }

    const incomingUrl = new URL(request.url);
    const upstreamUrl = new URL(incomingUrl.pathname + incomingUrl.search, ORIGIN);
    const headers = new Headers(request.headers);

    headers.set("x-forwarded-host", incomingUrl.host);
    headers.set("x-forwarded-proto", incomingUrl.protocol.replace(":", ""));

    const upstreamRequest = new Request(upstreamUrl, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      redirect: "manual",
    });

    const upstreamResponse = await fetch(upstreamRequest);
    const responseHeaders = new Headers(upstreamResponse.headers);
    const location = responseHeaders.get("location");

    if (location) {
      responseHeaders.set("location", location.replace(ORIGIN, incomingUrl.origin));
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: applyCorsHeaders(responseHeaders, request),
    });
  },
};
