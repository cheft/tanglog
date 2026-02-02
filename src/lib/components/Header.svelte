<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Menu, X, Globe, ArrowRight } from "lucide-svelte";
  import { fade, fly } from "svelte/transition";
  import { t, currentLang } from "$lib/i18n";

  let isScrolled = false;
  let isMobileMenuOpen = false;

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
          class="relative w-10 h-10 overflow-hidden transform transition-transform group-hover:scale-110 duration-500"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 399 269"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full object-contain"
          >
            <title>Logo</title>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-50, -116)">
                <g transform="translate(20, 81)">
                  <path
                    d="M246,35 C306.39,35 366.78,35 429,35 C429,53.81 429,72.62 429,92 C426.69,92 424.38,92 422,92 C421.887852,91.0912109 421.887852,91.0912109 421.773438,90.1640625 C420.414515,81.5042617 417.235926,74.011837 410.0625,68.625 C398.243686,61.8940988 385.352333,61.3958306 372.128906,61.390625 C370.65489,61.3765795 369.180889,61.3607899 367.706909,61.3432617 C362.325602,61.2911913 356.944013,61.2724875 351.5625,61.25 C333.464063,61.12625 333.464063,61.12625 315,61 C315,87.73 315,114.46 315,142 C330.004687,141.87625 330.004687,141.87625 345.3125,141.75 C348.449192,141.734209 351.585884,141.718418 354.817627,141.702148 C357.332863,141.672755 359.848084,141.641925 362.363281,141.609375 C363.645697,141.608247 364.928113,141.607119 366.24939,141.605957 C374.892358,141.46973 383.591508,140.730263 390.4375,134.9375 C392.809526,130.47809 394.42283,125.790235 396,121 C397.65,121 399.3,121 401,121 C401,145.09 401,169.18 401,194 C399.02,194 397.04,194 395,194 C394.887852,192.930723 394.887852,192.930723 394.773438,191.839844 C393.833106,184.990176 392.400657,180.489857 387,176 C381.402445,172.572925 376.303991,171.888464 369.832764,171.794678 C368.611875,171.774733 367.390987,171.754787 366.133102,171.734238 C364.824608,171.717525 363.516114,171.700813 362.167969,171.683594 C360.807474,171.663004 359.446985,171.642007 358.086502,171.620621 C354.517517,171.565607 350.948476,171.516107 347.379395,171.467773 C343.732697,171.417407 340.08608,171.3618 336.439453,171.306641 C329.293038,171.199312 322.146552,171.097812 315,171 C315.107613,182.109443 315.220269,193.218823 315.339339,204.32815 C315.394472,209.486812 315.447876,214.645479 315.497314,219.804199 C315.545101,224.783876 315.597448,229.763487 315.652941,234.743084 C315.6733,236.641629 315.692023,238.540193 315.709074,240.43877 C315.733261,243.100686 315.763295,245.762477 315.794678,248.424316 C315.800433,249.206908 315.806189,249.9895 315.812119,250.795807 C315.867827,254.960903 316.191821,258.912349 317,263 C310.70333,266.089445 304.308029,267.406275 297.4375,268.6875 C296.257605,268.908816 295.07771,269.130132 293.862061,269.358154 C282.841726,271.280108 272.147418,271.507213 261,271 C261.268125,270.484375 261.53625,269.96875 261.8125,269.4375 C262.400312,268.230938 262.400312,268.230938 263,267 C263.511496,265.971355 264.022993,264.94271 264.549989,263.882895 C266.320071,259.704688 266.422676,255.926381 266.38768,251.436188 C266.393066,250.599429 266.398451,249.76267 266.404,248.900554 C266.418252,246.110146 266.411182,243.320214 266.404053,240.529785 C266.409758,238.523673 266.416723,236.517563 266.42485,234.511459 C266.442783,229.071314 266.441613,223.631329 266.435908,218.191163 C266.432816,213.645983 266.438909,209.100833 266.444947,204.555658 C266.458991,193.830699 266.457432,183.105819 266.446045,172.380859 C266.434566,161.325092 266.448636,150.269568 266.475441,139.213832 C266.497611,129.713824 266.504233,120.213892 266.498365,110.71386 C266.494997,105.04344 266.497401,99.3731758 266.514616,93.7027779 C266.530102,88.3691314 266.526111,83.0358438 266.507311,77.7022114 C266.50363,75.7483419 266.50672,73.7944458 266.517197,71.840601 C266.53044,69.1659164 266.51883,66.4924142 266.501205,63.8177795 C266.51081,63.0511256 266.520415,62.2844716 266.530312,61.4945856 C266.443165,55.0329439 264.63044,48.8128022 260.140625,44.0117187 C257.361365,42.6981634 254.790464,42.2421307 251.75,41.8125 C250.672344,41.6539453 249.594687,41.4953906 248.484375,41.3320312 C247.664531,41.2224609 246.844687,41.1128906 246,41 C246,39.02 246,37.04 246,35 Z"
                    fill="#34A67E"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M69,35 C98.37,35 127.74,35 158,35 C158,36.98 158,38.96 158,41 C157.263945,41.0373828 156.527891,41.0747656 155.769531,41.1132812 C148.273931,41.3938623 148.273931,41.3938623 142,45 C136.575515,52.8207033 137.424726,61.4853509 137.454102,70.6152344 C137.44536,72.4095041 137.434872,74.2037661 137.422775,75.9980164 C137.394968,80.852822 137.391509,85.7073726 137.392495,90.5622463 C137.389362,95.6418564 137.363734,100.721352 137.340515,105.800903 C137.299986,115.412529 137.279622,125.024087 137.266541,134.635785 C137.250661,145.581409 137.212241,156.526918 137.171948,167.472476 C137.089592,189.981612 137.035473,212.490745 137,235 C136.113689,234.862876 135.227378,234.725752 134.314209,234.584473 C124.543579,233.16553 114.925925,232.591655 105.0625,232.375 C103.589174,232.336669 102.115866,232.297609 100.642578,232.257812 C97.0952273,232.163532 93.5477296,232.078931 90,232 C89.9976117,231.106393 89.9952233,230.212786 89.9927626,229.2921 C89.9335862,207.532926 89.8580191,185.773863 89.7642851,164.01481 C89.7193496,153.492224 89.6799297,142.969672 89.6535644,132.447021 C89.6305663,123.273805 89.5971478,114.100695 89.5512984,104.927564 C89.5273909,100.071979 89.5086459,95.2164994 89.5023861,90.360857 C89.4963241,85.7865219 89.476284,81.2124568 89.4457245,76.6382217 C89.4369621,74.9633491 89.4332179,73.288441 89.4349918,71.6135464 C89.6849406,57.8688919 89.6849406,57.8688919 84.1875,45.5625 C79.5812235,42.2723025 74.5200644,41.6624077 69,41 C69,39.02 69,37.04 69,35 Z"
                    fill="#294686"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M104.25,239.5625 C105.474388,239.567561 105.474388,239.567561 106.723511,239.572723 C118.015624,239.640284 128.753267,240.089531 139.648438,243.311035 C142.377349,244.110556 145.123159,244.826417 147.875,245.542969 C166.826354,250.561446 185.123688,257.069739 203.375,264.1875 C213.100233,267.969891 222.808664,271.666696 233,274 C234.099329,274.255315 235.198657,274.51063 236.331299,274.773682 C247.390145,277.108922 258.155251,277.596839 269.4375,277.5625 C270.816726,277.562772 270.816726,277.562772 272.223816,277.563049 C287.567935,277.520098 301.382802,275.960588 316,271 C317.17635,270.623674 317.17635,270.623674 318.376465,270.239746 C327.627892,267.259863 335.784631,263.159479 344,258 C344.66,257.67 345.32,257.34 346,257 C345.34,258.32 344.68,259.64 344,261 L342,263 C318.913394,287.551315 284.61054,301.937084 251.328125,303.25 C214.982547,304.208189 182.798753,291.518254 149.9375,277.25 C133.616528,270.183653 117.478316,264.491076 100,261 C99.0547144,260.810911 98.1094287,260.621821 97.1354981,260.427002 C89.9316681,259.099223 83.0029679,258.718368 75.6875,258.8125 C74.5944556,258.822571 73.5014111,258.832642 72.3752441,258.843018 C69.2497185,258.880741 66.1251217,258.937918 63,259 C62.225918,259.008701 61.4518359,259.017402 60.6542969,259.026367 C52.2597562,259.142624 44.9700276,260.589318 37.0993652,263.360107 C35.4148944,263.952259 33.7086455,264.481718 32,265 C31.34,264.67 30.68,264.34 30,264 C51.5663891,246.819995 76.9435552,239.342714 104.25,239.5625 Z"
                    fill="#2A498A"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M253,210 C254.98,210 256.96,210 259,210 C258.374006,217.038798 257.054226,223.703408 255.375,230.5625 C254.986106,232.170162 254.986106,232.170162 254.589355,233.810303 C251.757777,245.312015 248.434408,256.665841 245,268 C228.238565,266.107286 212.719644,259.828863 197,254 C197,253.67 197,253.34 197,253 C197.553491,252.905012 198.106982,252.810024 198.677246,252.712158 C213.547308,250.358521 213.547308,250.358521 227,244 C228.235566,243.170488 228.235566,243.170488 229.496094,242.324219 C240.821507,233.99823 247.247405,222.504033 253,210 Z"
                    fill="#294686"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M87,267 C106.448182,266.729349 126.155356,275.002518 144,282 C144,282.33 144,282.66 144,283 C118.92,283 93.84,283 68,283 C68,281.02 68,279.04 68,277 C68.8920313,276.829844 69.7840625,276.659687 70.703125,276.484375 C71.8735937,276.242031 73.0440625,275.999687 74.25,275.75 C75.4101562,275.517969 76.5703125,275.285937 77.765625,275.046875 C82.5038057,273.513261 84.2965585,271.055162 87,267 Z"
                    fill="#294888"
                    fill-rule="nonzero"
                  ></path>
                  <path
                    d="M336.0625,276.9375 C337.516563,276.968437 337.516563,276.968437 339,277 C339,278.98 339,280.96 339,283 C335.04,283 331.08,283 327,283 C333,277 333,277 336.0625,276.9375 Z"
                    fill="#34A67E"
                    fill-rule="nonzero"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <span
          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#294686] to-[#34A67E] tracking-tight"
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

        <a
          href="{langPrefix}/shipping-calculator"
          class="flex items-center gap-2 pl-5 pr-4 py-2.5 rounded-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white text-sm font-bold transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/40 hover:-translate-y-0.5"
        >
          <span>{$t.nav.consult}</span>
          <ArrowRight class="w-4 h-4" />
        </a>
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

        <a
          href="{langPrefix}/shipping-calculator"
          class="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-green-600 leading-tight tracking-tight mt-8 flex items-center gap-4 group"
          in:fly={{ y: 20, duration: 400, delay: 100 + navLinks.length * 50 }}
          on:click={() => (isMobileMenuOpen = false)}
        >
          {$t.nav.consult}
          <ArrowRight
            class="w-10 h-10 text-primary-600 transform group-hover:translate-x-2 transition-transform"
          />
        </a>
      </nav>

      <!-- Mobile Menu Footer -->
      <div class="relative p-8 border-t border-slate-200/50">
        <p class="text-sm text-slate-400">© 2026 {$t.companyName}</p>
      </div>
    </div>
  {/if}
</header>

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
