<script lang="ts">
  import { Motion } from "svelte-motion";

  export let title: string;
  export let description: string;
  export let icon: any; // Component type
  export let features: string[] = [];
  export let delay: number = 0;
  export let image: string = "";
  export let illustration: any = null; // Svelte component

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  };
</script>

<Motion
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={cardVariants}
  let:motion
>
  <div
    use:motion
    class="group relative rounded-2xl bg-white border border-slate-100 hover:border-primary-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden flex flex-col h-full"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    ></div>

    {#if image}
      <div class="h-48 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"
        ></div>
      </div>
    {:else if illustration}
      <div class="h-48 overflow-hidden relative bg-slate-50">
        <svelte:component
          this={illustration}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    {:else}
      <!-- Premium Placeholder -->
      <div
        class="h-48 bg-slate-50 relative overflow-hidden group-hover:bg-slate-100 transition-colors duration-500"
      >
        <div
          class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"
        ></div>

        <!-- Abstract Shapes -->
        <div
          class="absolute -right-10 -top-10 w-40 h-40 bg-primary-50 rounded-full blur-2xl group-hover:bg-primary-100/50 transition-colors duration-500"
        ></div>
        <div
          class="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary-50 rounded-full blur-2xl group-hover:bg-secondary-100/50 transition-colors duration-500"
        ></div>

        <div
          class="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        >
          <svelte:component this={icon} class="w-24 h-24 text-slate-900" />
        </div>
      </div>
    {/if}

    <div class="relative z-10 p-8 pt-6 flex-grow flex flex-col">
      <div
        class="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white group-hover:shadow-sm -mt-12 relative z-20 shadow-sm border border-slate-100"
      >
        <svelte:component this={icon} class="w-7 h-7 text-primary-600" />
      </div>

      <h3
        class="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors"
      >
        {title}
      </h3>
      <p class="text-slate-500 mb-6 text-sm leading-relaxed flex-grow">
        {description}
      </p>

      {#if features.length > 0}
        <ul class="space-y-2 mt-auto">
          {#each features as feature}
            <li class="flex items-center text-sm text-slate-600">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></span>
              {feature}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</Motion>
