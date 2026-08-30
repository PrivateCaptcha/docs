---
title: "TYPO3"
date: 2026-08-30T19:33:00+03:00
---

This is a **all-in-one** plugin for TYPO3 that allows you to configure _client-side_ captcha widget and _server-side_ verification.

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-typo3" title="GitHub repository" icon="github" >}}
  {{< card link="https://packagist.org/packages/private-captcha/typo3" title="Packagist package" icon="cube" >}}
{{< /cards >}}

## Features

Supported forms:

- TYPO3 Form Framework forms
- Powermail forms
- frontend login, and the native backend login

Admin panel is available in English, German and French.

## Installation

Install the extension from Packagist in the root of a Composer-based TYPO3 project:

```bash
composer require private-captcha/typo3
```

Apply TYPO3's database schema update after installation. The extension adds the `tx_privatecaptcha_formproof` table used for short-lived, single-use Form Framework and Powermail proofs. Use the database analyzer in **Admin Tools > Maintenance** or the equivalent schema-update step in your deployment workflow. See TYPO3's [database compare documentation](https://docs.typo3.org/m/typo3/reference-coreapi/main/en-us/ApiOverview/Database/DatabaseUpgrade/Index.html).

## Configuration

{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

1. Sign in as a TYPO3 administrator and open **Site > Private Captcha**.
2. Select a site, enter its API key and sitekey, choose integrations, and use **Save**.
3. Add the **Private Captcha** element to each Form Framework form that must be protected.
4. Install `typo3/cms-felogin` before enabling frontend-login protection.
5. Check the separate [Powermail part](#Powermail) before enabling Powermail.

### Environment API Keys

Use environment-backed secrets instead of committed site or extension configuration:

```text
PRIVATE_CAPTCHA_SITE_API_KEYS={"site-identifier":"site-api-key"}
PRIVATE_CAPTCHA_BACKEND_API_KEY=backend-api-key
```

`PRIVATE_CAPTCHA_SITE_API_KEYS` accepts an exact site-identifier map, up to 65,536 bytes and 1,024 entries. Environment keys override persisted keys, are not written back, and do not replace the required sitekey or other settings.

Changing a custom root domain requires a submitted API key and is blocked while an environment API-key override is active.

### Frontend Login

```bash
composer require typo3/cms-felogin
```

Enable **Frontend login** for the site. Password recovery and existing authenticated sessions are not challenged.

Custom felogin templates must render this before the submit control:

```html
{privateCaptchaMarkup -> f:format.raw()}
```

Authentication still requires CAPTCHA when markup is missing, which can lock users out. Custom authentication implementations are unsupported.

### Backend Login

Backend protection supports only TYPO3's native username/password provider. SSO, LDAP, and custom providers may be rejected unless they submit the same Private Captcha field.

### Powermail

{{< callout type="warning" >}}
Supported only on TYPO3 `^13.4` with Powermail `>=13.2,<14.0`. Other integrations remain available on TYPO3 14.
{{< /callout >}}

The adapter registers automatically when compatible Powermail is active.

The field appears only when protection is effective for the edited site. Powermail's built-in `captcha` and other spam protection remain unchanged.

To use:

- Enable **Powermail** (under _"Site > Private Captcha"_) and save configuration
- Add the distinct **Private Captcha** field to the Powermail form.


## Requirements

| Component | Supported versions |
|---|---|
| PHP | `^8.2` with `ext-intl` |
| TYPO3 | `^13.4` | `^14.0` |
| TYPO3 Form Framework | `^13.4` | ^14.0`, installed as a direct dependency |
| TYPO3 felogin | `^13.4` | `^14.0`, optional and required for frontend-login protection |
| Powermail | `>=13.2,<14.0`, optional and supported only on TYPO3 13.4 |

Powermail is not available on TYPO3 14 until a compatible Powermail release exists.

## Troubleshooting

### Lockout

If you enabled Private Captcha protection on admin settings and something went wrong (so you're now locked out), it's possible to fix it with cli.

```bash
vendor/bin/typo3 private-captcha:backend:status
vendor/bin/typo3 private-captcha:backend:disable
```

**Emergency Disable**

Set this for both web and CLI processes, then reload them:

```text
PRIVATE_CAPTCHA_DISABLE_BACKEND_LOGIN=true
```

Any non-empty value enables it except case-insensitive `0`, `false`, `no`, or `off`. Use it only for recovery.

### Widget is absent

- Check effective integration configuration and resolved credentials.
- Check required felogin or Powermail packages.
- Check browser network/CSP errors and TYPO3 configuration warnings.
- Custom felogin templates must render `{privateCaptchaMarkup -> f:format.raw()}`.

### Submit remains disabled

- Check that the provider script and extension JavaScript loaded without CSP or browser errors.
- Complete every widget in the form. Resets, errors, failed submissions, and back/forward-cache restoration clear solutions.

### Protected request always fails

- Check effective credentials and that the extension's widget field is submitted.
- Check provider connectivity and safe reason codes in TYPO3 logs.
- Do not reuse solutions; they are single-use.

### Powermail field is unavailable

Require TYPO3 13.4 and active Powermail `>=13.2,<14.0`, then successfully save effective Powermail site settings before reopening the field selector.
