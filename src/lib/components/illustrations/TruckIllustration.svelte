<script lang="ts">
  export let className = "";
</script>

<div class="relative w-full h-full bg-slate-50 overflow-hidden {className}">
  <!-- Background Elements -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50"
  ></div>
  <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>

  <!-- Road -->
  <div
    class="absolute bottom-0 left-0 right-0 h-1/4 bg-slate-200 transform skew-x-12 origin-bottom-left"
  ></div>
  <div
    class="absolute bottom-4 left-0 right-0 h-2 bg-white/50 dashed-line"
  ></div>

  <!-- Truck Container -->
  <div
    class="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-32 animate-float-slow"
  >
    <!-- Truck Body -->
    <svg viewBox="0 0 200 120" class="w-full h-full drop-shadow-xl">
      <!-- Shadow -->
      <ellipse cx="100" cy="110" rx="80" ry="10" fill="black" opacity="0.1" />

      <!-- Cargo Box -->
      <rect
        x="20"
        y="20"
        width="120"
        height="70"
        rx="4"
        fill="#f8fafc"
        stroke="#e2e8f0"
        stroke-width="2"
      />
      <rect
        x="20"
        y="20"
        width="120"
        height="70"
        rx="4"
        fill="url(#grad1)"
        opacity="0.5"
      />

      <!-- Cab -->
      <path d="M140 50 L170 50 L180 70 L180 90 L140 90 Z" fill="#0ea5e9" />
      <path
        d="M140 50 L170 50 L180 70 L180 90 L140 90 Z"
        fill="url(#grad2)"
        opacity="0.3"
      />

      <!-- Window -->
      <path d="M145 55 L165 55 L170 70 L145 70 Z" fill="#e0f2fe" />

      <!-- Wheels -->
      <circle cx="50" cy="90" r="12" fill="#334155" />
      <circle cx="50" cy="90" r="6" fill="#94a3b8" />

      <circle cx="110" cy="90" r="12" fill="#334155" />
      <circle cx="110" cy="90" r="6" fill="#94a3b8" />

      <circle cx="160" cy="90" r="12" fill="#334155" />
      <circle cx="160" cy="90" r="6" fill="#94a3b8" />

      <!-- Branding Line -->
      <rect
        x="20"
        y="45"
        width="120"
        height="10"
        fill="#0ea5e9"
        opacity="0.1"
      />

      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="white" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f1f5f9" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  <!-- Speed Lines -->
  <div
    class="absolute top-1/2 right-10 w-20 h-1 bg-gradient-to-l from-primary-200 to-transparent rounded-full animate-pulse"
  ></div>
  <div
    class="absolute top-1/3 right-20 w-12 h-1 bg-gradient-to-l from-primary-200 to-transparent rounded-full animate-pulse"
    style="animation-delay: 0.2s"
  ></div>
</div>

<style>
  .dashed-line {
    background-image: linear-gradient(
      to right,
      transparent 50%,
      rgba(255, 255, 255, 0.5) 50%
    );
    background-size: 20px 100%;
  }

  @keyframes float-slow {
    0%,
    100% {
      transform: translate(-50%, 0);
    }
    50% {
      transform: translate(-50%, -5px);
    }
  }

  .animate-float-slow {
    animation: float-slow 3s ease-in-out infinite;
  }
</style>
