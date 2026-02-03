<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Menu, X, Globe, ArrowRight } from "lucide-svelte";
  import { fade, fly } from "svelte/transition";
  import { t, currentLang } from "$lib/i18n";

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let showWeChatModal = false;

  const toggleWeChat = () => {
    showWeChatModal = !showWeChatModal;
  };

  const toggleLang = () => {
    const newLang = $currentLang === "zh" ? "en" : "zh";
    let path = $page.url.pathname;

    if (newLang === "zh") {
      if (!path.startsWith("/zh")) {
        path = `/zh${path === "/" ? "" : path}`;
      }
    } else {
      if (path.startsWith("/zh")) {
        path = path.replace(/^\/zh/, "") || "/";
      }
    }

    goto(path);
  };

  $: langPrefix = $currentLang === "zh" ? "/zh" : "";

  $: navLinks = [
    { name: $t.nav.home, href: `${langPrefix}/#home` },
    { name: $t.tracking.title, href: `${langPrefix}/tracking` },
    { name: $t.nav.zip, href: `${langPrefix}/zip` },
    { name: $t.nav.blog, href: `${langPrefix}/blog` },
  ];

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Close mobile menu when route changes
  $: if ($page.url.pathname) {
    isMobileMenuOpen = false;
  }
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {isScrolled
    ? 'pt-4'
    : 'pt-6'}"
>
  <div class="container mx-auto px-4 md:px-6 flex justify-center">
    <div
      class="w-full flex items-center justify-between transition-all duration-500 relative
      {isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full px-12 py-3 '
        : ' rounded-full bg-transparent px-6 py-3'}"
    >
      <!-- Logo -->
      <a
        href={langPrefix || "/"}
        class="flex items-center gap-3 group relative z-10"
      >
        <div
          class="relative w-[158px] h-6 overflow-hidden transform transition-transform group-hover:scale-110 duration-500"
        >
          <img src="/logo-mini.png" alt="logo" />
        </div>
        <span
          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ED6B19] to-[#005075] tracking-tight"
        >
          {$t.companyName}
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-2">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-4 py-2 text-base font-bold rounded-full transition-all duration-300 transform hover:-translate-y-0.5
            {isScrolled
              ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              : 'text-white/90 hover:bg-white/20 hover:text-white'}"
          >
            {link.name}
          </a>
        {/each}
      </nav>

      <!-- Right Actions -->
      <div class="hidden md:flex items-center space-x-3">
        <!-- Language Switcher -->
        <button
          on:click={toggleLang}
          class="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300
          {isScrolled
            ? 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'}"
          aria-label="Toggle Language"
        >
          <span class="text-xs font-bold font-mono tracking-wider">
            {$currentLang === "zh" ? "EN" : "中"}
          </span>
        </button>

        <button
          on:click={toggleWeChat}
          class="flex items-center gap-2 pl-5 pr-4 py-2.5 rounded-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white text-sm font-bold transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/40 hover:-translate-y-0.5"
        >
          <span>{$t.nav.consult}</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-3 md:hidden">
        <button
          on:click={toggleLang}
          class="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 bg-white/50 backdrop-blur"
        >
          <span class="text-xs font-bold font-mono">
            {$currentLang === "zh" ? "EN" : "中"}
          </span>
        </button>

        <button
          class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-lg active:scale-90 transition-transform"
          on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
        >
          <Menu class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>

  <!-- Full Screen Mobile Menu -->
  {#if isMobileMenuOpen}
    <div
      class="fixed inset-0 z-[60] flex flex-col bg-gradient-to-br from-white via-slate-50 to-slate-100"
      transition:fade={{ duration: 300 }}
    >
      <!-- Background Decor -->
      <div
        class="absolute inset-0 overflow-hidden pointer-events-none opacity-30"
      >
        <div
          class="absolute -top-20 -right-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        ></div>
        <div
          class="absolute top-40 -left-20 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
        ></div>
      </div>

      <!-- Mobile Menu Header -->
      <div class="relative flex items-center justify-between px-6 py-6">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold tracking-widest text-slate-400"
            >MENU</span
          >
        </div>
        <button
          class="w-11 h-11 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg"
          on:click={() => (isMobileMenuOpen = false)}
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Mobile Menu Links -->
      <nav
        class="relative flex-1 flex flex-col justify-center px-8 space-y-6 overflow-y-auto pb-20"
      >
        {#each navLinks as link, i}
          <a
            href={link.href}
            class="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight hover:text-primary-600 transition-colors relative group"
            in:fly={{ y: 20, duration: 400, delay: 100 + i * 50 }}
            on:click={() => (isMobileMenuOpen = false)}
          >
            <span class="relative">
              {link.name}
              <span
                class="absolute -bottom-2 left-0 w-0 h-1 bg-primary-600 transition-all duration-300 group-hover:w-full"
              ></span>
            </span>
          </a>
        {/each}

        <button
          on:click={() => {
            isMobileMenuOpen = false;
            toggleWeChat();
          }}
          class="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-green-600 leading-tight tracking-tight mt-8 flex items-center gap-4 group text-left"
          in:fly={{ y: 20, duration: 400, delay: 100 + navLinks.length * 50 }}
        >
          {$t.nav.consult}
          <ArrowRight
            class="w-10 h-10 text-primary-600 transform group-hover:translate-x-2 transition-transform"
          />
        </button>
      </nav>

      <!-- Mobile Menu Footer -->
      <div class="relative p-8 border-t border-slate-200/50">
        <p class="text-sm text-slate-400">© 2026 {$t.companyName}</p>
      </div>
    </div>
  {/if}
</header>

<!-- WeChat QR Modal -->
{#if showWeChatModal}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-6"
    transition:fade={{ duration: 200 }}
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/80 backdrop-blur-sm"
      on:click={toggleWeChat}
      on:keydown={(e) => e.key === "Escape" && toggleWeChat()}
      role="presentation"
    ></div>

    <!-- Modal Content -->
    <div
      class="relative bg-[#1e293b] w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-2xl"
      transition:fly={{ y: 20, duration: 400 }}
    >
      <button
        on:click={toggleWeChat}
        class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="text-center">
        <h3 class="text-2xl font-bold mb-2 text-white">{$t.hero.cta_wechat}</h3>
        <p class="text-white/60 text-sm mb-6">
          {$currentLang === "zh"
            ? "扫码添加专属客服，获取 1 对 1 咨询服务"
            : "Scan to add support for 1-on-1 consultation"}
        </p>

        <div class="bg-white rounded-2xl inline-block mb-6 overflow-hidden">
          <img
            src="/wechat.png"
            alt="WeChat QR Code"
            class="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }
</style>
