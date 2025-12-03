---
title: "Security recommendations"
date: 2025-12-03T19:04:27+01:00
---

## Client side

### Widget display mode

Usual widget type (`data-display-mode="widget"`) is the safest option.

Equally secure is using a popup widget which has `data-start-mode="click"`, thus forcing user to click the widget in the popup. Using popup widget with `auto` start mode (the default) is **not** the most secure option.

When you hide the widget using `data-display-mode="hidden"`, security of the CAPTCHA protection depends entirely on your implementation.

### Widget script (CDN)

Make sure that you are not serving the Private Captcha widget yourself (especially relevant for various WordPress caching plugins) and you are always loading widget from `cdn.privatecaptcha.com`.

## Server side

### Verification

All [server-side integrations]({{< relref "docs/integrations/_index.md" >}}) return an object that has a method `OK()`. This is the only method you should be checking. If this is `false`, you can get more details by checking underlying fields `Success` and `Code` (for debugging purposes only).

All [server-side integrations]({{< relref "docs/integrations/_index.md" >}}) allow you to specify an optional `sitekey` parameter with each verification request. This is the sitekey that you are expected to check the solution against and, while being optional, is recommended to make use of.

### Client libraries

Make sure to automatically update your client library version for Private Captcha (e.g. using Renovate or Dependabot). Safe option is to have a "stability days" buffer (e.g. 7 days) before automatically merging updates.