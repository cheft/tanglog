<script>
  import Header from "$lib/components/Header.svelte";
  import HeroSplit from "$lib/components/HeroSplit.svelte";
  import ServicesCarousel from "$lib/components/ServicesCarousel.svelte";
  import Testimonials from "$lib/components/Testimonials.svelte";
  import TeamSection from "$lib/components/TeamSection.svelte";
  import ProcessSteps from "$lib/components/ProcessSteps.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SEOHead from "$lib/components/SEOHead.svelte";
  import StructuredData from "$lib/components/StructuredData.svelte";
  import FAQ from "$lib/components/FAQ.svelte";
  import { t } from "$lib/i18n";
</script>

<SEOHead />
<StructuredData />

<Header />

<main class="bg-white overflow-hidden">
  <!-- Hero Split Section -->
  <HeroSplit />

  <!-- Stats Display at Bottom of Hero -->
  <div class="bg-slate-900 py-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl md:text-5xl font-black text-white mb-2">5K+</div>
          <div class="text-slate-400 text-sm md:text-base">
            {$t.stats?.newPartners ||
              ($t.currentLang === "zh"
                ? "新合作伙伴"
                : "New partners every year")}
          </div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-black text-white mb-2">99+</div>
          <div class="text-slate-400 text-sm md:text-base">
            {$t.stats?.ordersPerHour ||
              ($t.currentLang === "zh" ? "每小时订单" : "Order per hour")}
          </div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-black text-white mb-2">4.9</div>
          <div class="text-slate-400 text-sm md:text-base">
            {$t.stats?.userRatings ||
              ($t.currentLang === "zh" ? "用户评分" : "Happy users ratings")}
          </div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-black text-white mb-2">10+</div>
          <div class="text-slate-400 text-sm md:text-base">
            {$t.stats?.worldwideBases ||
              ($t.currentLang === "zh" ? "全球基地" : "Worldwide base")}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Services Carousel -->
  <ServicesCarousel />

  <!-- Testimonials Section -->
  <Testimonials />

  <!-- Team Section -->
  <TeamSection />

  <!-- Process Steps Section -->
  <ProcessSteps />

  <!-- FAQ Section -->
  <FAQ />
</main>

<Footer />
