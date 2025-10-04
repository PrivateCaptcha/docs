---
title: Configuration
type: docs
#prev: widget-options
#next: verify-api
---

## Environmental variables

### Required

Variable | Example | Description
--- | --- | ---
`STAGE` | `prod` | Stage is used for building widget js code (e.g. minification) and for separation in logging.
`PC_PORTAL_BASE_URL` | `portal.yourdomain.com` | (Sub)domain where you will host PrivateCaptcha portal.
`PC_API_BASE_URL` | `api.yourdomain.com` | (Sub)domain where CAPTCHA API (puzzles, verification etc.) will be hosted.
`PC_CDN_BASE_URL` | `cdn.yourdomain.com` | (Sub)domain where CDN assets will be hosted (e.g., client-side widget package, pictures, email assets etc.).
`PC_ADMIN_EMAIL` | `admin@yourdomain.com` | Email that will be used for admin user to login. Must be valid and functioning.
`PC_EMAIL_FROM` | `no-reply@yourdomain.com` | Sender address for various transactional emails (2FA auth, welcome email etc.)
`PC_POSTGRES` | `postgres://username:pass@postgres:5432/privatecaptcha` | [Postgres connection string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) for backend DB. You can also specify separate values (see note below).
`PC_CLICKHOUSE_HOST` | `clickhouse` | Host (or IP address) where ClickHouse DB is running.
`PC_CLICKHOUSE_DB` | `privatecaptcha` | Database for connecting to ClickHouse.
`PC_CLICKHOUSE_USER` | `captcha` | Username for connecting to `PC_CLICKHOUSE_DB`.
`PC_CLICKHOUSE_PASSWORD` | `qwerty12345` | Password for `PC_CLICKHOUSE_USER`.
`PC_USER_FINGERPRINT_KEY` | `abcdef...` | HEX-encoded `64`-character string, used as IV value for hashing user fingerprints.
`PC_API_SALT` | `asdf...` | String used as salt for creating puzzle signatures.
`PC_XSRF_KEY` | `jkl;...` | String used as XSRF key for signing tokens
`SMTP_ENDPOINT` | `smtp://your.provider.com:587` | Endpoint used for sending transactional email.
`SMTP_USERNAME` | `foobar` | Username for `SMTP_ENDPOINT`.
`SMTP_PASSWORD` | `qwerty12345` | Password for `SMTP_USERNAME`.

> [!NOTE]
Instead of `PC_POSTGRES` as a connection string, you **can** specify `PC_POSTGRES_HOST`, `PC_POSTGRES_DB`, `PC_POSTGRES_USER`, `PC_POSTGRES_PASSWORD` separately.

### Optional

Variable | Example | Description
--- | --- | ---
`PC_HOST` | `localhost` | Host where to listen for HTTP connections.
`PC_PORT` | `8080` | Port where to listen for HTTP connections.
`PC_LOCAL_ADDRESS` | `localhost:9090` | Local "admin" endpoint that hosts Prometheus metrics, manual maintenance jobs triggers and kubernetes liveness/readiness probes. Does not have any auth and *must not* be exposed publicly.
`PC_RATE_LIMIT_HEADER` | `X-Real-Ip` | HTTP header which will contain IP address of the connecting user. Is expected to come from CDN or proxy (e.g., nginx, caddy). If empty, righmost non-private address of `X-Forwarded-For` will be used.
`PC_RATE_LIMIT_RPS` | `1.0` | Leak rate per second (float) of default API rate limiter.
`PC_RATE_LIMIT_BURST` | `20` | Burst of default API rate limiter.
`PC_CLICKHOUSE_ADMIN` | `captcha_admin` | Separate username for ClickHouse to run migrations with. If empty, `PC_CLICKHOUSE_USER` will be used.
`PC_CLICKHOUSE_ADMIN_PASSWORD` | `qwerty12345` | Password for `PC_CLICKHOUSE_ADMIN`.
`PC_POSTGRES_ADMIN` | `captcha_admin` | Separate username for Postgres to run migrations with. If empty, `PC_POSTGRES_USER` (or `PC_POSTGRES`) will be used.
`PC_POSTGRES_ADMIN_PASSWORD` | `qwerty12345` | Password for `PC_POSTGRES_ADMIN`.
`PC_MAINTENANCE_MODE` | `true` | Boolean (`1`, `y`, `true`) value if server is in maintenance mode, during which communications with databases are offline, but APIs (and cache) are functional.
`PC_REGISTRATION_ALLOWED` | `true` | Boolean (`1`, `y`, `true`) value if this instance of PrivateCaptcha has registration page open.
`PC_HEALTHCHECK_INTERVAL` | `60` | Integer value that defines how frequently in seconds we perform internal health check of DB instances and http server. Defaults to `5` in prod and `60` in dev.
`PC_VERBOSE` | `true` | Boolean (`1`, `y`, `true`) to indicate verbose logging (trace level).

> [!NOTE]
"Default" rate limiter means the one for public APIs (`/puzzle`, `/siteverify` and some others). Various other APIs have pre-configured hardcoded limits, compiled in.

> [!WARNING]
> It's not recommended to modify leak rate configuration unless you really know what you're doing.