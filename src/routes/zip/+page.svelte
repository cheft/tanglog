<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import { t, currentLang } from "$lib/i18n";
  import { onMount } from "svelte";
  import {
    Search,
    MapPin,
    Building2,
    Home,
    CheckCircle2,
    Loader2,
    Copy,
    Check,
    Info,
    Truck,
    Clock,
    ArrowLeft,
    X,
  } from "lucide-svelte";
  import { fade, fly, slide } from "svelte/transition";

  let query = $state("");
  let loading = $state(false);
  let error = $state("");
  let result: any = $state(null);
  let searched = $state(false);
  let copied = $state(false);

  let history: string[] = $state([]);
  let showHistory = $state(false);
  let searchContainer: HTMLElement | undefined = $state();

  onMount(() => {
    const saved = localStorage.getItem("zip_history");
    if (saved) {
      try {
        history = JSON.parse(saved);
      } catch (e) {
        history = [];
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainer && !searchContainer.contains(e.target as Node)) {
        showHistory = false;
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  });

  function saveToHistory(val: string) {
    if (!val.trim()) return;
    history = [val, ...history.filter((item) => item !== val)].slice(0, 10);
    localStorage.setItem("zip_history", JSON.stringify(history));
  }

  function removeFromHistory(val: string) {
    history = history.filter((item) => item !== val);
    localStorage.setItem("zip_history", JSON.stringify(history));
  }

  function clearAllHistory() {
    history = [];
    localStorage.setItem("zip_history", JSON.stringify([]));
  }

  async function handleSearch() {
    if (!query.trim()) return;

    saveToHistory(query.trim());
    showHistory = false;
    loading = true;
    error = "";
    searched = true;
    result = null;

    try {
      const response = await fetch(
        `/api/zip?q=${encodeURIComponent(query.trim())}`,
      );
      const data = await response.json();

      if (data.success) {
        result = data;
      } else {
        error = data.message || $t.zip.noResult;
      }
    } catch (e) {
      error = "服务请求失败，请稍后再试。";
    } finally {
      loading = false;
    }
  }

  function handleSelectHistory(val: string) {
    query = val;
    handleSearch();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function copyAddress() {
    if (!result?.addressData) return;
    const { street, city, state, zip } = result.addressData;
    const addr = `${street} ${city}, ${state} ${zip}`;
    navigator.clipboard.writeText(addr);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  let zipData = $derived(result?.zipData);
  let addressData = $derived(result?.addressData);
</script>

<SEOHead
  title="{$t.zip.title} - {$t.companyName}"
  description={$t.zip.description}
/>

<Header />

<main class="min-h-screen bg-slate-50 font-sans">
  <!-- Hero Section -->
  <section class="relative bg-black pt-40 pb-24 px-6 overflow-hidden">
    <!-- CSS-based Technical Background -->
    <div class="absolute inset-0 z-0 bg-[#0B1121]">
      <!-- Radial Gradient for depth -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B1121] to-[#0B1121]"
      ></div>
      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: linear-gradient(#334155 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px); background-size: 40px 40px;"
      ></div>
      <!-- Dark Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent"
      ></div>
    </div>

    <div class="container mx-auto relative z-10">
      <div class="max-w-4xl">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[#EFC743] text-sm font-medium mb-6 backdrop-blur-sm border border-white/5"
        >
          <MapPin class="w-4 h-4 mr-2" />
          US Logistics Tools
        </div>
        <h1
          class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span class="text-[#EFC743]">{$t.zip.title}</span>
        </h1>
        <p class="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          {$t.zip.description}
        </p>
      </div>
    </div>
  </section>

  <div class="container mx-auto px-6 max-w-4xl -mt-12 relative z-10">
    <!-- Search Box -->
    <div class="relative mb-12" bind:this={searchContainer}>
      <div
        class="bg-slate-900/60 backdrop-blur-xl p-2 rounded-full shadow-2xl border border-white/10 flex flex-col md:flex-row gap-2 relative z-20"
      >
        <div class="relative grow">
          <div
            class="absolute inset-y-0 left-6 flex items-center pointer-events-none"
          >
            <Search class="w-6 h-6 text-[#EFC743]" />
          </div>
          <input
            type="text"
            bind:value={query}
            onkeydown={handleKeydown}
            onfocus={() => (showHistory = true)}
            placeholder={$t.zip.placeholder}
            class="w-full pl-16 pr-4 py-4 rounded-full bg-transparent text-white placeholder-white/30 focus:outline-none text-lg font-medium"
          />
        </div>
        <button
          onclick={handleSearch}
          disabled={loading}
          class="bg-[#EFC743] hover:bg-white disabled:bg-slate-500 disabled:opacity-50 text-black font-bold px-10 py-4 rounded-full transition-all shadow-lg flex items-center justify-center min-w-[160px]"
        >
          {#if loading}
            <Loader2 class="w-5 h-5 mr-2 animate-spin" />
            {$t.zip.loading}
          {:else}
            {$t.zip.btn}
          {/if}
        </button>
      </div>

      <!-- History Dropdown -->
      {#if showHistory && history.length > 0}
        <div
          transition:slide={{ duration: 200 }}
          class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10"
        >
          <div
            class="p-3 border-b border-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between"
          >
            <div class="flex items-center">
              <Clock class="w-3 h-3 mr-2" />
              {$t.zip.recentHistory}
            </div>
            <button
              onclick={(e) => {
                e.stopPropagation();
                clearAllHistory();
              }}
              class="text-primary-500 hover:text-primary-700 transition-colors normal-case font-bold"
            >
              {$t.zip.clearAll}
            </button>
          </div>
          <div class="max-h-60 overflow-y-auto">
            {#each history as item}
              <div
                class="w-full h-full flex items-center justify-between group px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <button
                  onclick={() => handleSelectHistory(item)}
                  class="flex items-center grow min-w-0 text-left"
                >
                  <MapPin class="w-4 h-4 text-slate-300 mr-3 shrink-0" />
                  <span class="text-slate-700 font-medium truncate">{item}</span
                  >
                </button>
                <div class="flex items-center ml-4 shrink-0 space-x-2">
                  <button
                    onclick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item);
                    }}
                    class="p-1 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X class="w-4 h-4" />
                  </button>
                  <ArrowLeft
                    class="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors"
                  />
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Multi-address tips -->
    <div class="px-6 mb-8 -mt-8 flex items-center text-slate-400 text-sm">
      <Info class="w-4 h-4 mr-2" />
      <span>{$t.zip.tip}</span>
    </div>

    <!-- Results Section -->
    {#if searched}
      <div class="space-y-8" in:fade={{ duration: 300 }}>
        {#if error}
          <div
            class="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm"
          >
            <div
              class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Info class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">
              {$t.zip.noResultTitle}
            </h3>
            <p class="text-slate-500">{error}</p>
          </div>
        {:else}
          <!-- Address Verification Section -->
          {#if addressData}
            <div
              class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
              in:fly={{ y: 20, duration: 400 }}
            >
              <div
                class="bg-primary-600 text-white p-6 px-8 flex items-center justify-between"
              >
                <div class="flex items-center">
                  <CheckCircle2 class="w-6 h-6 mr-3" />
                  <h2 class="text-xl font-bold">{$t.zip.addressInfo}</h2>
                </div>
              </div>

              <div class="p-8">
                <!-- Address Type Highlight -->
                <div
                  class="mb-10 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div class="flex items-center">
                    <div
                      class="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center mr-4 shadow-lg shadow-primary-900/20"
                    >
                      {#if addressData.type === "住宅地址"}
                        <Home class="w-6 h-6" />
                      {:else}
                        <Building2 class="w-6 h-6" />
                      {/if}
                    </div>
                    <div>
                      <div
                        class="text-slate-400 text-xs uppercase tracking-widest mb-0.5"
                      >
                        {$t.zip.addrType}
                      </div>
                      <div class="text-2xl font-black text-slate-900">
                        {addressData.type}
                      </div>
                    </div>
                  </div>
                  <div
                    class={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${addressData.type === "商业地址" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}
                  >
                    {addressData.type === "商业地址"
                      ? "Commercial"
                      : "Residential"}
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                  <div class="space-y-6">
                    <div>
                      <div
                        class="text-slate-400 text-xs uppercase tracking-widest mb-1.5"
                      >
                        {$t.zip.addr1}
                      </div>
                      <div class="font-bold text-slate-900 text-lg">
                        {addressData.street}
                      </div>
                    </div>
                    <div>
                      <div
                        class="text-slate-400 text-xs uppercase tracking-widest mb-1.5"
                      >
                        {$t.zip.addr2}
                      </div>
                      <div class="font-bold text-slate-900 text-lg">
                        {addressData.street2 || $t.zip.none}
                      </div>
                    </div>
                  </div>
                  <div class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <div
                          class="text-slate-400 text-xs uppercase tracking-widest mb-1.5"
                        >
                          {$t.zip.city}
                        </div>
                        <div class="font-bold text-slate-900 text-lg">
                          {addressData.city}
                        </div>
                      </div>
                      <div>
                        <div
                          class="text-slate-400 text-xs uppercase tracking-widest mb-1.5"
                        >
                          {$t.zip.state}
                        </div>
                        <div class="font-bold text-slate-900 text-lg">
                          {addressData.state}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        class="text-slate-400 text-xs uppercase tracking-widest mb-1.5"
                      >
                        {$t.zip.zipCode}
                      </div>
                      <div class="font-bold text-slate-900 text-lg">
                        {addressData.zip}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div class="grow">
                    <div
                      class="text-slate-400 text-xs uppercase tracking-widest mb-1.5"
                    >
                      {$t.zip.fullAddr}
                    </div>
                    <div class="font-medium text-slate-600">
                      {addressData.street}
                      {addressData.city}, {addressData.state}
                      {addressData.zip}
                    </div>
                  </div>
                  <button
                    onclick={copyAddress}
                    class="flex items-center px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all"
                  >
                    {#if copied}
                      <Check class="w-4 h-4 mr-2" />
                      {$t.zip.copied}
                    {:else}
                      <Copy class="w-4 h-4 mr-2" />
                      {$t.zip.copy}
                    {/if}
                  </button>
                </div>
              </div>
            </div>
          {/if}

          <!-- Zip Classification Section -->
          {#if zipData}
            <div
              class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
              in:fly={{ y: 20, delay: 100, duration: 400 }}
            >
              <div
                class="bg-slate-900 text-white p-6 px-8 flex items-center justify-between"
              >
                <div class="flex items-center">
                  <Truck class="w-6 h-6 mr-3" />
                  <h2 class="text-xl font-bold">
                    {$t.zip.zipInfo} ({zipData.zipcode})
                  </h2>
                </div>
                <div
                  class="bg-white/10 px-4 py-1 rounded-full text-sm font-medium"
                >
                  {zipData.type}
                </div>
              </div>

              <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <!-- UPS -->
                  <div
                    class="bg-slate-50 p-6 rounded-2xl border border-slate-100"
                  >
                    <div class="text-slate-500 text-sm font-medium mb-3">
                      {$t.zip.upsStatus}
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xl text-slate-900">UPS</span>
                      <span
                        class={`px-3 py-1 rounded-lg text-sm font-bold ${zipData.ups === "正常" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {zipData.ups === "正常" && $currentLang === "en"
                          ? $t.zip.statusNormal
                          : zipData.ups}
                      </span>
                    </div>
                  </div>
                  <!-- FEDEX -->
                  <div
                    class="bg-slate-50 p-6 rounded-2xl border border-slate-100"
                  >
                    <div class="text-slate-500 text-sm font-medium mb-3">
                      {$t.zip.fedexStatus}
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xl text-slate-900">FedEx</span
                      >
                      <span
                        class={`px-3 py-1 rounded-lg text-sm font-bold ${zipData.fedex === "正常" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {zipData.fedex === "正常" && $currentLang === "en"
                          ? $t.zip.statusNormal
                          : zipData.fedex}
                      </span>
                    </div>
                  </div>
                  <!-- DHL -->
                  <div
                    class="bg-slate-50 p-6 rounded-2xl border border-slate-100"
                  >
                    <div class="text-slate-500 text-sm font-medium mb-3">
                      {$t.zip.dhlStatus}
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xl text-slate-900">DHL</span>
                      <span
                        class={`px-3 py-1 rounded-lg text-sm font-bold ${zipData.dhl === "正常" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {zipData.dhl === "正常" && $currentLang === "en"
                          ? $t.zip.statusNormal
                          : zipData.dhl}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="p-4 bg-white border border-slate-100 rounded-xl">
                    <div class="text-slate-400 text-xs uppercase mb-1">
                      CITY
                    </div>
                    <div class="font-bold text-slate-900">{zipData.city}</div>
                  </div>
                  <div class="p-4 bg-white border border-slate-100 rounded-xl">
                    <div class="text-slate-400 text-xs uppercase mb-1">
                      STATE
                    </div>
                    <div class="font-bold text-slate-900">{zipData.state}</div>
                  </div>
                  <div class="p-4 bg-white border border-slate-100 rounded-xl">
                    <div class="text-slate-400 text-xs uppercase mb-1">
                      TYPE
                    </div>
                    <div class="font-bold text-slate-900">{zipData.type}</div>
                  </div>
                  <div class="p-4 bg-white border border-slate-100 rounded-xl">
                    <div class="text-slate-400 text-xs uppercase mb-1">ZIP</div>
                    <div class="font-bold text-slate-900">
                      {zipData.zipcode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {/if}
      </div>
    {/if}

    <!-- Help Note -->
    <div class="mt-16 bg-blue-50/50 rounded-3xl p-8 border border-blue-100/50">
      <div class="flex gap-4">
        <Info class="w-6 h-6 text-blue-500 shrink-0" />
        <div class="text-sm text-slate-600 leading-relaxed">
          <p class="font-bold text-blue-900 mb-2">{$t.zip.notesTitle}</p>
          <ul class="list-disc list-inside space-y-1">
            <li>
              {$t.zip.note1}
            </li>
            <li>
              {$t.zip.note2}
            </li>
            <li>
              {$t.zip.note3}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</main>

<Footer />

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
