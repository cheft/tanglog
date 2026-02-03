<script>
  import Hero from "$lib/components/home/Hero.svelte";
  import About from "$lib/components/home/About.svelte";
  import Services from "$lib/components/home/Services.svelte";
  import Process from "$lib/components/home/Process.svelte";
  import Testimonials from "$lib/components/home/Testimonials.svelte";
  import Team from "$lib/components/home/Team.svelte";
  import Blog from "$lib/components/home/Blog.svelte";
  import FAQ from "$lib/components/home/FAQ.svelte";
  import Footer from "$lib/components/home/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<div class="bg-black min-h-screen text-white">
  <Header />
  <Hero />
  <Services />
  <Process />
  <Testimonials />
  <Team />
  <Blog />
  <FAQ />
  <Footer />
</div>
