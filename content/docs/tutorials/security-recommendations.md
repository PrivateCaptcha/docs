---
title: "Security recommendations"
date: 2025-12-03T19:04:27+01:00
---

## Client side

### Widget display mode

Usual widget type (`data-display-mode="widget"`) is the safest option.

Equally secure is using a popup widget **IF** it has `data-start-mode="click"`, thus forcing user to click the widget in the popup. Using popup widget with `auto` start mode (the default) is **not** the most secure option and is not recommended.

When you hide the widget using `data-display-mode="hidden"`, security of the CAPTCHA protection depends entirely on your implementation. For example, if you start solving captcha automatically (instead of somehow forcing user to click on something), it is relatively similar for bots to having no captcha at all (sans the resource cost of proof-of-work).

### Widget script (CDN)

Make sure that you are not serving the Private Captcha widget yourself (especially relevant for various WordPress caching plugins) and you are always loading widget from `cdn.privatecaptcha.com`.

## Server side

### Verification

All [server-side integrations]({{< relref "docs/integrations/_index.md" >}}) have some kind of a `verify()` method that returns an object that has a method `OK()`. This is the only method you should be checking to see if CAPTCHA solution is valid. If the result is `false`, you can get more details by checking underlying fields `Success` and `Code` (for debugging purposes only).

All [server-side integrations]({{< relref "docs/integrations/_index.md" >}}) allow you to specify an optional `sitekey` parameter with each verification request. This is the sitekey that you are expected to check the solution against and, while being optional, is recommended to make use of.

{{% details title="What is the point of the `sitekey` argument" closed="true" %}}

It an additional layer of verification. For example, if you're using verification API incorrectly, an attacker can send you a solution for test puzzle. Verification will return `Success` field set to `true` (by design) and `Code` (error) set as `test-property`. If you would set the expected `sitekey`, it will eliminate this kind of errors.

> NOTE: this kind of errors is already eliminated if you're using `OK()` methods and not checking `success`/`code` yourself

{{% /details %}}

### Client libraries

Make sure to automatically update your client library version for Private Captcha (e.g. using Renovate or Dependabot). Safe option is to have a "stability days" buffer (e.g. 7 days) before automatically merging updates.