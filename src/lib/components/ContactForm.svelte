<script lang="ts">
  import { Send, Phone, Mail, MapPin } from "lucide-svelte";
  import { t } from "$lib/i18n";

  // 表单数据绑定
  let formData = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  // 触发邮件客户端
  function sendEmail() {
    // 构造主题和正文（UTF-8编码，避免乱码）
    const subject = encodeURIComponent($t.contact.form.subject);
    const body = encodeURIComponent(
      `姓名：${formData.name}\n电话：${formData.phone}\n邮箱：${formData.email}\n咨询内容：${formData.message}`,
    );
    // 生成 mailto 链接并跳转
    window.location.href = `mailto:services@tanglog.com?subject=${subject}&body=${body}`;
  }
</script>

<section id="contact" class="py-20 bg-slate-50">
  <div class="container mx-auto px-6">
    <div class="grid lg:grid-cols-2 gap-16">
      <!-- Contact Info -->
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          {$t.contact.title}
        </h2>
        <p class="text-slate-600 mb-10 text-lg">
          {$t.contact.description}
        </p>

        <div class="space-y-8">
          <div class="flex items-start">
            <div
              class="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 mr-4"
            >
              <Phone class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-lg font-bold text-slate-900 mb-1">
                {$t.contact.info.phoneTitle}
              </h4>
              <p class="text-slate-600">{$t.contact.info.phoneNumber}</p>
              <p class="text-slate-500 text-sm mt-1">
                {$t.contact.info.phoneHours}
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div
              class="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 mr-4"
            >
              <Mail class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-lg font-bold text-slate-900 mb-1">
                {$t.contact.info.emailTitle}
              </h4>
              <p class="text-slate-600">{$t.contact.info.emailAddress}</p>
              <p class="text-slate-500 text-sm mt-1">
                {$t.contact.info.emailResponse}
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div
              class="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 shrink-0 mr-4"
            >
              <MapPin class="w-6 h-6" />
            </div>
            <div>
              <h4 class="text-lg font-bold text-slate-900 mb-1">
                {$t.contact.info.addressTitle}
              </h4>
              <p class="text-slate-600 mb-2">
                {$t.contact.info.addressChina}
              </p>
              <p class="text-slate-600">
                {$t.contact.info.addressUS}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h3 class="text-2xl font-bold text-slate-900 mb-6">
          {$t.contact.form.title}
        </h3>
        <form class="space-y-6" on:submit|preventDefault={sendEmail}>
          <input type="hidden" name="subject" value={$t.contact.form.subject} />

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-slate-700 mb-2"
                >{$t.contact.form.nameLabel}</label
              >
              <input
                type="text"
                id="name"
                name="name"
                bind:value={formData.name}
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                placeholder={$t.contact.form.namePlaceholder}
              />
            </div>
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-slate-700 mb-2"
                >{$t.contact.form.phoneLabel}</label
              >
              <input
                type="tel"
                id="phone"
                name="phone"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                placeholder={$t.contact.form.phonePlaceholder}
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-slate-700 mb-2"
              >{$t.contact.form.emailLabel}</label
            >
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              name="email"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder={$t.contact.form.emailPlaceholder}
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm font-medium text-slate-700 mb-2"
              >{$t.contact.form.messageLabel}</label
            >
            <textarea
              id="message"
              name="message"
              rows="4"
              bind:value={formData.message}
              class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder={$t.contact.form.messagePlaceholder}
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center group"
          >
            {$t.contact.form.submit}
            <Send
              class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
