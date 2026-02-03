<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { currentLang } from "$lib/i18n";

  let { children, data } = $props();

  // Set language synchronously for initial SSR render
  currentLang.set((data?.lang ?? "en") as "en" | "zh");

  // Maintain reactivity on the client when data changes (route changes)
  $effect(() => {
    if (data.lang) {
      currentLang.set(data.lang as "en" | "zh");
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
