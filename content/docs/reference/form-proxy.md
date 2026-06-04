---
title: "Form proxy"
date: 2026-06-03T18:22:49+02:00
---

Form proxy allows you to use our endpoint (e.g. `https://api.privatecaptcha.com/form/123`) instead of your endpoint for `<form>` request. We will forward ("proxy") only submissions when captcha and rate-limiting have passed.

This allows to **secure** your endpoint:
- we check if captcha was solved (this assumes you will use Private Captcha widget on the form)
- your actual form URL is hidden (security-by-obscurity) and noone knows about it
- we apply rate-limiting and other protection [rules]({{< relref "docs/reference/rules.md" >}}) to the form endpoint and captcha

This makes it for a perfect use-case for forms on static websites or general webhooks protection (e.g. forms backed by Google Docs, Webflow or Zapier / Make / N8N).

## Captcha property

Each form proxy has to be used with a captcha property (the point of "form proxy" is that we check captcha solution for you).

When you create a new form, a new corresponding [property]({{< relref "docs/reference/property-settings.md" >}}) is created. This property can be managed from the Form settings, but it cannot be moved or deleted independent of the form. You can configure various [difficulty rules]({{< relref "docs/reference/rules.md" >}}) for the captcha property and they will be taken into account when performing Form security check prior to forwarding the submission.

## Settings

We'll go through all form settings that you can change.

![Property settings](/images/reference/form-settings-all.png)

### URL

This is where the actual form submissions will be forwarded after the captcha verification and other security (e.g. rate limiting) applied.

### Method

You can select one of the standard HTTP methods: `POST` (default), `PUT`, `DELETE` and `PATCH`. All forms use `POST` by default for forwarding requests.

### Requests per minute

You can limit how many requests can be forwarded to your destination each minute (default is `10`). Submissions exceeding this limit will be rejected with `429` (Too Many Requests). Each configuration includes "burst" which is set to `RPM + 10`.

### Retry

You can optionally configure requests to be retried when the endpoint returns `5xx` HTTP error code or network connection problems occurred. Retries are attempted after a delay.

## Limits

### Billing

Number of forms is limited by the number of properties included in your plan. Form submissions are not limited themselves, but the number of captcha property requests is limited (again, by your plan). Forms submissions without a valid captcha solution are rejected.

### Technical

The only accepted inbound form type is `application/x-www-form-urlencoded` (`multipart/form-data` or _any_ other forms are not accepted).

Form size is currently limited to `1 MB` max and will likely be reduced in future.

The only HTTP method available for inbound requests is `POST`.

## Privacy

Form submissions are not persisted in **any** storage, not logged, and are available on our servers only in transit. You have an option to sign the [DPA](https://privatecaptcha.com/legal/dpa).