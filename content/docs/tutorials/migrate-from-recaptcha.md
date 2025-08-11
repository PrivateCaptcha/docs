---
title: "Migrate from reCAPTCHA"
date: 2025-08-11T13:30:34+03:00
draft: true
---

You can migrate from Google reCAPTCHA "fast" using compatibilty mode for server-side and client-side parts or you can fully migrate to Private Captcha.

## Fast migration

### Client-side

Private Captcha offers a compatibility mode for the website integration (note `?compat=recaptcha` script parameters):

```diff {filename="index.html"}
@@ -18,7 +18,13 @@
- <script src="https://www.google.com/recaptcha/api.js" async defer></script>
+ <script src="https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js?compat=recaptcha" defer></script>
```

Compatibility mode means the following:
- solution form field will be called `g-recaptcha-response` instead of `private-captcha-solution`
- Private Captcha [JavaScript object]({{< relref "/docs/reference/captcha-object.md" >}}) is available as `grecaptcha` global property
- Private Captcha looks for elements with `g-recaptcha` class instead of `private-captcha` for automatic widget rendering
- All compatible [global APIs for reCAPTCHA](https://developers.google.com/recaptcha/docs/display#js_api) like `render()` or `getResponse()` are also present

> [!NOTE]
> Private Captcha offers [invisible mode]({{< relref "/docs/tutorials/invisible-captcha.md" >}}) with `execute()` API too

#### Explicit rendering

By default, when you include the client script, Private Captcha initializes all elements that have `g-recaptcha` class attached (that is, in compatibility mode).

However, you can also explicitly render captcha elements using `window.grecaptcha.render(htmlElement, options)` API, that is also available in reCAPTCHA (and even hCAPTCHA). To do so, add another argument to js script include: `render=explicit` and then explicitly call `render()` for all elements that you need.

### Server-side

Private Captcha offers reCAPTCHA v2-compatible API endpoint `/siteverify`, that you can use like this:

```diff
- "https://www.google.com/recaptcha/api/siteverify"
+ "https://api.privatecaptcha.com/siteverify"
```

> [!WARNING]
> Google reCAPTCHA also supports `GET` request type to `/siteverify` endpoint (in addition to `POST`), but Private Captcha **only** supports `POST`

In case you are using reCAPTCHA v3, you need to add an additional header `X-Captcha-Compat-Version: rcV3` to your requests and response will follow v3-compatible API.

## Full migration

> [!NOTE]
> Full migration is recommended as it uses more efficient codepaths.

To migrate from reCAPTCHA completely, you need to rely on Private Captcha semantics on the client-side and use one of the [pre-built integrations]({{< relref "/docs/integrations/_index.md" >}}) on the server side.

### Client-side

Even without compatibility mode (above), Private Captcha offers similar client-side API as reCAPTCHA, so migration shouldn't cause a lot of pain. You can check [full widget documentation]({{< relref "/docs/reference/widget-options.md" >}}) for front-end details.

Things you generally will need to do:

- replace script to use the Private Captcha one
- replace added class `g-recaptcha` to `private-captcha` for automatic/implicit rendering (the default)
- replace usage of `grecaptcha` global object (if any) to `privateCaptcha`
- change stub sitekeys for [testing]({{< relref "/docs/reference/testing.md" >}}), if you have any

### Server-side

Private Captcha offers a lot of [pre-built integrations]({{< relref "/docs/integrations/_index.md" >}}) so your backend technology is very likely covered. If not, you can rely on [OpenAPI spec]({{< relref "/docs/integrations/openapi.md" >}}) to generate your client (or write one yourself, as it's doing only a single `POST` request to an API endpoint).