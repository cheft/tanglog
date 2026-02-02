<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/home/Footer.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import { t, currentLang } from "$lib/i18n";
  import {
    Search,
    Package,
    Clock,
    MapPin,
    CheckCircle2,
    Loader2,
    ArrowLeft,
    X,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";

  let trackingNumber = $state("");
  let loading = $state(false);
  let error = $state("");
  let trackingResult: any = $state(null);
  let searched = $state(false);

  let history: string[] = $state([]);
  let showHistory = $state(false);
  let searchContainer: HTMLElement | undefined = $state();

  onMount(() => {
    const saved = localStorage.getItem("track_history");
    if (saved) {
      history = JSON.parse(saved);
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
    localStorage.setItem("track_history", JSON.stringify(history));
  }

  function removeFromHistory(val: string) {
    history = history.filter((item) => item !== val);
    localStorage.setItem("track_history", JSON.stringify(history));
  }

  function clearAllHistory() {
    history = [];
    localStorage.setItem("track_history", JSON.stringify([]));
  }

  async function handleSearch() {
    if (!trackingNumber.trim()) return;

    saveToHistory(trackingNumber.trim());
    showHistory = false;
    loading = true;
    error = "";
    searched = true;
    trackingResult = null;

    try {
      const response = await fetch(
        `/api/track?number=${encodeURIComponent(trackingNumber)}`,
      );
      const result = await response.json();

      if (result.success) {
        trackingResult = result.data;
      } else {
        error = result.message || $t.tracking.empty;
      }
    } catch (e) {
      error = $t.tracking.fetchError;
    } finally {
      loading = false;
    }
  }

  function handleSelectHistory(val: string) {
    trackingNumber = val;
    handleSearch();
  }

  // Handle Enter key
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
</script>

<SEOHead
  title="{$t.tracking.title} - {$t.companyName}"
  description={$t.tracking.description}
/>

<Header />

<main class="min-h-screen bg-slate-50 font-sans">
  <!-- Hero Section -->
  <section class="relative bg-black pt-40 pb-24 px-6 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/map.jpeg"
        alt="Tracking Background"
        class="w-full h-full object-cover opacity-40"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"
      ></div>
    </div>

    <div class="container mx-auto relative z-10">
      <div class="max-w-4xl">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[#EFC743] text-sm font-medium mb-6 backdrop-blur-sm border border-white/5"
        >
          <Package class="w-4 h-4 mr-2" />
          {$t.tracking.realtime}
        </div>
        <h1
          class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <span class="text-[#EFC743]">{$t.tracking.title}</span>
        </h1>
        <p class="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          {$t.tracking.description}
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
            bind:value={trackingNumber}
            onkeydown={handleKeydown}
            onfocus={() => (showHistory = true)}
            placeholder={$t.tracking.placeholder}
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
            {$t.tracking.loading}
          {:else}
            {$t.tracking.btn}
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
              {$t.tracking.recentHistory}
            </div>
            <button
              onclick={(e) => {
                e.stopPropagation();
                clearAllHistory();
              }}
              class="text-primary-500 hover:text-primary-700 transition-colors normal-case font-bold"
            >
              {$t.tracking.clearAll}
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
                  <Package class="w-4 h-4 text-slate-300 mr-3 shrink-0" />
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

    <!-- Results Section -->
    {#if searched}
      <div in:fade={{ duration: 300 }}>
        {#if error}
          <div
            class="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm"
          >
            <div
              class="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Package class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">
              {$t.tracking.noInfoTitle}
            </h3>
            <p class="text-slate-500">{error}</p>
          </div>
        {:else if trackingResult}
          <div
            class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <!-- Summary Header -->
            <div class="bg-slate-900 text-white p-8 md:p-10">
              <div
                class="flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div
                    class="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] mb-2"
                  >
                    {$t.tracking.result}
                  </div>
                  <h2 class="text-3xl font-bold mb-1">
                    {trackingResult.preBillCode}
                  </h2>
                  <div
                    class="inline-flex items-center text-primary-400 text-sm font-medium"
                  >
                    <CheckCircle2 class="w-4 h-4 mr-2" />
                    {$t.tracking.shipmentIdentified}
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-8">
                  <div>
                    <div
                      class="text-slate-400 text-xs uppercase tracking-widest mb-1"
                    >
                      {$t.tracking.destination}
                    </div>
                    <div class="font-bold text-lg">
                      {$currentLang === "zh"
                        ? trackingResult.countryCnName
                        : trackingResult.countryEnName}
                    </div>
                  </div>
                  <div>
                    <div
                      class="text-slate-400 text-xs uppercase tracking-widest mb-1"
                    >
                      {$t.tracking.waybill}
                    </div>
                    <div class="font-bold text-lg">
                      {trackingResult.waybillCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 md:p-12">
              <div class="mb-8">
                <p
                  class="text-xs text-slate-400 uppercase tracking-widest mb-1"
                >
                  {$t.tracking.statusReport}
                </p>
                <h3 class="text-xl font-bold text-slate-900">
                  {$t.tracking.cargoJourney}
                </h3>
              </div>

              <!-- Timeline -->
              <div class="relative">
                <!-- Vertical Line -->
                <div
                  class="absolute left-[7px] top-6 bottom-6 w-[2px] bg-slate-100"
                ></div>

                <div class="space-y-10">
                  {#each trackingResult.events as event, i}
                    <div
                      class="relative pl-8"
                      in:fly={{ y: 20, delay: i * 50, duration: 400 }}
                    >
                      <!-- Dot -->
                      <div
                        class={`absolute left-0 top-1.5 w-[16px] h-[16px] rounded-full border-4 border-white shadow-sm z-10 ${i === 0 ? "bg-primary-600 ring-4 ring-primary-100" : "bg-slate-300"}`}
                      ></div>

                      <div
                        class="flex flex-col md:flex-row md:items-start gap-2 md:gap-8"
                      >
                        <!-- Time -->
                        <div class="shrink-0 w-44">
                          <div
                            class="text-slate-500 font-medium text-sm flex items-center"
                          >
                            <Clock class="w-3.5 h-3.5 mr-2 opacity-60" />
                            {event.time}
                          </div>
                        </div>

                        <!-- Content -->
                        <div class="grow">
                          <div
                            class={`text-base leading-relaxed ${i === 0 ? "text-slate-900 font-bold" : "text-slate-600"}`}
                          >
                            {event.status}
                          </div>
                          {#if event.location}
                            <div
                              class="flex items-center text-slate-400 text-xs mt-1.5 font-medium"
                            >
                              <MapPin class="w-3 h-3 mr-1.5" />
                              {event.location}
                            </div>
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {:else if loading}
          <!-- Loading State Shimmer -->
          <div class="space-y-6">
            <div class="bg-slate-200 rounded-3xl h-48 animate-pulse"></div>
            <div
              class="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm space-y-8 animate-pulse"
            >
              {#each Array(4) as _}
                <div class="flex gap-8">
                  <div class="h-4 bg-slate-100 rounded w-24"></div>
                  <div class="h-4 bg-slate-100 rounded grow"></div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Help Section -->
    <div class="mt-16 text-center">
      <p class="text-slate-500 mb-4">Having trouble tracking your cargo?</p>
      <a href="/#contact" class="text-primary-600 font-bold hover:underline"
        >Contact our support team</a
      >
    </div>
  </div>
</main>

<Footer />

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
