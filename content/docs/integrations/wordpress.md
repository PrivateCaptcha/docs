---
title: "WordPress"
date: 2025-09-18T09:15:02+03:00
---

This is a **all-in-one** plugin for WordPress that allows you to configure _client-side_ captcha widget and _server-side_ verification.


{{< cards >}}
  {{< card link="https://wordpress.org/plugins/private-captcha/" title="WordPress plugin" icon="wordpress" >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-wordpress" title="GitHub repository" icon="github" >}}
{{< /cards >}}

## Features

- **Form Protection**: Login, registration, password reset, and comment forms
- **Flexible Configuration**: Theme, language, start mode, and custom styling options
- **EU Compliance**: Support for EU-only endpoints and custom domains
- **WP-CLI Commands**: Emergency management tools for API key updates and login bypass

## Step-by-step setup guide

{{% steps %}}

### Create a new property in Private Captcha portal

Go to [Private Captcha Portal](https://portal.privatecaptcha.com) and click _"Add new property"_ button.

![Add new](/images/integrations/add-new-property.png)

Enter name and domain of your WordPress website e.g. `mydomain.com` and _"My WordPress website"_.

> [!WARNING]
> Domain of the property should **exactly** match your WordPress website domain.

![Enter name and domain](/images/integrations/new-wordpress-site.png)

### Note Sitekey of the property

Open _"Integrations"_ tab and note the **Sitekey** of the property you just created. You will need it for WordPress plugin configuration.

![Enter name and domain](/images/integrations/property-sitekey.png)

### Create a new API key

Go to [API key settings](https://portal.privatecaptcha.com/settings?tab=apikeys) and click _"Create new key"_. Give it some meaningful name, like _"WordPress API key"_

![Create a new API key](/images/integrations/new-api-key.png)

Copy API key value to your password manager to temporarily save it (note the expiration time you selected when creating above).

![Copy API key value](/images/integrations/copy-api-key.png)

### Install Private Captcha plugin in WordPress

Click one of the two "Add plugin" buttons in your WordPress installation, search for `Private Captcha` and install the plugin:

![Install plugin button](/images/integrations/install-wordpress-plugin.png)

After the installation, **Activate** the plugin:

![Activate installed plugin](/images/integrations/activate-wordpress-plugin.png)

### Configure Sitekey and API key

Using values, that you created previously in the Private Captcha portal, configure the plugin:

![Configure plugins](/images/integrations/wordpress-plugin-settings.png)

Notably, put created API key into a required field _"API Key"_ and property sitekey into a required field _"Site Key"_.

Click **"Save Changes"** button below and your configuration will be verified.

### Test integration

Just for test, enable login form integration.

![Login form setting](/images/integrations/wordpress-enable-login-form.png)

Now, open login dialog for your WordPress installation (e.g. in Private browser tab):

![Login form](/images/integrations/wordpress-login-form.png)

{{% /steps %}}

## Supported Forms

- WordPress Login Form
- WordPress Registration Form
- WordPress Password Reset Form
- WordPress Comment Forms (logged-in and guest users)
- WPForms
- Contact Form 7 (use `[privatecaptcha]` tag)
- _More forms support (including popular plugins) are currently **in progress**_

## WP-CLI Commands

Emergency management when locked out:

```bash
# Update API key
wp private-captcha update-api-key "your-new-api-key"

# Disable login captcha (emergency use)
wp private-captcha disable-login
```

## Troubleshooting

**Form integration is enabled, but captcha does not load.**

Possible reasons:

- Domain name of your WordPress site does not equal exactly to the domain name of the property in Private Captcha portal
- If you are testing locally, you need to enable "Allow localhost" in [Property settings]({{< relref "/docs/reference/property-settings.md" >}})

## Requirements

- WordPress 5.6+
- PHP 8.2+
- [Private Captcha account](https://portal.privatecaptcha.com/signup)