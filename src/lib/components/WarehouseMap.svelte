<script lang="ts">
  import { Motion } from "svelte-motion";
  import { MapPin } from "lucide-svelte";
  import { t } from "$lib/i18n";

  $: warehouses = [
    {
      name: $t.warehouse.locations.shenzhen,
      location: $t.warehouse.locationLabels.shenzhen,
      coords: { top: "65%", left: "20%" },
      details: $t.warehouse.details.shenzhen,
    },
    {
      name: $t.warehouse.locations.anaheim,
      location: $t.warehouse.locationLabels.anaheim,
      coords: { top: "53%", left: "77%" },
      details: $t.warehouse.details.anaheim,
    },
  ];
</script>

<section id="warehouse" class="py-24 bg-slate-900 relative overflow-hidden">
  <!-- Map Background (Abstract) -->
  <div class="absolute inset-0 opacity-20">
    <!-- <img src="/map.jpg" alt="World Map" class="w-full h-full object-cover" /> -->
    <!-- Fallback if image missing: CSS Grid Pattern -->
    <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
  </div>

  <div class="container mx-auto px-6 relative z-10">
    <div class="flex flex-col md:flex-row items-end justify-between mb-12">
      <div class="max-w-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {$t.warehouse.title}
        </h2>
        <p class="text-slate-400 text-lg">
          {$t.warehouse.description}
        </p>
      </div>

      <!-- Live Stats Panel -->
      <div class="hidden md:flex gap-6 mt-6 md:mt-0">
        <div
          class="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 min-w-[140px]"
        >
          <div
            class="text-primary-400 text-xs font-bold uppercase tracking-wider mb-1"
          >
            {$t.warehouse.stats.activeShipments}
          </div>
          <div class="text-2xl font-bold text-white">1,984</div>
        </div>
        <div
          class="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 min-w-[140px]"
        >
          <div
            class="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1"
          >
            {$t.warehouse.stats.onTimeRate}
          </div>
          <div class="text-2xl font-bold text-white">99.8%</div>
        </div>
      </div>
    </div>

    <div
      class="relative h-[450px] md:h-[650px] bg-slate-800/30 rounded-3xl border border-slate-700/50 backdrop-blur-sm overflow-hidden shadow-2xl"
    >
      <img
        src="/map.jpeg"
        alt="World Map"
        class="w-full h-full object-fill opacity-70"
      />

      <!-- Stylized Map Background -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden"
      >
        <!-- Digital Grid Background -->
        <div
          class="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center"
        ></div>

        <!-- Scanning Line Effect -->
        <!-- <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/10 to-transparent h-[200%] w-full animate-scan opacity-30"
        ></div> -->

        <!-- World Map Text/Placeholder -->
        <!-- <span
          class="text-9xl font-bold text-slate-800 select-none tracking-widest opacity-50 blur-sm"
          >GLOBAL NETWORK</span
        > -->
      </div>

      {#each warehouses as warehouse, i}
        <Motion
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, type: "spring" }}
          let:motion
        >
          <div
            use:motion
            class="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
            style="top: {warehouse.coords.top}; left: {warehouse.coords.left};"
          >
            <div class="relative">
              <!-- Pulse Effect -->
              <div
                class="w-6 h-6 bg-primary-500/30 rounded-full animate-ping absolute inset-0"
              ></div>
              <div
                class="w-6 h-6 bg-primary-500/50 rounded-full animate-pulse absolute inset-0"
              ></div>

              <!-- Pin -->
              <div
                class="w-6 h-6 bg-primary-500 rounded-full relative z-10 border-4 border-slate-800 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
              >
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>

              <!-- Tooltip/Card -->
              <div
                class="absolute top-10 left-1/2 -translate-x-1/2 w-72 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto shadow-2xl z-30"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4
                    class="text-white font-bold flex items-center text-[16px]"
                  >
                    <MapPin class="w-5 h-5 mr-2 text-primary-400" />
                    {warehouse.name}
                  </h4>
                  <!-- <span
                    class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold"
                    >OPERATIONAL</span
                  > -->
                </div>

                <p
                  class="text-xs text-slate-400 mb-4 uppercase tracking-wider font-semibold border-b border-slate-800 pb-2"
                >
                  {warehouse.location}
                </p>

                <ul class="space-y-2">
                  {#each warehouse.details as detail}
                    <li class="text-sm text-slate-300 flex items-center">
                      <div
                        class="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      ></div>
                      {detail}
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </Motion>

        <!-- Connecting Line (Simplified) -->
        {#if i === 0}
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none"
            style="z-index: 10;"
          >
            <path
              d="M 20% 35% Q 50% 20% 80% 45%"
              fill="none"
              stroke="url(#lineGradient)"
              stroke-width="3"
              stroke-dasharray="8,8"
              class="animate-dash opacity-60"
            />
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.1" />
                <stop offset="50%" stop-color="#0ea5e9" stop-opacity="1" />
                <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  .animate-dash {
    animation: dash 30s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -1000;
    }
  }
</style>
