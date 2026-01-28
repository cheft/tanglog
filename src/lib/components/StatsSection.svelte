<script lang="ts">
  import { Motion } from "svelte-motion";
  import { Users, Clock, ShieldCheck, TrendingUp } from "lucide-svelte";

  const stats = [
    { label: "行业实力", value: "中美双公司", suffix: "", icon: Clock },
    { label: "服务客户", value: "1000+", suffix: "", icon: Users },
    { label: "准时率", value: "98", suffix: "%", icon: TrendingUp },
    { label: "货损率", value: "<0.1", suffix: "%", icon: ShieldCheck },
  ];
</script>

<section class="py-20 relative overflow-hidden">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each stats as stat, i}
        <Motion
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          let:motion
        >
          <div
            use:motion
            class="text-center p-6 rounded-2xl glass-dark border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
          >
            <div
              class="inline-flex p-3 rounded-full bg-primary-500/10 text-primary-400 mb-4"
            >
              <svelte:component this={stat.icon} class="w-6 h-6" />
            </div>
            <div class="text-4xl font-bold text-white mb-2">
              {stat.value}<span class="text-primary-500 text-2xl"
                >{stat.suffix}</span
              >
            </div>
            <div class="text-slate-400 text-sm font-medium">
              {stat.label}
            </div>
          </div>
        </Motion>
      {/each}
    </div>
  </div>
</section>
