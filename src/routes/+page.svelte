<script>
  import Header from "$lib/components/Header.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import ServiceCard from "$lib/components/ServiceCard.svelte";
  import StatsSection from "$lib/components/StatsSection.svelte";
  import WarehouseMap from "$lib/components/WarehouseMap.svelte";
  import ContactForm from "$lib/components/ContactForm.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import LogisticsAnimation from "$lib/components/LogisticsAnimation.svelte";
  import TruckIllustration from "$lib/components/illustrations/TruckIllustration.svelte";
  import WarehouseIllustration from "$lib/components/illustrations/WarehouseIllustration.svelte";
  import PlaneIllustration from "$lib/components/illustrations/PlaneIllustration.svelte";
  import ShipIllustration from "$lib/components/illustrations/ShipIllustration.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import StructuredData from "$lib/components/StructuredData.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import { t } from "$lib/i18n";
  import {
    Plane,
    Ship,
    Truck,
    Package,
    ShieldCheck,
    Clock,
    DollarSign,
    Headphones,
    Users,
  } from "lucide-svelte";

  $: services = [
    {
      title: $t.services.items[0].title,
      description: $t.services.items[0].description,
      icon: Plane,
      features: $t.services.items[0].features,
      delay: 0.1,
      illustration: PlaneIllustration,
    },
    {
      title: $t.services.items[1].title,
      description: $t.services.items[1].description,
      icon: Ship,
      features: $t.services.items[1].features,
      delay: 0.2,
      illustration: ShipIllustration,
    },
    {
      title: $t.services.items[2].title,
      description: $t.services.items[2].description,
      icon: Truck,
      features: $t.services.items[2].features,
      delay: 0.3,
      illustration: TruckIllustration,
    },
    {
      title: $t.services.items[3].title,
      description: $t.services.items[3].description,
      icon: Package,
      features: $t.services.items[3].features,
      delay: 0.4,
      illustration: WarehouseIllustration,
    },
  ];

  $: advantages = [
    {
      title: $t.advantages.items[0].title,
      desc: $t.advantages.items[0].desc,
      icon: ShieldCheck,
    },
    {
      title: $t.advantages.items[1].title,
      desc: $t.advantages.items[1].desc,
      icon: Clock,
    },
    {
      title: $t.advantages.items[2].title,
      desc: $t.advantages.items[2].desc,
      icon: DollarSign,
    },
    {
      title: $t.advantages.items[3].title,
      desc: $t.advantages.items[3].desc,
      icon: Headphones,
    },
  ];
</script>

<SEOHead />
<StructuredData />

<Header />

<main class="bg-white overflow-hidden">
  <!-- Hero Section with Animation -->
  <div class="relative">
    <LogisticsAnimation />
    <Hero />
  </div>

  <!-- <StatsSection /> -->

  <!-- Services Section -->
  <section id="services" class="py-24 bg-slate-50 relative">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <span
          class="text-primary-600 font-semibold tracking-wider uppercase text-sm"
          >{$t.services.label}</span
        >
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
          {$t.services.title}
        </h2>
        <p class="text-slate-600 max-w-2xl mx-auto">
          {$t.services.description}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each services as service}
          <ServiceCard {...service} />
        {/each}
      </div>
    </div>
  </section>

  <!-- Advantages Section (Redesigned) -->
  <section id="advantages" class="py-24 bg-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none"
    ></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <span
          class="text-primary-600 font-semibold tracking-wider uppercase text-sm"
          >{$t.advantages.label}</span
        >
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
          {$t.advantages.title}
        </h2>
        <p class="text-slate-600 max-w-2xl mx-auto text-lg">
          {$t.advantages.description}
        </p>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Main Feature Card -->
        <div
          class="md:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          <div class="relative z-10">
            <div
              class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm mb-6"
            >
              <ShieldCheck class="w-6 h-6" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-2">
              {$t.advantages.items[0].title}
            </h3>
            <p class="text-slate-600 max-w-md">
              {$t.advantages.items[0].extendedDesc}
            </p>
          </div>
          <!-- Decorative Background -->
          <div
            class="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-primary-100/50 to-transparent rounded-tl-full opacity-50 group-hover:scale-110 transition-transform duration-500"
          ></div>
        </div>

        <!-- Stat Card (Redesigned) -->
        <div
          class="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Decorative Circles -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-tr-full"
          ></div>

          <div class="relative z-10 flex flex-col h-full justify-between">
            <div class="flex justify-between items-start">
              <div
                class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/30"
              >
                <Users class="w-7 h-7" />
              </div>
              <div
                class="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider border border-white/30"
              >
                CERTIFIED
              </div>
            </div>

            <div class="mt-8">
              <div
                class="text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg"
              >
                1000<span class="text-primary-200">+</span>
              </div>
              <div class="h-1 w-12 bg-primary-300 rounded-full mb-4"></div>
              <p class="text-primary-100 font-medium text-lg">
                {$t.advantages.statCard.certified}
              </p>
              <p class="text-primary-200/80 text-sm mt-1">
                {$t.advantages.statCard.servingClients}
              </p>
            </div>
          </div>
        </div>

        <!-- Feature Card 2 -->
        <div
          class="bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300 group"
        >
          <div
            class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary-600 shadow-sm mb-6 group-hover:bg-primary-50 transition-colors"
          >
            <Clock class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">
            {$t.advantages.items[1].title}
          </h3>
          <p class="text-slate-600 text-sm">
            {$t.advantages.items[1].extendedDesc}
          </p>
        </div>

        <!-- Feature Card 3 -->
        <div
          class="bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300 group"
        >
          <div
            class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary-600 shadow-sm mb-6 group-hover:bg-primary-50 transition-colors"
          >
            <DollarSign class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">
            {$t.advantages.items[2].title}
          </h3>
          <p class="text-slate-600 text-sm">
            {$t.advantages.items[2].extendedDesc}
          </p>
        </div>

        <!-- Feature Card 4 -->
        <div
          class="bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300 group"
        >
          <div
            class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary-600 shadow-sm mb-6 group-hover:bg-primary-50 transition-colors"
          >
            <Headphones class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">
            {$t.advantages.items[3].title}
          </h3>
          <p class="text-slate-600 text-sm">
            {$t.advantages.items[3].extendedDesc}
          </p>
        </div>
      </div>
    </div>
  </section>

  <WarehouseMap />

  <FAQ />
</main>

<Footer />
