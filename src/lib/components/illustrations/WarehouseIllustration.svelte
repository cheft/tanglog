<script lang="ts">
  export let className = "";
</script>

<div class="relative w-full h-full bg-slate-50 overflow-hidden {className}">
  <!-- Background Elements -->
  <div
    class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50"
  ></div>
  <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>

  <!-- Warehouse Structure -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-48">
    <svg viewBox="0 0 240 160" class="w-full h-full drop-shadow-lg">
      <!-- Floor -->
      <path d="M20 120 L220 120 L240 140 L0 140 Z" fill="#e2e8f0" />

      <!-- Back Wall -->
      <rect
        x="40"
        y="40"
        width="160"
        height="80"
        fill="#f1f5f9"
        stroke="#cbd5e1"
        stroke-width="1"
      />

      <!-- Shelves Left -->
      <g transform="translate(50, 50)">
        <rect x="0" y="0" width="30" height="70" fill="#cbd5e1" />
        <rect x="2" y="10" width="26" height="4" fill="#94a3b8" />
        <rect x="2" y="30" width="26" height="4" fill="#94a3b8" />
        <rect x="2" y="50" width="26" height="4" fill="#94a3b8" />
        <!-- Boxes -->
        <rect x="4" y="2" width="10" height="8" fill="#fbbf24" />
        <rect x="16" y="2" width="10" height="8" fill="#f59e0b" />
        <rect x="4" y="22" width="10" height="8" fill="#f59e0b" />
      </g>

      <!-- Shelves Right -->
      <g transform="translate(160, 50)">
        <rect x="0" y="0" width="30" height="70" fill="#cbd5e1" />
        <rect x="2" y="10" width="26" height="4" fill="#94a3b8" />
        <rect x="2" y="30" width="26" height="4" fill="#94a3b8" />
        <rect x="2" y="50" width="26" height="4" fill="#94a3b8" />
        <!-- Boxes -->
        <rect x="4" y="42" width="10" height="8" fill="#fbbf24" />
        <rect x="16" y="42" width="10" height="8" fill="#f59e0b" />
      </g>

      <!-- Forklift (Simplified) -->
      <g transform="translate(100, 90)">
        <rect x="10" y="10" width="20" height="20" fill="#f59e0b" />
        <!-- Body -->
        <rect x="10" y="0" width="2" height="30" fill="#334155" />
        <!-- Mast -->
        <rect x="12" y="20" width="10" height="2" fill="#334155" />
        <!-- Forks -->
        <circle cx="15" cy="30" r="5" fill="#334155" />
        <!-- Wheel -->
        <circle cx="25" cy="30" r="5" fill="#334155" />
        <!-- Wheel -->
      </g>

      <!-- Hanging Lights -->
      <line x1="80" y1="0" x2="80" y2="30" stroke="#94a3b8" stroke-width="1" />
      <path d="M70 30 L90 30 L80 20 Z" fill="#fef08a" />

      <line
        x1="160"
        y1="0"
        x2="160"
        y2="30"
        stroke="#94a3b8"
        stroke-width="1"
      />
      <path d="M150 30 L170 30 L160 20 Z" fill="#fef08a" />
    </svg>
  </div>

  <!-- Floating Box Animation -->
  <div
    class="absolute top-1/3 left-1/2 w-6 h-6 bg-primary-500 rounded shadow-md animate-box-float"
  ></div>
</div>

<style>
  @keyframes box-float {
    0% {
      transform: translate(-50%, 0) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -10px) rotate(5deg);
    }
    100% {
      transform: translate(-50%, 0) rotate(0deg);
    }
  }

  .animate-box-float {
    animation: box-float 4s ease-in-out infinite;
  }
</style>
