<script lang="ts">
  import Page from '../../../blog/[slug]/+page.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Page {data} />
