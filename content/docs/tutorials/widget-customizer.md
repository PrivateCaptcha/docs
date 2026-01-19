---
title: Widget customizer
type: docs
captcha_scripts: true
captcha_render_explicit: true
---

Use this page to preview common widget settings and copy a ready-to-use snippet.

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
<div class="not-prose hx:flex hx:flex-col hx:items-center hx:gap-4">
    <div class="private-captcha-anchor hx:w-full hx:flex hx:justify-center">
        <div id="pc-widget-preview" class="hx:w-full hx:flex hx:justify-center"></div>
    </div>
    <button
        type="button"
        id="pc-widget-trigger"
        class="not-prose hx:font-medium hx:cursor-pointer hx:px-4 hx:py-2 hx:rounded-full hx:text-center hx:text-white hx:inline-block hx:bg-primary-600 hx:hover:bg-primary-700 hx:focus:outline-none hx:focus:ring-4 hx:focus:ring-primary-300 hx:dark:bg-primary-600 hx:dark:hover:bg-primary-700 hx:dark:focus:ring-primary-800 hx:transition-all hx:ease-in hx:duration-200 hidden"
    >
        Start captcha
    </button>
</div>
{{< /tab >}}

{{< tab >}}
<div class="not-prose hx:flex hx:flex-col hx:gap-3">
    <button
        type="button"
        id="pc-widget-copy"
        class="not-prose hx:self-start hx:font-medium hx:cursor-pointer hx:px-4 hx:py-2 hx:rounded-full hx:text-center hx:text-white hx:inline-block hx:bg-primary-600 hx:hover:bg-primary-700 hx:focus:outline-none hx:focus:ring-4 hx:focus:ring-primary-300 hx:dark:bg-primary-600 hx:dark:hover:bg-primary-700 hx:dark:focus:ring-primary-800 hx:transition-all hx:ease-in hx:duration-200"
    >
        Copy code
    </button>
    <pre class="hx:rounded-lg hx:bg-gray-100 hx:dark:bg-neutral-900 hx:p-4 hx:overflow-x-auto">
        <code id="pc-widget-code" class="language-html"></code>
    </pre>
</div>
{{< /tab >}}

{{< /tabs >}}

{{< widgetcustomizer >}}
