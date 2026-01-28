<script lang="ts">
  import { onMount } from "svelte";
  import { ArrowRight, Globe, Package, Truck } from "lucide-svelte";
  import { Motion, useAnimation } from "svelte-motion";
  import { t, currentLang } from "$lib/i18n";

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  $: langPrefix = $currentLang === "zh" ? "/zh" : "";
</script>

<section
  id="home"
  class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20"
>
  <!-- Background Image with Parallax-like effect -->
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0 bg-white"></div>
    <img
      src="/bg.jpeg"
      alt="Global Logistics Network"
      class="w-full h-full object-cover opacity-30"
    />
    <div
      class="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white"
    ></div>

    <div
      class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-center animate-pulse-slow"
    ></div>

    <div
      class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[120px] mix-blend-multiply animate-float"
    ></div>
    <div
      class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-[120px] mix-blend-multiply animate-float"
      style="animation-delay: 2s"
    ></div>
  </div>

  <div class="container mx-auto px-6 relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Text Content -->
      <Motion
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        let:motion
      >
        <div use:motion class="flex flex-col items-center">
          <Motion variants={itemVariants} let:motion>
            <div
              use:motion
              class="inline-flex items-center px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span
                class="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"
              ></span>
              {$t.hero.badge}
            </div>
          </Motion>

          <Motion variants={itemVariants} let:motion>
            <h1
              use:motion
              class="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-8 tracking-tight"
            >
              {$t.hero.title_prefix} <br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600"
                >{$t.hero.title_suffix}</span
              >
            </h1>
          </Motion>

          <Motion variants={itemVariants} let:motion>
            <p
              use:motion
              class="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed"
            >
              {$t.hero.description}
            </p>
          </Motion>

          <Motion variants={itemVariants} let:motion>
            <div use:motion class="flex flex-wrap justify-center gap-4">
              <a
                href="{langPrefix}/shipping-calculator"
                class="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-semibold transition-all shadow-lg shadow-primary-900/20 flex items-center group"
              >
                {$t.hero.cta_primary}
                <ArrowRight
                  class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="{langPrefix}/tracking"
                class="px-8 py-4 rounded-full border border-slate-200 hover:border-primary-200 hover:bg-slate-50 text-slate-700 font-semibold transition-all backdrop-blur-sm"
              >
                {$t.hero.cta_secondary}
              </a>
            </div>
          </Motion>
        </div>
      </Motion>
    </div>
  </div>
</section>
