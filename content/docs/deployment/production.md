---
title: "Production use"
date: 2025-10-23T11:27:25+03:00
---

## Updates

You should monitor updates (new docker tags) and update frequently. Updates are meant to be backwards compatible and bring fixes, including security. There currently is no built-in update notification mechanism.

## CDN integration

{{< callout >}}
All responses from Private Captcha server already contain correct `Cache-Control` headers so your only job is to make sure CDN/proxy respects them and does not override them.
{{< /callout >}}

Private Captcha installation expects to be running on 3 subdomains (`cdn.`, `api.` and `portal.`) and it is meant to be behind a reverse proxy and/or CDN (in other words, not directly connected to the internet). It is expected to cache captcha script, portal assets (e.g. for emails) and test puzzle API requests on CDN of your choice.

## Security

Overall, if you're running Private Captcha in production, security is completely your responsibility. It is a very large topic and completely outside the scope of this note.

Some _very basic_ advice, specific to Private Captcha server itself:
- update Private Captcha server frequently
- make sure server is behind CDN/proxy and is not directly connected to the internet
- do not expose public port from docker container, keep it listening on localhost and use `Nginx/Caddy` (Docker has it's own security issues)
- do not enable registration if you're the only admin/user (`PC_REGISTRATION_ALLOWED` is empty/unset by default)
- you can configure CDN/reverse proxy rate limits accordingly to your use-case (that is, _in addition_ to rate limit configuration of Private Captcha server itself)
- correct rate limiting of Private Captcha server itself is _heavily_ dependent on correct configuration of `PC_RATE_LIMIT_HEADER` environment variable (which value is expected to come from proxy/CDN)
- if you run a larger installation with separate DB and server nodes, you need to secure network between them (docker compose single node setup does not use encryption for Postgres or ClickHouse connections)
- for single-node installations, if you can, use Podman or rootless Docker

## Monitoring

Prometheus metrics (`/metrics` endpoint) are available on `$PC_LOCAL_ADDRESS` address (if you set `PC_LOCAL_ADDRESS` environment variable). Server exposes "standard" Go metrics and ["four golden signals"](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals) metrics as well as few custom platform and business logic-specific metrics.

Additionally there're `/live` and `/ready` endpoints available on `$PC_LOCAL_ADDRESS` address that can be used if you run Private Captcha on Kubernetes cluster.

## Backups

While it is outside of the scope of this note, there're many solutions that add a docker container to the compose stack to backup databases to S3-compatible storage. In order to add them, you can use `compose.override.yml` file.

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
    	migrate | server
  -version
    	Print version and exit
```

### HTTPS

As you can see, it's possible to use `-certifle` and `-keyfile` to force `HTTPS` (by default server handles plain `HTTP` and expects an external proxy to handle TLS/SSL termination)

### Migrations

> Docker compose setup does **not** require special handling. Below is only relevant for "large" custom installations.

While in docker compose single-node setup migrations have been taken care of, if you run larger installation of Private Captcha with separate DB and server nodes, you might want to run migrations manually.

To run migration manually it's required to pass `-mode migrate` and `-migrate-hash` (for example with value `$(git rev-list -1 HEAD)`) to server binary. If you also use `-env stdin` you can pipe secrets into it.

```bash
cat secrets.env | bin/server -mode migrate -migrate-hash=$(git rev-list -1 HEAD)
```

## Enterprise edition

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