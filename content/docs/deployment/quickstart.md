# Quick start

## 1. Clone the self-hosting repo

[Self-hosting repository](https://github.com/PrivateCaptcha/self-hosting) contains a Docker-based quickstart template.

```bash
git clone https://github.com/PrivateCaptcha/self-hosting.git private-captcha
cd private-captcha
```

## 2. Create `.env` file

```bash
cp .env.example .env
```

Some notes on environment variables:

- `PC_USER_FINGERPRINT_KEY` you can generate using `openssl rand -hex 64`
- `PC_ADMIN_EMAIL` will be used to create actual admin account (see note for local use below)

You can find full documentation on environment variables [here]({{< relref "/docs/deployment/configuration.md" >}}).

{{% details title="Tips for local use" closed="false" %}}

To run Private Captcha only locally, use `privatecaptcha.local:8080` instead of `yourdomain.com`. To make it work, you need to add a few lines to `/etc/hosts` file:

```
127.0.0.1       portal.privatecaptcha.local
127.0.0.1       api.privatecaptcha.local
127.0.0.1       cdn.privatecaptcha.local
```

> NOTE: email with `.local` domain is **not** a valid RFC-5322 address, so for 2FA code (required for login) you will need to find "two factor code" from docker logs manually

{{% /details %}}

## 3. (optional) Expose port

If you want to use use Docker networking directly (which is not recommended) instead of reverse proxy like Nginx or Caddy, you can create a `compose.override.yml` file like this:

```yaml
services:
  privatecaptcha:
    ports:
      - 8080:8080
```

## 4. Navigate to the Portal

Now you can open `$PC_PORTAL_BASE_URL` (e.g. `portal.yourdomain.com` or `http://portal.privatecaptcha.local`) in browser and log in.