<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { currentLang } from "$lib/i18n";

  let { children, data } = $props();
  $effect(() => {
    currentLang.set((data?.lang ?? "en") as "en" | "zh");
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
