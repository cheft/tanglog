<script lang="ts">
  import { t } from "$lib/i18n";
  import YouTube from "./icons/YouTube.svelte";
  import TikTok from "./icons/TikTok.svelte";
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
  <div class="container mx-auto px-6">
    <div class="grid md:grid-cols-3 gap-12 mb-12">
      <!-- Column 1: Brand & Desc -->
      <div class="col-span-1">
        <a
          href="/"
          class="text-2xl font-bold text-slate-900 tracking-tighter mb-6 block"
        >
          LOF<span class="text-primary-600">LOG</span>
        </a>
        <p class="text-sm text-slate-500 leading-relaxed">
          {$t.footer.description}
        </p>
      </div>

      <!-- Column 2: Quick Links (Shifted Left) -->
      <div>
        <h4 class="text-slate-900 font-bold mb-6">{$t.footer.links}</h4>
        <ul class="space-y-3 text-sm">
          <li>
            <a href="#home" class="hover:text-primary-600 transition-colors"
              >{$t.nav.home}</a
            >
          </li>
          <li>
            <a
              href="/shipping-calculator"
              class="hover:text-primary-600 transition-colors"
              >{$t.calculator.title}</a
            >
          </li>
          <li>
            <a href="/tracking" class="hover:text-primary-600 transition-colors"
              >{$t.tracking.title}</a
            >
          </li>
          <li>
            <a href="/zip" class="hover:text-primary-600 transition-colors"
              >{$t.nav.zip}</a
            >
          </li>
          <li>
            <a href="/blog" class="hover:text-primary-600 transition-colors"
              >{$t.nav.blog}</a
            >
          </li>
        </ul>
      </div>

      <!-- Column 3: Contact & Follow (Combined) -->
      <div>
        <h4 class="text-slate-900 font-bold mb-6">
          {$t.contact.title} & {$t.footer.follow}
        </h4>

        <div class="space-y-4 text-sm mb-8">
          <!-- Phone -->
          <div>
            <div class="font-bold text-slate-900 mb-1">
              {$t.contact.info.phoneTitle}
            </div>
            <div class="flex gap-2">
              <a
                href="tel:{$t.contact.info.phoneNumber}"
                class="text-slate-600 hover:text-primary-600 transition-colors"
              >
                {$t.contact.info.phoneNumber}
              </a>
              <div class="text-xs text-slate-400 mt-0.5">
                {$t.contact.info.phoneHours}
              </div>
            </div>
          </div>

          <!-- Email -->
          <div>
            <div class="font-bold text-slate-900 mb-1">
              {$t.contact.info.emailTitle}
            </div>
            <a
              href="mailto:{$t.contact.info.emailAddress}"
              class="text-slate-600 hover:text-primary-600 transition-colors"
            >
              {$t.contact.info.emailAddress}
            </a>
          </div>

          <!-- China Address -->
          <div>
            <div class="font-bold text-slate-900 mb-1">
              {$t.contact.info.addressTitle}
            </div>
            <p class="text-slate-600 leading-relaxed">
              {$t.contact.info.addressChina}
            </p>
          </div>
        </div>

        <div class="flex space-x-4">
          <!-- Social Icons -->
          <a
            target="_blank"
            href="https://www.youtube.com/@LofengNow/shorts"
            aria-label="YouTube"
            class="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-700 hover:text-white transition"
          >
            <YouTube className="w-5 h-5" />
          </a>
          <a
            target="_blank"
            href="https://www.douyin.com/user/MS4wLjABAAAArcg1J0RxAXw2BNbl80No5f54briaQeB3xcN3xe5klvQ2gsG2o1BjEeGcgMDopYJZ"
            aria-label="TikTok"
            class="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-700 hover:text-white transition"
          >
            <TikTok className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    <div
      class="border-t border-slate-200 pt-8 text-center text-sm text-slate-400"
    >
      <p>&copy; {currentYear} {$t.footer.rights}</p>
    </div>
  </div>
</footer>
