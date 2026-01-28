<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import { t, currentLang } from "$lib/i18n";
  import {
    calculateRates,
    type CalculationResult,
    getZoneFromZip,
  } from "$lib/utils/calculator";
  import { CARGO_TYPES } from "$lib/data/pricingData";
  import {
    Package,
    MapPin,
    Scale,
    Ruler,
    Calculator,
    Clock,
    DollarSign,
    Info,
    MessageCircle,
    Home,
    Truck,
    Search,
    Loader2,
    ChevronDown,
    Plus,
    Trash2,
    Box,
    AlertTriangle,
    Building2,
  } from "lucide-svelte";
  import { fade, fly, slide } from "svelte/transition";

  export let lang: "zh" | "en" = "zh";

  $: currentLang.set(lang);

  let zip = "";
  let items: any[] = [
    { cargoType: "GENERAL", weight: 21, l: 60, w: 50, h: 40, quantity: 1 },
  ];
  let isResidential = false;
  let isPublic = false;
  let isRemote = false;
  let isSuperRemote = false;

  let results: CalculationResult[] = [];
  let hasCalculated = false;
  let isCalculating = false;
  let hasAttemptedSubmit = false;
  let zone = "";
  let showOversizeWarning = false; // Store oversize state at calculation time
  let isShaking = false;

  $: zoneLabels = (
    lang === "en"
      ? {
          la: "Los Angeles",
          west: "West",
          central: "Central",
          east: "East",
        }
      : {
          la: "洛杉矶本土",
          west: "美西地区",
          central: "美中地区",
          east: "美东地区",
        }
  ) as Record<string, string>;

  // Translate transit time
  function translateTransitTime(timeStr: string): string {
    if (lang === "zh") {
      return timeStr.replace("work days", "工作日");
    }
    return timeStr;
  }

  function resolve(path: string, params?: Record<string, any>) {
    const keys = path.split(".");
    let value: any = $t;
    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      } else {
        return path;
      }
    }
    if (typeof value === "string" && params) {
      return value.replace(/{(\w+)}/g, (_, k) =>
        params[k] !== undefined ? params[k] : `{${k}}`,
      );
    }
    return value as string;
  }

  function getWhatsAppUrl(result: CalculationResult) {
    const channel = resolve(result.channelName);
    const residentialText = isResidential
      ? $t.calculator.yes
      : $t.calculator.no;
    const remoteText = isRemote ? $t.calculator.yes : $t.calculator.no;

    const itemsSummary = items
      .map((item) => {
        const cargoName = resolve(
          `pricing.cargo.${item.cargoType.toLowerCase()}`,
        );
        return `${cargoName}: ${item.quantity}x (${item.weight}kg, ${item.l}x${item.w}x${item.h}cm)`;
      })
      .join("\n");

    const cargoTypes = [
      ...new Set(
        items.map((item) =>
          resolve(`pricing.cargo.${item.cargoType.toLowerCase()}`),
        ),
      ),
    ].join(", ");

    const text = resolve("calculator.inquireMessage", {
      channel,
      zip,
      weight: result.totalActualWeight.toFixed(1),
      dims: itemsSummary,
      billable: result.billableWeight.toFixed(1),
      residential: isPublic
        ? lang === "zh"
          ? "公共特殊地址"
          : "Public Address"
        : residentialText,
      remote: isSuperRemote
        ? lang === "zh"
          ? "超级偏远"
          : "Super Remote"
        : remoteText,
      cargo: cargoTypes,
      price: Math.round(result.totalPrice),
      priceUsd: Math.round(result.totalPrice / 7),
    });
    return `https://wa.me/8617722561770?text=${encodeURIComponent(text)}`;
  }

  function addItem() {
    items = [
      ...items,
      {
        cargoType: "GENERAL",
        weight: 21,
        l: 60,
        w: 50,
        h: 40,
        quantity: 1,
      },
    ];
  }

  function removeItem(index: number) {
    if (items.length > 1) {
      items = items.filter((_, i) => i !== index);
    }
  }

  let sortOption: "price" | "time" = "price";
  let filterOption:
    | "all"
    | "express"
    | "air"
    | "air_truck"
    | "sea"
    // | "sea_truck"
    | "sea_truck_over" = "all";

  function parseTransitTime(timeStr: string): number {
    const match = timeStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 999;
  }

  // Reactive sorted and filtered results
  $: sortedResults = [...results]
    .filter((r) => {
      if (filterOption === "all") return true;
      if (filterOption === "express") return r.methodName.includes("express");
      if (filterOption === "air")
        return r.methodName === "pricing.methods.air_freight";
      if (filterOption === "air_truck")
        return r.methodName === "pricing.methods.air_truck";
      if (filterOption === "sea")
        return r.methodName === "pricing.methods.sea_pier";
      // if (filterOption === "sea_truck")
      //   return r.methodName === "pricing.methods.sea_truck";
      if (filterOption === "sea_truck_over")
        return r.methodName === "pricing.methods.sea_truck_oversize";
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "price") {
        return a.totalPrice - b.totalPrice;
      } else {
        const timeA = parseTransitTime(a.transitTime);
        const timeB = parseTransitTime(b.transitTime);
        return timeA - timeB;
      }
    });

  // Reactive: Calculate maximum dimension across all items
  $: maxDimension = Math.max(
    ...items.map((item) => Math.max(item.l, item.w, item.h)),
    0,
  );

  // Reactive: Count results per category
  $: counts = {
    all: results.length,
    express: results.filter((r) => r.methodName.includes("express")).length,
    air: results.filter((r) => r.methodName === "pricing.methods.air_freight")
      .length,
    air_truck: results.filter(
      (r) => r.methodName === "pricing.methods.air_truck",
    ).length,
    sea: results.filter((r) => r.methodName === "pricing.methods.sea_pier")
      .length,
    // sea_truck: results.filter(
    //   (r) => r.methodName === "pricing.methods.sea_truck",
    // ).length,
    sea_truck_over: results.filter(
      (r) => r.methodName === "pricing.methods.sea_truck_oversize",
    ).length,
  };

  // Validation functions
  function isZipValid(zipValue: string): boolean {
    if (!zipValue || zipValue.trim() === "") return false;
    // Allow 5-digit zip or full address (longer than 5 chars with letters)
    const trimmed = zipValue.trim();
    if (/^\d{5}$/.test(trimmed)) return true; // 5-digit zip
    if (trimmed.length > 5 && /[a-zA-Z]/.test(trimmed)) return true; // Full address
    return false;
  }

  function isItemValid(item: any): boolean {
    return (
      item.quantity > 0 &&
      item.weight > 0 &&
      item.l > 0 &&
      item.w > 0 &&
      item.h > 0
    );
  }

  $: isFormValid = isZipValid(zip) && items.every(isItemValid);

  function handleCalculate() {
    hasAttemptedSubmit = true;
    if (!isFormValid) {
      if (!isZipValid(zip)) {
        isShaking = true;
        setTimeout(() => (isShaking = false), 500);
      }
      return;
    }

    isCalculating = true;

    // Store oversize state at calculation time
    showOversizeWarning = maxDimension >= 600;
    // Use setTimeout to allow UI to update before calculation
    setTimeout(() => {
      results = calculateRates(
        zip,
        items,
        isResidential,
        isRemote,
        isSuperRemote,
        isPublic,
      );
      zone = getZoneFromZip(zip);
      hasCalculated = true;
      isCalculating = false;
    }, 100);
  }
</script>

<SEOHead title={$t.calculator.title} description={$t.calculator.description} />

<Header />

<main class="py-12 md:py-20 bg-[#F8FAFC]">
  <div class="container mx-auto px-6">
    <div class="text-center mb-12">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-bold text-sm mb-6"
      >
        <Calculator class="w-4 h-4" />
        {$t.calculator.title}
      </div>
      <h1
        class="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight"
      >
        {$t.calculator.title}
      </h1>
      <p class="text-slate-500 font-medium text-lg">
        {$t.calculator.description}
      </p>
    </div>

    <!-- Main Content Grid: Left Calculator Form, Right Results List -->
    <!-- Using a simple 2-column grid that activates on 'md' (tablet) and up. 50/50 split. -->
    <div class="grid md:grid-cols-2 gap-8 items-start max-w-[1400px] mx-auto">
      <!-- LEFT: Calculator Form -->
      <div
        class="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 sticky top-24"
      >
        <div class="space-y-6">
          <!-- Zip Code -->
          <div class="relative">
            <label
              for="zip"
              class="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"
            >
              <MapPin class="w-4 h-4 text-primary-500" />
              {$t.calculator.zipLabel}
            </label>
            <div class="relative group">
              <input
                id="zip"
                type="text"
                bind:value={zip}
                placeholder="e.g. 90001"
                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 pl-12 text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:border-primary-500 transition-all outline-none group-hover:border-slate-200"
                class:!border-red-700={hasAttemptedSubmit && !isZipValid(zip)}
                class:animate-shake={isShaking}
              />
              <Search
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors"
              />
            </div>
            {#if zone}
              <div
                class="absolute right-4 top-[3.25rem] px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-lg pointer-events-none"
                in:fade
              >
                {zoneLabels[zone] || zone.toUpperCase()}
              </div>
            {/if}
          </div>

          <!-- Cargo Items -->
          <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
              <label
                class="block text-sm font-bold text-slate-700 flex items-center gap-2"
              >
                <Package class="w-4 h-4 text-primary-500" />
                {$t.calculator.cargoItems || "Cargo Items"}
              </label>
            </div>

            <div class="space-y-2">
              <!-- Item Header (Desktop) -->
              <div
                class="hidden md:grid grid-cols-12 gap-2 px-4 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider"
              >
                <div class="col-span-3">
                  {$t.calculator.cargoType}
                </div>
                <div class="col-span-2 text-center">
                  {$t.calculator.qty}
                </div>
                <div class="col-span-2 text-center">
                  {$t.calculator.weightShort}
                </div>
                <div class="col-span-4 text-center">
                  {$t.calculator.dimsShort}
                </div>
                <div class="col-span-1"></div>
              </div>

              {#each items as item, index (index)}
                <div
                  class="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-100 transition-colors"
                  transition:slide
                >
                  <div
                    class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-2 items-center"
                  >
                    <!-- Mobile Index & Remove -->
                    <div
                      class="md:hidden flex items-center justify-between mb-1"
                    >
                      <span
                        class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
                        >{$t.calculator.itemIndex} #{index + 1}</span
                      >
                      {#if items.length > 1}
                        <button
                          on:click={() => removeItem(index)}
                          class="text-red-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      {/if}
                    </div>

                    <!-- Cargo Type -->
                    <div class="md:col-span-3">
                      <div class="relative group">
                        <select
                          bind:value={item.cargoType}
                          class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-primary-500 transition-all outline-none appearance-none cursor-pointer text-xs"
                        >
                          {#each Object.entries(CARGO_TYPES) as [key, type]}
                            <option value={key}>{resolve(type.name)}</option>
                          {/each}
                        </select>
                        <div
                          class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                        >
                          <ChevronDown class="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    <!-- Quantity -->
                    <div class="md:col-span-2">
                      <div class="relative">
                        <input
                          type="number"
                          min="1"
                          bind:value={item.quantity}
                          class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-slate-900 font-bold focus:border-primary-500 transition-all outline-none text-xs"
                          class:!border-red-700={hasAttemptedSubmit &&
                            !item.quantity}
                          placeholder="Qty"
                        />
                      </div>
                    </div>

                    <!-- Weight -->
                    <div class="md:col-span-2">
                      <div class="relative">
                        <input
                          type="number"
                          bind:value={item.weight}
                          class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-slate-900 font-bold focus:border-primary-500 transition-all outline-none text-xs"
                          class:!border-red-700={hasAttemptedSubmit &&
                            !item.weight}
                          placeholder="KG"
                        />
                      </div>
                    </div>

                    <!-- Dimensions -->
                    <div class="md:col-span-4">
                      <div class="grid grid-cols-3 gap-1">
                        <input
                          type="number"
                          bind:value={item.l}
                          placeholder="L"
                          class="w-full bg-white border border-slate-200 rounded-xl py-2 text-center text-slate-900 font-bold focus:border-primary-500 transition-all outline-none text-xs"
                          class:!border-red-700={hasAttemptedSubmit && !item.l}
                        />
                        <input
                          type="number"
                          bind:value={item.w}
                          placeholder="W"
                          class="w-full bg-white border border-slate-200 rounded-xl py-2 text-center text-slate-900 font-bold focus:border-primary-500 transition-all outline-none text-xs"
                          class:!border-red-700={hasAttemptedSubmit && !item.w}
                        />
                        <input
                          type="number"
                          bind:value={item.h}
                          placeholder="H"
                          class="w-full bg-white border border-slate-200 rounded-xl py-2 text-center text-slate-900 font-bold focus:border-primary-500 transition-all outline-none text-xs"
                          class:!border-red-700={hasAttemptedSubmit && !item.h}
                        />
                      </div>
                    </div>

                    <!-- Remove (Desktop) -->
                    <div class="hidden md:flex md:col-span-1 justify-center">
                      {#if items.length > 1}
                        <button
                          on:click={() => removeItem(index)}
                          class="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <button
              on:click={addItem}
              class="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs hover:border-primary-300 hover:text-primary-500 hover:bg-primary-50/30 transition-all flex items-center justify-center gap-2 mt-1"
            >
              <Plus class="w-3.5 h-3.5" />
              {$t.calculator.addItem}
            </button>
          </div>

          <!-- Compact Options Grid -->
          <div class="grid grid-cols-2 gap-2 mt-2">
            <!-- Row 1: Remote Area & Super Remote -->
            <label
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all border-2 border-transparent select-none {isRemote
                ? '!bg-primary-50 !border-primary-100 !shadow-primary-500/5'
                : 'bg-slate-50'}"
            >
              <input
                type="checkbox"
                bind:checked={isRemote}
                on:change={() => {
                  if (isRemote) isSuperRemote = false;
                }}
                class="w-4 h-4 text-primary-600 rounded border-2 border-slate-300 focus:ring-offset-0 focus:ring-0"
              />
              <span
                class="font-bold text-xs flex items-center gap-1.5 {isRemote
                  ? 'text-primary-700'
                  : 'text-slate-600'}"
              >
                <Truck class="w-3.5 h-3.5" />
                {$t.calculator.remote}
              </span>
            </label>

            <label
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all border-2 border-transparent select-none {isSuperRemote
                ? '!bg-red-50 !border-red-100 !shadow-red-500/5'
                : 'bg-slate-50'}"
            >
              <input
                type="checkbox"
                bind:checked={isSuperRemote}
                on:change={() => {
                  if (isSuperRemote) isRemote = false;
                }}
                class="w-4 h-4 text-red-600 rounded border-2 border-slate-300 focus:ring-offset-0 focus:ring-0"
              />
              <span
                class="font-bold text-xs flex items-center gap-1.5 {isSuperRemote
                  ? 'text-red-700'
                  : 'text-slate-600'}"
              >
                <Truck class="w-3.5 h-3.5" />
                {$t.calculator.superRemote}
              </span>
            </label>

            <!-- Row 2: Residential & Public Address -->
            <label
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all border-2 border-transparent select-none {isResidential
                ? '!bg-primary-50 !border-primary-100 !shadow-primary-500/5'
                : 'bg-slate-50'}"
            >
              <input
                type="checkbox"
                bind:checked={isResidential}
                on:change={() => {
                  if (isResidential) isPublic = false;
                }}
                class="w-4 h-4 text-primary-600 rounded border-2 border-slate-300 focus:ring-offset-0 focus:ring-0"
              />
              <span
                class="font-bold text-xs flex items-center gap-1.5 {isResidential
                  ? 'text-primary-700'
                  : 'text-slate-600'}"
              >
                <Home class="w-3.5 h-3.5" />
                {$t.calculator.residential}
              </span>
            </label>

            <label
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all border-2 border-transparent select-none {isPublic
                ? '!bg-indigo-50 !border-indigo-100 !shadow-indigo-500/5'
                : 'bg-slate-50'}"
            >
              <input
                type="checkbox"
                bind:checked={isPublic}
                on:change={() => {
                  if (isPublic) isResidential = false;
                }}
                class="w-4 h-4 text-indigo-600 rounded border-2 border-slate-300 focus:ring-offset-0 focus:ring-0"
              />
              <span
                class="font-bold text-xs flex items-center gap-1.5 {isPublic
                  ? 'text-indigo-700'
                  : 'text-slate-600'}"
              >
                <Building2 class="w-3.5 h-3.5" />
                {$t.calculator.publicAddress}
              </span>
            </label>
          </div>

          <div class="w-full text-right !mt-1">
            <a
              href={lang === "zh" ? "/zh/zip" : "/zip"}
              class="text-[10px] font-medium text-primary-500 hover:text-primary-600 underline underline-offset-4"
            >
              {lang === "zh"
                ? "查询地址是否为商业/住宅及偏远属性"
                : "Check residential/commercial and remote address attributes"}
            </a>
          </div>

          <!-- Calculate Button -->
          <button
            on:click={handleCalculate}
            disabled={isCalculating}
            class="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {#if isCalculating}
              <Loader2 class="w-5 h-5 animate-spin text-primary-400" />
            {:else}
              <Calculator
                class="w-5 h-5 text-primary-400 group-hover:rotate-12 transition-transform"
              />
            {/if}
            {$t.calculator.calculate}
          </button>
        </div>
      </div>

      <!-- RIGHT: Results List -->
      <div>
        {#if hasCalculated && showOversizeWarning}
          <!-- Super Oversize Warning Card -->
          <div
            class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-amber-500/10"
            in:fly={{ y: -20, duration: 400 }}
          >
            <div class="flex items-start gap-4">
              <div
                class="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 flex-shrink-0"
              >
                <AlertTriangle class="w-7 h-7" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-black text-amber-900 mb-2">
                  {$t.calculator.superOversizeTitle}
                </h3>
                <p class="text-amber-700 font-medium leading-relaxed mb-4">
                  {$t.calculator.superOversizeDesc}
                </p>
                <div class="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/8617722561770?text={encodeURIComponent(
                      lang === 'zh'
                        ? '你好，我有一批超尺寸货物需要询价，最大边长超过600cm，请问如何处理？'
                        : 'Hello, I have super oversized cargo with max edge over 600cm. Please advise.',
                    )}"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-500/20 transition-all active:scale-95"
                  >
                    <MessageCircle class="w-4 h-4" />
                    WhatsApp {$t.calculator.contactUs}
                  </a>
                  <div
                    class="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-xl text-amber-800 font-bold text-sm"
                  >
                    <Ruler class="w-4 h-4" />
                    {lang === "zh" ? "最大边长" : "Max edge"}: {maxDimension}cm
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else if hasCalculated && results.length > 0}
          <div class="space-y-6" in:fade={{ duration: 300, delay: 100 }}>
            <!-- Results Header & Sticky Summary -->
            <div
              class="sticky top-24 z-10 bg-[#F8FAFC]/80 backdrop-blur-md pb-4 pt-1 space-y-4"
            >
              <!-- Top Row: Results Title (Left) + Sort Control -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm"
                  >
                    <DollarSign class="w-6 h-6" />
                  </div>
                  <h2 class="text-2xl font-black text-slate-900">
                    {$t.calculator.results}
                  </h2>
                </div>
                <!-- Disclaimer -->
                <div class="text-center px-4">
                  <p class="text-slate-400 text-xs leading-relaxed">
                    * {$t.calculator.disclaimer}
                  </p>
                </div>
              </div>

              <!-- Summary Card (Full Width) -->
              <div
                class="bg-white border-2 border-primary-100 rounded-[1.5rem] p-4 shadow-lg shadow-primary-500/5 flex items-center justify-between gap-6"
                in:fade
              >
                <div class="flex items-center gap-6 flex-1 justify-around">
                  <div class="flex flex-col items-center">
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                      >{$t.calculator.totalActual}</span
                    >
                    <span class="text-sm font-black text-slate-900">
                      {results[0].totalActualWeight.toFixed(1)}
                      <span class="text-slate-300">KG</span>
                    </span>
                  </div>
                  <!-- Divider -->
                  <div class="w-px h-8 bg-slate-100"></div>
                  <div class="flex flex-col items-center">
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                      >{$t.calculator.totalVolume}</span
                    >
                    <span class="text-sm font-black text-slate-900">
                      {results[0].totalVolumeWeight.toFixed(1)}
                      <span class="text-slate-300">KG</span>
                    </span>
                  </div>
                  <!-- Divider -->
                  <div class="w-px h-8 bg-slate-100"></div>
                  <div class="flex flex-col items-center">
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                      >{$t.calculator.totalCBM}</span
                    >
                    <span class="text-sm font-black text-slate-900">
                      {results[0].totalVolumeCBM.toFixed(3)}
                      <span class="text-slate-300">M³</span>
                    </span>
                  </div>
                  <!-- Divider -->
                  <div class="w-px h-8 bg-slate-100"></div>
                  <div class="flex flex-col items-center">
                    <span
                      class="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1"
                      >{$t.calculator.billable}</span
                    >
                    <span class="text-base font-black text-primary-600">
                      {results[0].originalBillableWeight ??
                        results[0].billableWeight}
                      <span class="text-primary-300 text-xs">KG</span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex justify-between gap-3">
                <!-- Sort Control (Moved here) -->
                <div class="flex items-center gap-2">
                  <select
                    bind:value={sortOption}
                    class="bg-white border text-xs font-bold text-slate-500 border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-primary-500 cursor-pointer hover:border-slate-300 transition-colors"
                  >
                    <option value="price">{$t.calculator.sortPrice}</option>
                    <option value="time">{$t.calculator.sortTime}</option>
                  </select>
                </div>
                <!-- Filter Tags (Right) -->
                <div class="flex flex-wrap items-center justify-end gap-1">
                  <button
                    on:click={() => (filterOption = "all")}
                    disabled={hasCalculated && counts.all === 0}
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'all'
                      ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}"
                    >{$t.calculator.filterAll} ({hasCalculated
                      ? counts.all
                      : 0})</button
                  >

                  <button
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'express'
                      ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50'}"
                    on:click={() => (filterOption = "express")}
                    disabled={hasCalculated && counts.express === 0}
                    >{$t.calculator.filterExpress} ({hasCalculated
                      ? counts.express
                      : 0})</button
                  >

                  <button
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'air'
                      ? 'bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-sky-200 hover:text-sky-600 hover:bg-sky-50'}"
                    on:click={() => (filterOption = "air")}
                    disabled={hasCalculated && counts.air === 0}
                    >{$t.calculator.filterAir} ({hasCalculated
                      ? counts.air
                      : 0})</button
                  >

                  <button
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'air_truck'
                      ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-teal-200 hover:text-teal-600 hover:bg-teal-50'}"
                    on:click={() => (filterOption = "air_truck")}
                    disabled={hasCalculated && counts.air_truck === 0}
                    >{$t.calculator.filterAirTruck} ({hasCalculated
                      ? counts.air_truck
                      : 0})</button
                  >

                  <button
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'sea'
                      ? 'bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-700 hover:bg-blue-50'}"
                    on:click={() => (filterOption = "sea")}
                    disabled={hasCalculated && counts.sea === 0}
                    >{$t.calculator.filterSea} ({hasCalculated
                      ? counts.sea
                      : 0})</button
                  >

                  <!-- <button
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'sea_truck'
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50'}"
                    on:click={() => (filterOption = "sea_truck")}
                    disabled={hasCalculated && counts.sea_truck === 0}
                    >{$t.calculator.filterSeaTruck} ({hasCalculated
                      ? counts.sea_truck
                      : 0})</button
                  > -->

                  <button
                    class="px-2 py-1 text-[10px] font-black uppercase tracking-wide rounded-lg transition-all border disabled:opacity-50 disabled:cursor-not-allowed {filterOption ===
                    'sea_truck_over'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-purple-200 hover:text-purple-600 hover:bg-purple-50'}"
                    on:click={() => (filterOption = "sea_truck_over")}
                    disabled={hasCalculated && counts.sea_truck_over === 0}
                    >{$t.calculator.filterSeaTruckOver} ({hasCalculated
                      ? counts.sea_truck_over
                      : 0})</button
                  >
                </div>
              </div>
            </div>

            <!-- Result Cards -->
            {#each sortedResults as result, i (result.id)}
              <div
                class="group bg-white rounded-[2rem] p-6 hover:shadow-xl hover:shadow-slate-200/40 transition-all border border-slate-100 relative overflow-hidden"
                in:fly={{
                  y: 20,
                  duration: 400,
                  delay: i * 100,
                }}
              >
                <div class="flex flex-col gap-2">
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        {#if result.methodName.includes("air")}
                          <span
                            class="px-3 py-1 bg-sky-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm shadow-sky-100"
                          >
                            {resolve(result.methodName)}
                          </span>
                        {:else if result.methodName.includes("sea_pier")}
                          <span
                            class="px-3 py-1 bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm shadow-blue-100"
                          >
                            {resolve(result.methodName)}
                          </span>
                        {:else if result.methodName.includes("sea_truck_oversize")}
                          <span
                            class="px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm shadow-purple-100"
                          >
                            {resolve(result.methodName)}
                          </span>
                        {:else if result.methodName.includes("sea_truck")}
                          <span
                            class="px-3 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm shadow-indigo-100"
                          >
                            {resolve(result.methodName)}
                          </span>
                        {:else if result.methodName.includes("express")}
                          <span
                            class="px-3 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm shadow-orange-100"
                          >
                            {resolve(result.methodName)}
                          </span>
                        {:else}
                          <span
                            class="px-3 py-1 bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm shadow-slate-100"
                          >
                            {resolve(result.methodName)}
                          </span>
                        {/if}
                        <h3
                          class="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors"
                        >
                          {resolve(result.channelName)}
                        </h3>
                      </div>
                      <div
                        class="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl text-xs font-black border border-green-100 shadow-sm shadow-green-500/5 transition-transform group-hover:scale-105"
                      >
                        <Clock class="w-3.5 h-3.5" />
                        {translateTransitTime(result.transitTime)}
                      </div>
                    </div>

                    <!-- Details Details Section -->
                    <div
                      class="bg-primary-50/30 rounded-2xl p-4 border border-primary-100/50"
                    >
                      <div class="grid grid-cols-2 gap-4">
                        <div class="flex items-center gap-2">
                          <span
                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                            >{$t.calculator.unitPrice || "Unit Price"}</span
                          >
                          <span class="text-lg font-black text-slate-900 px-0.5"
                            >¥{result.unitPrice.toFixed(1)}<span
                              class="text-xs text-slate-400 font-bold">/KG</span
                            ></span
                          >
                        </div>
                        <div class="flex items-center gap-2">
                          <span
                            class="text-[10px] font-black text-primary-500 uppercase tracking-widest"
                            >{$t.calculator.billable || "Billable"}</span
                          >
                          <span class="text-lg font-black text-primary-600">
                            {#if result.originalBillableWeight && result.originalBillableWeight < result.billableWeight}
                              {#if (result.methodName === "pricing.methods.sea_pier" || result.methodName === "pricing.methods.air_freight") && result.billableWeight >= 21}
                                <span
                                  class="text-[10px] text-red-500 line-through mr-1 font-black"
                                  title={lang === "zh"
                                    ? "单件重最低计费12KG，总计费最低21KG"
                                    : "Min per-piece 12KG, Total min 21KG"}
                                >
                                  {result.originalBillableWeight}<span
                                    class="text-[10px]">KG</span
                                  >
                                </span>
                              {:else if (result.methodName === "pricing.methods.air_truck" || result.methodName === "pricing.methods.sea_truck" || result.methodName === "pricing.methods.sea_truck_oversize") && result.billableWeight >= 40}
                                <span
                                  class="text-[10px] text-red-500 line-through mr-1 font-black"
                                  title={lang === "zh"
                                    ? "最低计费重101KG"
                                    : "Min billable weight 101KG"}
                                >
                                  {result.originalBillableWeight}<span
                                    class="text-[10px]">KG</span
                                  >
                                </span>
                              {:else if result.methodName.includes("express")}
                                <span
                                  class="text-[10px] text-red-500 line-through mr-1 font-black"
                                  title={lang === "zh"
                                    ? "单件最低1KG，多件最低6KG，且按单箱最大重累加"
                                    : "Min 1KG/pc or 6KG/shipment, sum of max weight per box"}
                                >
                                  {result.originalBillableWeight}<span
                                    class="text-[10px]">KG</span
                                  >
                                </span>
                              {/if}
                            {/if}
                            {result.billableWeight}
                            <span class="text-sm">KG</span>
                          </span>
                        </div>
                      </div>

                      <!-- Sub-fees List (Small Tags) -->
                      {#if result.fees.length > 0}
                        <div
                          class="mt-4 pt-3 border-t border-primary-200/30 flex flex-wrap gap-1.5"
                        >
                          {#each result.fees as fee}
                            <span
                              class="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-[10px] font-black border border-amber-100/50"
                            >
                              <Info class="w-3 h-3" />
                              {resolve(
                                fee.key,
                                fee.params && fee.params.cargo
                                  ? {
                                      ...fee.params,
                                      cargo: resolve(fee.params.cargo),
                                    }
                                  : fee.params,
                              )}: ¥{Math.round(fee.amount)}
                            </span>
                          {/each}
                        </div>
                      {/if}

                      <!-- Formula Bar -->
                      <div class="flex justify-end">
                        <div
                          class="mt-2 px-4 py-2 bg-slate-900/5 rounded-xl border border-slate-100 inline-flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-600"
                        >
                          <span
                            class="bg-white px-1.5 py-0.5 rounded text-slate-900 shadow-sm"
                            >¥{result.unitPrice.toFixed(1)} × {result.billableWeight}kg</span
                          >
                          {#each result.fees as fee}
                            <span class="text-slate-300 font-black">+</span>
                            <span
                              class="bg-white px-1.5 py-0.5 rounded text-slate-800 shadow-sm"
                              >¥{Math.round(fee.amount)}</span
                            >
                          {/each}
                          <span class="text-primary-500 font-black">＝</span>
                          <span class="text-primary-600 font-black"
                            >¥{Math.round(
                              result.totalPrice,
                            ).toLocaleString()}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <a
                      href={getWhatsAppUrl(result)}
                      target="_blank"
                      class="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-green-500/10 hover:shadow-green-500/20 active:scale-95 group/wa"
                    >
                      <MessageCircle
                        class="w-4 h-4 group-hover/wa:rotate-12 transition-transform"
                      />
                      {$t.calculator.inquireWhatsApp}
                    </a>

                    <div class="text-right">
                      <div
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5"
                      >
                        {$t.calculator.price}
                      </div>
                      <div class="flex items-baseline justify-end gap-1">
                        <span class="text-sm font-black text-slate-300 mr-0.5"
                          >≈</span
                        >
                        {#if lang === "en"}
                          <span class="text-base font-bold text-slate-400 mr-1">
                            ¥{Math.round(result.totalPrice).toLocaleString()}
                          </span>
                          <span
                            class="text-3xl font-black text-slate-900 tracking-tight"
                          >
                            <span class="text-primary-600">$</span>{Math.round(
                              result.totalPrice / 7,
                            ).toLocaleString()}
                          </span>
                        {:else}
                          <span class="text-base font-bold text-slate-400 mr-1">
                            ${Math.round(
                              result.totalPrice / 7,
                            ).toLocaleString()}
                          </span>
                          <span
                            class="text-3xl font-black text-slate-900 tracking-tight"
                          >
                            <span class="text-primary-600">¥</span>{Math.round(
                              result.totalPrice,
                            ).toLocaleString()}
                          </span>
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {:else if hasCalculated && results.length === 0}
          <!-- No Results Custom Quote Card -->
          <div
            class="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 mt-0"
            in:fade
          >
            <div class="flex items-start gap-4">
              <div
                class="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-800/30 flex-shrink-0"
              >
                <MessageCircle class="w-7 h-7" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-black text-slate-900 mb-2">
                  {$t.calculator.noMatchTitle || "No Matching Shipping Method"}
                </h3>
                <p class="text-slate-600 font-medium leading-relaxed mb-4">
                  {$t.calculator.noMatchDesc ||
                    "Your cargo might require a customized shipping solution due to size/weight restrictions. Please contact us for a quote."}
                </p>
                <div class="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/8617722561770?text={encodeURIComponent(
                      lang === 'zh'
                        ? '你好，我查询运费时未找到匹配渠道，可能需要定制方案。请协助。'
                        : 'Hello, I could not find a matching shipping channel. I might need a custom solution. Please assist.',
                    )}"
                    target="_blank"
                    class="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 transition-all active:scale-95"
                  >
                    <MessageCircle class="w-4 h-4" />
                    WhatsApp {$t.calculator.contactUs}
                  </a>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <!-- Empty State / Placeholder for Desktop -->
          <div
            class="hidden md:flex flex-col items-center justify-center h-full min-h-[400px] text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-300"
          >
            <Calculator class="w-12 h-12 mb-4 opacity-50" />
            <p class="font-bold">{$t.calculator.description}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>

<Footer />

<style>
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-4px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(4px);
    }
  }
  .animate-shake {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
</style>
