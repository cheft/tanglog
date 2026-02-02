<script lang="ts">
    import { t } from "$lib/i18n";
    import { MapPin, Mail, Phone } from "lucide-svelte";
</script>

<section class="py-24 bg-white text-[#0f172a] font-['Sarabun']">
    <div class="container mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
            <h2
                class="text-xs font-bold uppercase tracking-widest text-[#3b82f6] mb-4"
            >
                {$t.team.label}
            </h2>
            <h3 class="text-3xl md:text-5xl font-bold leading-tight mb-6">
                {$t.team.title}
            </h3>
            <p class="text-gray-500">
                {$t.team.description}
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each $t.team.items as member}
                <div
                    class="group h-[500px] relative overflow-hidden rounded-3xl shadow-lg border border-gray-100"
                >
                    <!-- Member Image -->
                    <img
                        src={member.img}
                        alt={member.name}
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />

                    <!-- Content Overlay - Static Bottom -->
                    <div
                        class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent p-8 pt-20"
                    >
                        <h4 class="text-white text-2xl font-bold mb-1">
                            {member.name}
                        </h4>
                        <div
                            class="flex items-center text-[#3b82f6] text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            <MapPin class="w-3 h-3 mr-1" />
                            {member.role}
                        </div>

                        <!-- Hoverable Contact Info -->
                        <div
                            class="flex space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        >
                            <button
                                class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#3b82f6] transition-colors"
                            >
                                <Mail class="w-4 h-4" />
                            </button>
                            <button
                                class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#3b82f6] transition-colors"
                            >
                                <Phone class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <!-- Top Badge (optional) -->
                    <div
                        class="absolute top-6 left-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20"
                    >
                        <span
                            class="text-[10px] text-white font-bold uppercase tracking-tighter"
                            >Verified Expert</span
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
