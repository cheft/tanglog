import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ params, data }) => {
  // params.lang comes from [[lang=lang]]
  // data.lang comes from +layout.server.ts (detected by hooks)
  const lang = (params.lang || data.lang || "en") as "en" | "zh";
  return { lang };
};
