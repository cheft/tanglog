<script lang="ts">
  export let className = "";
</script>

<div class="relative w-full h-full bg-slate-50 overflow-hidden {className}">
  <!-- Sky/Water Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-sky-50 to-sky-100"></div>
  <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-sky-200/50"></div>

  <!-- Waves -->
  <div
    class="absolute bottom-0 left-0 right-0 h-12 bg-[url('/grid.svg')] opacity-10 animate-wave"
  ></div>

  <!-- Ship -->
  <div
    class="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 h-40 animate-rock"
  >
    <svg viewBox="0 0 220 160" class="w-full h-full drop-shadow-lg">
      <!-- Hull -->
      <path d="M20 100 L200 100 L190 140 L40 140 Z" fill="#0f172a" />
      <path d="M20 100 L200 100 L190 120 L30 120 Z" fill="#ef4444" />

      <!-- Cabin -->
      <rect
        x="140"
        y="60"
        width="40"
        height="40"
        fill="#f8fafc"
        stroke="#cbd5e1"
        stroke-width="1"
      />
      <rect x="145" y="65" width="10" height="10" fill="#38bdf8" />
      <rect x="165" y="65" width="10" height="10" fill="#38bdf8" />

      <!-- Containers -->
      <rect
        x="40"
        y="80"
        width="30"
        height="20"
        fill="#f59e0b"
        stroke="#fff"
        stroke-width="0.5"
      />
      <rect
        x="70"
        y="80"
        width="30"
        height="20"
        fill="#0ea5e9"
        stroke="#fff"
        stroke-width="0.5"
      />
      <rect
        x="100"
        y="80"
        width="30"
        height="20"
        fill="#ef4444"
        stroke="#fff"
        stroke-width="0.5"
      />

      <rect
        x="55"
        y="60"
        width="30"
        height="20"
        fill="#10b981"
        stroke="#fff"
        stroke-width="0.5"
      />
      <rect
        x="85"
        y="60"
        width="30"
        height="20"
        fill="#6366f1"
        stroke="#fff"
        stroke-width="0.5"
      />

      <!-- Radar -->
      <line
        x1="160"
        y1="60"
        x2="160"
        y2="40"
        stroke="#64748b"
        stroke-width="2"
      />
      <circle cx="160" cy="40" r="4" fill="#64748b" />
    </svg>
  </div>
</div>

<style>
  @keyframes rock {
    0%,
    100% {
      transform: translate(-50%, 0) rotate(0deg);
    }
    50% {
      transform: translate(-50%, 2px) rotate(1deg);
    }
  }
  .animate-rock {
    animation: rock 5s ease-in-out infinite;
  }

  @keyframes wave {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 0;
    }
  }
  .animate-wave {
    animation: wave 10s linear infinite;
  }
</style>
