<script lang="ts">
  import Page from '../../blog/+page.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<Page {data} />
