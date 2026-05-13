# 
# Quick start

## Prerequisites

- Docker [installed](https://docs.docker.com/engine/install/)
- (optional) Reverse proxy like Caddy or Nginx
- Domain name `yourdomain.com` (for local-only installs, use `privatecaptcha.local`)
- Transactional email provider with SMTP credentials (required for production)
- At least 2GB of RAM

## 1. Clone the self-hosting repo

[Self-hosting repository](https://github.com/PrivateCaptcha/self-hosting) contains a Docker-based quickstart template.

```bash
git clone https://github.com/PrivateCaptcha/self-hosting.git private-captcha
cd private-captcha
```

## 2. Create `.env` file

Copy sample environment variables and set all required ones.

```bash
cp .env.prod.example .env
$EDITOR .env
```

Some notes on environment variables:

- [In production]({{< relref "/docs/deployment/production.md" >}}) Private Captcha assumes to run on 3 subdomains: `api.`, `cdn.` and `portal.` for configuration flexibility (this is not required, but recommended).
- `PC_USER_FINGERPRINT_KEY` you can generate using `openssl rand -hex 64`
- `PC_ADMIN_EMAIL` will be used to create an actual admin account (see note for local use below)
- `PC_RATE_LIMIT_HEADER` should be the header containing an actual client IP (comes from your CDN or reverse proxy, for example `X-Real-Ip`)

You can find full documentation on these and other _required_ environment variables [here]({{< relref "/docs/deployment/configuration.md" >}}).

{{% details title="Tips for local use" closed="true" %}}

To run Private Captcha _only_ locally, use `.env.local.example` instead of `.env.prod.example`. After startup, open `http://localhost:8080/portal` URL in browser and log in with `admin@privatecaptcha.local` email.

> NOTE: email with `.local` domain is **not** a valid RFC-5322 address, so for 2FA code (required for login) cannot be sent and you will need to find "two factor code" from docker logs manually

The difference between prod and local setup is mostly that prod is designed to run on 3 separate subdomains (`api.`, `cdn.` and `portal.`) for flexibility. You can easily emulate this locally too if you add a few lines to `/etc/hosts` file:

```
127.0.0.1       portal.privatecaptcha.local
127.0.0.1       api.privatecaptcha.local
127.0.0.1       cdn.privatecaptcha.local
```

Another point is that for local-only use you may throw away the `migration` service in `compose.yml` and merge the following to `compose.override.yml`:

```yaml
services:
  privatecaptcha:
    command:
      /app/server -mode auto
```

Mode `auto` always runs migrations before serving traffic.

{{% /details %}}

{{% details title="(optional) Expose public port" closed="true" %}}

By default Private Captcha server executable is listening on `http://localhost:8080`. If you want to use Docker networking [for production]({{< relref "/docs/deployment/production.md" >}}) directly (which is **not** recommended) instead of reverse proxy like Nginx or Caddy, you can create a `compose.override.yml` file like this:

```yaml
services:
  privatecaptcha:
    ports:
      - 8080:8080
```

{{% /details %}}

## 3. Run the stack

```bash
docker compose up
```

## 4. Navigate to the Portal

Now you can open `$PC_PORTAL_BASE_URL` (e.g. `portal.yourdomain.com` or http://portal.privatecaptcha.local:8080) in browser and log in.

> NOTE: For local-only use, when asked for a verification code, you might need to find it in the logs of `privatecaptcha` container. Search for "two factor code".

## Next steps

How to go live, check this:

{{< cards >}}
  {{< card link="/docs/deployment/production" title="Production use"
  subtitle="Deploying to production requires extra steps"
  icon="briefcase" >}}
  {{< card link="/docs/deployment/updating" title="Updating"  
  subtitle="Read per-version instructions for updates"
  icon="refresh" >}}
  {{< card link="/docs/reference/security" title="Security"
  subtitle="Security best-practices when using Private Captcha"
  icon="shield-exclamation" >}}
{{< /cards >}}

