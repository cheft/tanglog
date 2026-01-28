<script>
    // LogisticsAnimation.svelte
    // Handles the background animations for the logistics theme
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- Airplane -->
    <div class="absolute top-20 left-0 w-full h-full animate-fly opacity-0" style="animation-delay: 2s;">
        <svg class="w-12 h-12 text-slate-400/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
    </div>

    <!-- Cargo Ship -->
    <div class="absolute bottom-32 left-0 w-full h-full animate-sail opacity-0" style="animation-delay: 0s;">
        <svg class="w-16 h-16 text-slate-300/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM1 18v-3l7-3 7 3v3l-7-3-7 3zm19-5.5l-7-3-7 3V11l7-3 7 3v1.5zM6 6h12v3.5L12 6.5 6 9.5V6zm12-2H6V2h12v2z"/>
        </svg>
    </div>

    <!-- Truck -->
    <div class="absolute bottom-10 left-0 w-full h-full animate-drive opacity-0" style="animation-delay: 10s;">
        <svg class="w-14 h-14 text-slate-400/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
    </div>
</div>
