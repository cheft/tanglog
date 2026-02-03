<script lang="ts">
    import { page } from "$app/stores";
    import { t, currentLang } from "$lib/i18n";

    $: activePrefix = $page.params.lang ? `/${$page.params.lang}` : "";
</script>

<footer class="pt-24 pb-12 bg-[#0f172a] text-white font-['Sarabun']">
    <div class="container mx-auto px-6">
        <!-- Grid -->
        <div class="grid md:grid-cols-3 gap-16 mb-16">
            <!-- Col 1: Branding & Info -->
            <div class="space-y-6">
                <div
                    class="text-2xl font-bold tracking-tighter flex items-center gap-2"
                >
                    TangLog <span class="text-sm font-normal text-gray-400"
                        >| {$t.companyName}</span
                    >
                </div>
                <p class="text-gray-400 leading-relaxed text-sm">
                    {$t.footer.desc}
                </p>
                <div class="text-gray-400 text-sm">
                    <p class="font-bold text-white mb-2">
                        {$currentLang === "zh"
                            ? "深圳市总部 (Shenzhen HQ):"
                            : "Shenzhen HQ:"}
                    </p>
                    <p>{$t.footer.address}</p>
                </div>
            </div>

            <!-- Col 2: Our Services (Home Section Links) -->
            <div>
                <h4 class="font-bold text-lg mb-8 text-[#3b82f6]">
                    {$t.footer.services}
                </h4>
                <ul class="space-y-4 text-gray-400 text-sm">
                    <li>
                        <a
                            href="{activePrefix}/#services"
                            class="hover:text-white transition-colors"
                            >{$t.footer.homeLinks.services}</a
                        >
                    </li>
                    <li>
                        <a
                            href="{activePrefix}/#testimonials"
                            class="hover:text-white transition-colors"
                            >{$t.footer.homeLinks.testimonials}</a
                        >
                    </li>
                    <li>
                        <a
                            href="{activePrefix}/#team"
                            class="hover:text-white transition-colors"
                            >{$t.footer.homeLinks.team}</a
                        >
                    </li>
                    <li>
                        <a
                            href="{activePrefix}/#blog"
                            class="hover:text-white transition-colors"
                            >{$t.footer.homeLinks.blog}</a
                        >
                    </li>
                    <li>
                        <a
                            href="{activePrefix}/#faq"
                            class="hover:text-white transition-colors"
                            >{$t.footer.homeLinks.faq}</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Col 3: Quick Links (Page Links) -->
            <div>
                <h4 class="font-bold text-lg mb-8 text-[#3b82f6]">
                    {$t.footer.quickLinks}
                </h4>
                <ul class="space-y-4 text-gray-400 text-sm">
                    <li>
                        <a
                            href="{activePrefix}/tracking"
                            class="hover:text-white transition-colors"
                            >{$t.footer.linkLabels.tracking}</a
                        >
                    </li>
                    <li>
                        <a
                            href="{activePrefix}/zip"
                            class="hover:text-white transition-colors"
                            >{$t.footer.linkLabels.zip}</a
                        >
                    </li>
                    <li>
                        <a
                            href="{activePrefix}/blog"
                            class="hover:text-white transition-colors"
                            >{$t.footer.linkLabels.blog}</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom -->
        <div
            class="flex flex-col md:flex-row justify-center items-center text-sm text-gray-500 pt-8 border-t border-white/10"
        >
            <div>{$t.footer.copyRight}</div>
            <!-- <div class="flex space-x-6 mt-4 md:mt-0">
                <a href="#privacy" class="hover:text-white transition-colors"
                    >Privacy Policy</a
                >
                <a href="#terms" class="hover:text-white transition-colors"
                    >Terms of Service</a
                >
            </div> -->
        </div>
    </div>
</footer>
