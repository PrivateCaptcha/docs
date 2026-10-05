---
title: "Property settings"
date: 2025-09-05T14:06:56+03:00
---

Protection of a website or a form starts with creating a property in the [Portal](https://portal.{{< domain >}}). Property corresponds to a single CAPTCHA widget - it can be used on a website, a particular web page, form, subdomain etc. Property is identified by a Site Key, which looks like `aaaaaaaabbbbccccddddeeeeeeeeeeee`. Site Key is used in the [widget initialization]({{< relref "/docs/reference/widget-options.md" >}}).

We'll go through all property settings that you can change.

![Property settings](/images/reference/property-settings.png)

## Domain

![Enter name and domain](/images/integrations/new-wordpress-site.png)

You set domain when you create the property in the Portal. You can change the property name, but you **cannot** change Domain in settings.

### Subdomains

![Property settings subdomains](/images/reference/property-settings-subdomains.png)

By default CAPTCHA requests are only allowed on the domain that you used to create the property. If you created property with domain `example.com`, then you cannot use the same widget on `portal.example.com`. However, if you enable _"Allow subdomains"_ checkbox, all subdomains are allowed.

### Localhost

![Property settings localhost](/images/reference/property-settings-localhost.png)

In the lieu of the "Subdomains" logic, localhost access (for development) is also not allowed by default (in that case anybody can use your property Site Key locally). But you can temporarily enable _"Allow localhost"_ for development purposes. In that case you will have a "testing" label added to your property.

## Challenge verification

There're 2 important settings in this section:

![Property settings verification](/images/reference/property-settings-verification.png)

### Verification window

Captcha challenges (or "puzzles") have a validity period during which they can be "solved" and verified. You can set validity period from few minutes to a couple of days. If a CAPTCHA solution is checked outside of validity period, it's considered invalid.

### Repeated solutions

> [!NOTE]
> This is an advanced setting that allows to build different applications out of Private Captcha API.

By default you cannot submit a solution to the same CAPTCHA puzzle more than once. Second time it will be considered invalid. This is a protection against so called "replay attack", where a malicious actor solves puzzle only once, but sends your form or accesses your page multiple times.

However, there are cases when you want to allow this. One example if when Private Captcha is used as a proxy in front of your website, like in the use-case of AI scrapers protection (or API endpoints protection). In such case when the user requests a webpage with a valid solution (solved challenge/puzzle), we want to grant them access, up to a certain number of times.

This is where the setting with the number of repeated solutions comes into play. If you set the value to, say, `5`, it means user can solve the CAPTCHA puzzle once to access your resources `5` times before being requested to pass another challenge. The exact number you want to use is the trade off between annoying your user base and protecting your resources against automated access or AI scrapers.

## Challenge difficulty

Each CAPTCHA challenge has a certain "difficulty". Difficulty corresponds to the amount of resource the client has to use in order to "solve" the challenge. The higher the difficulty, more resources are required to "solve" (pass) the challenge.

![Property settings difficulty](/images/reference/property-settings-difficulty.png)

Private Captcha offers dynamic (automatically scaled) difficulty out of the box in all plans. This means when there are more requests, the difficulty of each subsequent challenge will grow, and when there are less requests, it will fall back to base settings. This is the basis of the security of scale.

### Base difficulty

This is the "default" challenge difficulty level when there are no user requests at all. You can test how does it feel using the playground right below those settings.

### Difficulty growth

When user (or bots) requests to your resources (websites, forms, API) keep coming, Private Captcha automatically scales the difficulty. You have 3 options of how fast the difficulty changes based on the number of requests:

- **Constant** (difficulty does not change at all and the value you set will always be returned)
- **Slow** (difficulty changes slower than usual, it will take more requests to increase the difficulty on average)
- **Normal** (default setting of difficulty growth)
- **Fast** (difficulty growth is very reactive and will grow faster as more requests come)

## Challenge type

Starting from version 1.45.0 (for self-hosted) and from October 2026 for SaaS, Private Captcha supports memory-hard challenges (via Argon2id hash). Default option will stay compute-hard (via Blake2b hash) and does not require _any_ extra changes.

### Configuration

{{% steps %}}

#### Property settings

Change challenge type to memory-hard version in the `Advanced` section of property settings:

![Property challenge type](/images/reference/property-challenge-type.png)

Note that due ot caching, it might take a couple of minutes for the effect to propagate.

#### Change client-side script

Add `?v=ext` to your script include:

```diff {filename="index.html"}
 <head>
-    <script defer src="https://cdn.{{< domain >}}/widget/js/privatecaptcha.js"></script>
+    <script defer src="https://cdn.{{< domain >}}/widget/js/privatecaptcha.js?v=ext"></script>
 </head>
```

For WordPress/Magento2 you can select "Extended" script type in Private Captcha extension's `Advanced` settings.

Default `privatecaptcha.js` script does **not** include Argon2id implementation. It is only available via an "extended" script (received via either `privatecaptcha-ext.js` or `privatecaptcha.js?v=ext`). Extended script is a few KB "heavier" than the usual script.

{{% /steps %}}

### Availability

Service | Requirements
--- | ---
Self-hosted | [Configured]({{< relref "docs/deployment/configuration.md" >}}) `PC_ARGON2_MEMORY_BUDGET_MIB` to positive value and version is higher than `1.45.0`
SaaS | Contact Support in [Portal](https://portal.{{< domain >}}/)

Extended script is already supported in our integrations:
- [WordPress]({{< relref "docs/integrations/wordpress.md" >}}) (1.0.46+)
- [Magento 2]({{< relref "docs/integrations/magento2.md" >}}) (1.0.8+) integrations.
- JavaScript widget corelib (0.0.31+)
- [Vue.js]({{< relref "docs/integrations/vue.md" >}}) (0.0.5+)
- [React]({{< relref "docs/integrations/react.md" >}}) (0.0.12+)