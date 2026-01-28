import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ url }) => {
  const lang = url.pathname.startsWith("/zh") ? "zh" : "en";
  return { lang };
};
