---
title: EU Isolation
type: docs
---

There's a way to use Private Captcha APIs in such a way that all requests are routed **exclusively** to our servers in EU locations.

> [!NOTE]
> Private Captcha uses EU-only suppliers so by "servers in EU locations" we don't mean a US-based company (e.g. AWS) with EU points of presence.

To achieve this you need to make 2 changes: one on the frontend and second on the backend.

**TL;DR;** version is that you need to replace in your code `api.{{<domain>}}` to `api.eu.{{<domain>}}`.

## Frontend changes

To make sure captcha widget only talks to EU APIs you need to set a [`data-puzzle-endpoint`]({{< relref "/docs/reference/widget-options.md#attributes" >}}) to `https://api.eu.{{< domain >}}/puzzle` in the widget declaration:

{{< tabs items="Diff,Full code" >}}
{{< tab >}}
```diff
<div class="private-captcha" data-sitekey="xyz"
    ...
+    data-puzzle-endpoint="https://api.eu.{{< domain >}}/puzzle"
    ...
>
</div>
```
{{</ tab >}}
{{< tab >}}
```html
<div class="private-captcha"
    data-sitekey="xyz"
    data-puzzle-endpoint="https://api.eu.{{< domain >}}/puzzle">
</div>
```
{{</ tab >}}
{{< /tabs >}}

> [!NOTE]
> This does not affect the captcha widget Javascript snippet itself which loads from CDN points of presence over the world to decrease latency. No end-user PII is involved.

## Backend changes

When you verify the form submission on the server side, you need to make `POST` request to the corresponding EU endpoint: `https://api.eu.{{< domain >}}/siteverify`.

```diff
curl -X POST \
  -H "X-Api-Key: your-api-key-here" \
  -d "solution" \
-  https://api.{{< domain >}}/siteverify
+  https://api.eu.{{< domain >}}/siteverify
```

## Implications

The cost of EU isolation is the potential slowdown of the initial widget initialization, in case the end-user is accessing website geographically far from Europe. In most cases it should not be noticeable to the end-user as most operations happen strictly in the background.