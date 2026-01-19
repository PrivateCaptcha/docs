---
title: Widget Preview Tool
type: docs
weight: 5
---

Use this interactive tool to explore Private Captcha widget options and generate code snippets for your website. Adjust the options below and see changes reflected in the preview immediately.

When you're happy with the configuration, click **Copy Code to Clipboard** or switch to the **Source Code** tab to see and copy the generated HTML.

{{< callout type="info" >}}
This preview uses a **test sitekey** that works on any domain. Replace `YOUR_SITEKEY` in the generated code with your actual sitekey from the [portal](https://portal.privatecaptcha.com).
{{< /callout >}}

<script src="https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js?render=explicit" defer></script>

{{< widgetpreview >}}

## Next Steps

After configuring your widget:

1. Copy the generated code
2. Replace `YOUR_SITEKEY` with your actual sitekey
3. Add the code to your HTML form
4. [Verify solutions]({{< relref "/docs/reference/verify-api.md" >}}) on your server

For more details on each option, see the [Widget Options Reference]({{< relref "/docs/reference/widget-options.md" >}}).
