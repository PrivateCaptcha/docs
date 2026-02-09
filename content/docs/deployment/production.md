---
title: "Production use"
date: 2025-10-23T11:27:25+03:00
---

## Updates

{{< callout type="warning" >}}
  Before bumping docker tag you need to read [upgrade instructions]({{< relref "docs/deployment/updating.md" >}}) for each version.
{{< /callout >}}

You should monitor updates (new docker tags) and update frequently. Updates are meant to be backwards compatible and bring fixes, including security. There currently is no built-in update notification mechanism.

When you update Private Captcha you also need to purge CDN/proxy caches.

Always check [upgrade instructions]({{< relref "docs/deployment/updating.md" >}}) **before** applying updates.

## CDN integration

{{< callout >}}
All responses from Private Captcha server already contain correct `Cache-Control` headers so your only job is to make sure CDN/proxy respects them and does not override them.
{{< /callout >}}

Private Captcha installation expects to be running on 3 subdomains (`cdn.`, `api.` and `portal.`) and it is meant to be behind a reverse proxy and/or CDN (in other words, not directly connected to the internet). It is expected to cache captcha script, portal assets (e.g. for emails) and test puzzle API requests on CDN of your choice.

You can find [an example for Bunny CDN]({{< relref "docs/deployment/bunny-cdn.md" >}}) in the docs.

## Security

{{< callout type="warning" >}}
If you're running Private Captcha in production, security is completely **your responsibility**. It is a very large topic and completely outside the scope of this note.
{{< /callout >}}

Some **very basic** advice, specific to Private Captcha server itself:
- [update]({{< relref "docs/deployment/updating.md" >}}) Private Captcha server frequently
- make sure server is behind CDN/proxy and is not directly connected to the internet
- do not expose public port from docker container, keep it listening on localhost and use `Nginx/Caddy` (Docker has it's own security issues)
- do not enable registration if you're the only admin/user (`PC_REGISTRATION_ALLOWED` is empty/unset by default)
- you can configure CDN/reverse proxy rate limits accordingly to your use-case (that is, _in addition_ to rate limit configuration of Private Captcha server itself)
- correct rate limiting of Private Captcha server itself is _heavily_ dependent on correct configuration of `PC_RATE_LIMIT_HEADER` environment variable (which value is expected to come from proxy/CDN)
- _if_ you run a larger installation with separate DB and server nodes, you need to secure network between them (docker compose single node setup does not use encryption for Postgres or ClickHouse connections)
- for single-node installations, if you can, use [Podman](https://podman.io/) or rootless Docker

## Monitoring

Prometheus metrics (`/metrics` endpoint) are available on `$PC_LOCAL_ADDRESS` address (if you set `PC_LOCAL_ADDRESS` environment variable). Server exposes "standard" Go metrics and ["four golden signals"](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals) metrics as well as few custom platform and business logic-specific metrics.

Additionally there're `/live` and `/ready` endpoints available on `$PC_LOCAL_ADDRESS` address that can be used if you run Private Captcha on Kubernetes cluster.

## Backups

While it is outside of the scope of this note, there're many solutions that add a docker container to the compose stack to backup databases to S3-compatible storage. In order to add them, you can use `compose.override.yml` file.

## Licensed use

### Community edition

You need to add an additional environment variable `CE_LICENSE_KEY` via `compose.override.yml` file (which you should put in the `.env` file).

```yaml
services:
  privatecaptcha:
    environment:
      - CE_LICENSE_KEY=${CE_LICENSE_KEY}
```

### Enterprise edition

There are a few changes you will need to make using a `compose.override.yml` file, namely replace `privatecaptcha` image to `privatecaptcha-ee` and set an additional environment variable `EE_LICENSE_KEY` (which you should put in the `.env` file).

```yaml
services:
  privatecaptcha:
    image: ghcr.io/privatecaptcha/privatecaptcha-ee:latest
    environment:
      - EE_LICENSE_KEY=${EE_LICENSE_KEY}
  migration:
    image: ghcr.io/privatecaptcha/privatecaptcha-ee:latest
```

## Server's command-line options

```
  -certfile string
    	certificate PEM file (e.g. cert.pem)
  -env string
    	Path to .env file, 'stdin' or empty
  -keyfile string
    	key PEM file (e.g. key.pem)
  -migrate-hash string
    	Target migration version (git commit)
  -mode string
    	migrate | server | auto
  -version
    	Print version and exit
```

> NOTE: Mode `auto` migrates databases and then runs server - usually done separately - so that you don't need a separate migration container. This is **not** recommended for production use as by default Private Captcha uses different database permissions for migrations and normal use. If you use `auto` you might also need to specify `-migrate-hash ignore` at the same time.

### HTTPS

As you can see, it's possible to use `-certifle` and `-keyfile` to force `HTTPS` (by default server handles plain `HTTP` and expects an external proxy to handle TLS/SSL termination).

### Migrations

{{< callout type="info" >}}
If you use docker compose based setup, you can skip this. Below information is only relevant for "large" _custom_ installations.
{{< /callout >}}

While in docker compose single-node setup migrations have been taken care of, if you run larger installation of Private Captcha with separate DB and server nodes, you might want to run migrations manually.

To run migration manually it's required to pass `-mode migrate` and `-migrate-hash` (for example with value `$(git rev-list -1 HEAD)`) to server binary. If you also use `-env stdin` you can pipe secrets into it.

```bash
cat secrets.env | bin/server -mode migrate -migrate-hash=$(git rev-list -1 HEAD) -env stdin
```

It is possible to specify `-migrate-hash ignore` to disable this "recency" check (which is, of course, discouraged).