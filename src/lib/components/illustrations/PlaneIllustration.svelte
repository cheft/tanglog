<script lang="ts">
  export let className = "";
</script>

<div class="relative w-full h-full bg-slate-50 overflow-hidden {className}">
  <!-- Sky Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-sky-50 to-slate-50"></div>

  <!-- Runway/Ground Horizon (Matching the road/water level of other cards) -->
  <div
    class="absolute bottom-0 left-0 right-0 h-1/4 bg-slate-100 transform skew-x-12 origin-bottom-left"
  ></div>
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-slate-200"></div>

  <!-- Runway Markings -->
  <div
    class="absolute bottom-4 left-0 right-0 h-2 bg-white/50 dashed-line transform skew-x-12 origin-bottom-left"
  ></div>

  <!-- Clouds (Background) -->
  <div
    class="absolute top-10 right-10 w-24 h-8 bg-white rounded-full opacity-60 animate-cloud-slow"
  ></div>

  <!-- Plane Container (Anchored lower to match Truck/Ship baseline) -->
  <div
    class="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-32 animate-takeoff"
  >
    <svg viewBox="0 0 240 120" class="w-full h-full drop-shadow-xl">
      <!-- Shadow on Runway -->
      <ellipse
        cx="120"
        cy="110"
        rx="60"
        ry="6"
        fill="#000"
        opacity="0.1"
        class="animate-shadow"
      />

      <!-- Wing (Back) -->
      <path d="M100 65 L140 65 L160 40 L120 40 Z" fill="#94a3b8" />

      <!-- Fuselage -->
      <path
        d="M20 70 Q20 50 60 50 L180 50 Q210 50 220 70 L230 60 L230 80 L220 70 Q210 90 180 90 L60 90 Q20 90 20 70 Z"
        fill="#f8fafc"
        stroke="#cbd5e1"
        stroke-width="1"
      />

      <!-- Tail -->
      <path d="M30 55 L60 55 L50 25 L30 25 Z" fill="#0ea5e9" />
      <path d="M35 55 L55 55 L48 35 L35 35 Z" fill="#0284c7" opacity="0.2" />

      <!-- Wing (Front) -->
      <path
        d="M100 75 L150 75 L170 95 L110 95 Z"
        fill="#0ea5e9"
        opacity="0.9"
      />
      <path
        d="M100 75 L150 75 L170 95 L110 95 Z"
        fill="url(#wingGrad)"
        opacity="0.4"
      />

      <!-- Cockpit -->
      <path d="M195 55 Q205 55 210 60 L210 68 L195 68 Z" fill="#38bdf8" />

      <!-- Engines -->
      <path
        d="M110 80 L130 80 Q135 80 135 85 Q135 90 130 90 L110 90 Q105 90 105 85 Q105 80 110 80 Z"
        fill="#cbd5e1"
        stroke="#94a3b8"
        stroke-width="1"
      />
      <path
        d="M150 80 L170 80 Q175 80 175 85 Q175 90 170 90 L150 90 Q145 90 145 85 Q145 80 150 80 Z"
        fill="#cbd5e1"
        stroke="#94a3b8"
        stroke-width="1"
      />

      <!-- Branding Strip -->
      <path d="M60 60 L180 60 L175 65 L65 65 Z" fill="#0ea5e9" opacity="0.2" />

      <defs>
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  <!-- Speed Lines -->
  <div
    class="absolute bottom-20 right-0 w-40 h-0.5 bg-gradient-to-l from-primary-200 to-transparent opacity-60 animate-pulse"
  ></div>
</div>

<style>
  .dashed-line {
    background-image: linear-gradient(
      to right,
      transparent 50%,
      rgba(255, 255, 255, 0.5) 50%
    );
    background-size: 40px 100%;
  }

  @keyframes cloud-slow {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50px);
    }
  }
  .animate-cloud-slow {
    animation: cloud-slow 20s linear infinite alternate;
  }

  @keyframes takeoff {
    0%,
    100% {
      transform: translate(-50%, 0) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -5px) rotate(-1deg);
    }
  }
  .animate-takeoff {
    animation: takeoff 4s ease-in-out infinite;
  }

  @keyframes shadow-scale {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.1;
    }
    50% {
      transform: scale(0.9);
      opacity: 0.05;
    }
  }
  .animate-shadow {
    transform-origin: center;
    animation: shadow-scale 4s ease-in-out infinite;
  }
</style>
