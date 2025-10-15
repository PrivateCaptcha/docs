---
title: "Security"
date: 2025-10-15T12:26:01+03:00
---

## Content-Security-Policy Settings

If you use Content Security Policy (CSP) headers, you need to add few domains to your configuration (also applies if you use [EU Isolation]({{< relref "/docs/reference/eu-isolation.md" >}})).

You need to add `https://privatecaptcha.com`, `https://*.privatecaptcha.com` to `script-src`, `frame-src`, `style-src`, `connect-src`.

Do **not** hard-code specific subdomains, like `api.privatecaptcha.com`, into your CSP.

## Secrets rotation

Usually you do not need to rotate the **client** widget sitekey.

However, each API key that you use for the **server-side** validation, has an expiration date and will either expire or will have to be rotated. You should receive an email notification before your API key is expired.