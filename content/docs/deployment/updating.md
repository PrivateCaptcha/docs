---
title: "Updating"
date: 2025-11-13T11:58:19+02:00
---

## Generic instructions

{{< callout >}}
Backward compatibility is kept on the level of public APIs of Private Captcha, not service configuration itself. It is your responsibility to check for any and all changes before applying updates.
{{< /callout >}}

{{< callout type="info" >}}
It is **not** recommended to use something like a [Watchtower](https://github.com/containrrr/watchtower) or any other solution that automatically bumps tag versions.
{{< /callout >}}

{{< callout type="warning" >}}
  Before each update make sure to backup your data in case you're using any backup solutions.
{{< /callout >}}

For this guide it is assumed you are using the [self-hosting repository](https://github.com/PrivateCaptcha/self-hosting) setup.

0. (optional) Make backups if you're using any backup solution.
1. Navigate to the repo
    ```bash
    cd /path/to/the/self-hosting/repo/checkout
    ```
2. Pull latest changes
    ```bash
    git pull
    ```
3. Pull new images
    ```bash
    docker compose pull
    ```
4. Check which version is currently running
    ```bash
    docker compose ps
    ```
5. Perform all instructions below for each version between running version and the one you're about to upgrade to.
    {{< callout >}}Changes in files to look out for: `compose.yml`, `.env.example` {{< /callout >}}
6. Recreate containers with new images
    ```bash
    docker compose up -d
    ```

## Notable deployment changes

### v0.0.26

- widget has been updated, purge your CDN cache
- if you're monitoring Private Captcha with Prometheus-compatible agent, a new metric has been added: `fine_api_error_total` with dimensions `code`, `method`, `service`, `handler`. This is the metric for [platform API]({{< relref "docs/reference/platform-api.md" >}}) errors.

### v0.0.24

- widget has been updated, purge your CDN cache
- a new [environment variable]({{< relref "docs/deployment/configuration.md" >}}) is available for Enterprise edition: `EE_AUDIT_LOGS_DAYS` (retention period in days for audit logs)

### v0.0.23

- a new [environment variable]({{< relref "docs/deployment/configuration.md" >}}) _can_ be added: `PC_COUNTRY_CODE_HEADER` (a header from CDN provider with 2-letter country code). Usual suspects are: Bunny CDN (`CDN-RequestCountryCode`), CloudFlare (`CF-IPCountry`), AWS CloudFront (`CloudFront-Viewer-Country`)

### v0.0.22

- a new *highly recommended* (albeit non-mandatory) [environment variable]({{< relref "docs/deployment/configuration.md" >}}) _has_ to be added: `PC_ID_HASH_SALT` (used to obscure internal IDs in URLs)
- in case you're monitoring Private Captcha with Prometheus-compatible agent, a new metric has been added: `fine_http_error_total` with dimensions `code`, `method`, `service`, `handler`. This is the metric for "soft" internal errors happening in Portal.

### v0.0.21

- widget has been updated, purge your CDN cache


### v0.0.16

- a new mandatory [environment variable]({{< relref "docs/deployment/configuration.md" >}}) has to be added: `PC_XSRF_KEY` (which does what it says on the box)