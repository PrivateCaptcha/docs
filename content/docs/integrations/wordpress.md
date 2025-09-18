---
title: "WordPress"
date: 2025-09-18T09:15:02+03:00
---

This is a **all-in-one** plugin for WordPress that allows you to configure _client-side_ captcha widget and _server-side_ verification.

[GitHub repository](https://github.com/PrivateCaptcha/private-captcha-wordpress)

## Features

- **Form Protection**: Login, registration, password reset, and comment forms
- **Flexible Configuration**: Theme, language, start mode, and custom styling options
- **EU Compliance**: Support for EU-only endpoints and custom domains
- **WP-CLI Commands**: Emergency management tools for API key updates and login bypass

## Installation

> [!NOTE]
> Official plugin for WordPress plugin directory is currently under review. For the time being, you need to upload plugin file manually to your WordPress to use it. [Download plugin here](https://github.com/PrivateCaptcha/private-captcha-wordpress/releases/latest).

1. Install and activate the plugin
2. Go to **Settings → Private Captcha**
3. Add your **API Key** and **Site Key** from [Private Captcha Portal](https://portal.privatecaptcha.com)
4. Enable desired form integrations
5. Customize widget appearance as needed

## Supported Forms

- WordPress Login Form
- WordPress Registration Form
- WordPress Password Reset Form
- WordPress Comment Forms (logged-in and guest users)

## WP-CLI Commands

Emergency management when locked out:

```bash
# Update API key
wp private-captcha update-api-key "your-new-api-key"

# Disable login captcha (emergency use)
wp private-captcha disable-login
```

## Requirements

- WordPress 5.6+
- PHP 8.2+
- [Private Captcha account](https://portal.privatecaptcha.com/signup)