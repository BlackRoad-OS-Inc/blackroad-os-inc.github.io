/**
 * BlackRoad OS API Worker
 *
 * Handles longer-running tasks that would be too slow for a static site:
 * - GitHub organisation statistics aggregation (cached)
 * - CORS-enabled JSON API for the GitHub Pages frontend
 *
 * Environment variables / secrets (set via `wrangler secret put` or the
 * Cloudflare dashboard):
 *   GITHUB_TOKEN — (optional) fine-grained PAT to raise the API rate limit
 *   CACHE        — (optional) KV namespace binding for response caching
 */

const GITHUB_ORG = "BlackRoad-OS-Inc";
const CACHE_TTL_SECONDS = 300; // 5 minutes

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Only allow GET requests
    if (request.method !== "GET") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    switch (url.pathname) {
      case "/api/health":
        return jsonResponse({
          status: "ok",
          timestamp: new Date().toISOString(),
          service: "blackroad-os-api",
          version: "1.0.0",
        });

      case "/api/stats":
        return handleStats(env, ctx);

      default:
        return jsonResponse({ error: "Not Found" }, 404);
    }
  },
};

/**
 * Aggregate GitHub organisation statistics.
 * Results are cached in KV for CACHE_TTL_SECONDS to avoid rate-limiting.
 */
async function handleStats(env, ctx) {
  const cacheKey = `stats:${GITHUB_ORG}`;

  // Try KV cache first (if namespace is bound)
  if (env.CACHE) {
    const cached = await env.CACHE.get(cacheKey);
    if (cached) {
      return jsonResponse(JSON.parse(cached), 200, { "X-Cache": "HIT" });
    }
  }

  try {
    const headers = {
      "User-Agent": "blackroad-os-worker/1.0",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${env.GITHUB_TOKEN}`;
    }

    // Fetch organisation details from GitHub
    const orgResp = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}`, {
      headers,
    });

    if (!orgResp.ok) {
      const body = await orgResp.text();
      throw new Error(`GitHub API ${orgResp.status}: ${body}`);
    }

    const org = await orgResp.json();

    const stats = {
      name: org.name || GITHUB_ORG,
      description: org.description,
      public_repos: org.public_repos,
      followers: org.followers,
      html_url: org.html_url,
      fetched_at: new Date().toISOString(),
    };

    // Store in KV asynchronously (non-blocking)
    if (env.CACHE) {
      ctx.waitUntil(
        env.CACHE.put(cacheKey, JSON.stringify(stats), {
          expirationTtl: CACHE_TTL_SECONDS,
        })
      );
    }

    return jsonResponse(stats, 200, { "X-Cache": "MISS" });
  } catch (err) {
    return jsonResponse(
      { error: err.message, timestamp: new Date().toISOString() },
      502
    );
  }
}

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return Response.json(body, {
    status,
    headers: { ...CORS_HEADERS, ...extraHeaders },
  });
}
