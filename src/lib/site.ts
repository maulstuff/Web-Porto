export const SITE_NAME = "MLSTVFF";
export const PERSON_NAME = "Maulana Akbar Kusuma";
export const SITE_DESCRIPTION =
  "Maulana Akbar Kusuma (MLSTVFF) is a UI/UX Designer from Indonesia focused on user-centered digital experiences, websites, dashboards, and product design.";

/**
 * Set NEXT_PUBLIC_SITE_URL to the real public URL before deploying.
 * Example: https://mlstvff.com
 * When unset, canonical URLs and the sitemap are intentionally omitted rather
 * than publishing localhost or a made-up domain to search engines.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "";

export function absoluteUrl(path = "/") {
  if (!SITE_URL) return undefined;
  return new URL(path, `${SITE_URL}/`).toString();
}
