# Magento 2

This is a **all-in-one** plugin for Magento 2 ("Adobe Commerce") that allows you to configure _client-side_ captcha widget and _server-side_ verification.

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-magento2" title="GitHub repository" icon="github" >}}
  {{< card link="https://packagist.org/packages/private-captcha/magento2" title="Packagist package" icon="cube" >}}
{{< /cards >}}

## Features

- **Form Protection**: most standard store forms (see [below](#supported-forms))
- **Flexible Configuration**: Theme, language, start mode, and custom styling options
- **EU Compliance**: Support for EU-only endpoints and custom domains

## Step-by-step setup guide

{{% steps %}}

### Create a new property in Private Captcha portal

Go to [Private Captcha Portal](https://portal.{{< domain >}}) and click _"Add new property"_ button.

![Add new](/images/integrations/add-new-property.png)

Enter name and domain of your Magento website e.g. `mydomain.com` and _"My Magento store"_.

> [!WARNING]
> Domain of the property should **exactly** match your Magento website domain.

![Enter name and domain](/images/integrations/new-magento-site.png)

### Note Sitekey of the property

Open _"Integrations"_ tab and note the **Sitekey** of the property you just created. You will need it for Magento plugin configuration.

![Enter name and domain](/images/integrations/property-sitekey.png)

### Create a new API key

Go to [API key settings](https://portal.{{< domain >}}/settings?tab=apikeys) and click _"Create new key"_. Give it some meaningful name, like _"Magento API key"_ and select the scope `Captcha verification`.

![Create a new API key](/images/integrations/new-magento-api-key.png "Make sure to select scope 'Captcha verification'")

Copy API key value to your password manager to temporarily save it (note the expiration time you selected when creating above).

![Copy API key value](/images/integrations/copy-api-key.png)

### Install Private Captcha plugin in the Magento project

```bash
composer require private-captcha/magento2
bin/magento module:enable PrivateCaptcha_PrivateCaptcha
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f en_US
bin/magento cache:flush
```

### Configure Sitekey and API key

Open _"Stores -> Configuration -> Security"_ and in the Private captcha section, configure the plugin using values, that you created previously in the Private Captcha portal:

![Configure plugins](/images/integrations/magento-plugin-settings.png)

Notably, put created API key into a required field _"API Key"_ and property sitekey into a required field _"Site Key"_.

Click **"Save Changes"** button below and your configuration will be verified.

### Test integration

Just for test, enable "Customer Login" form integration.

![Login form setting](/images/integrations/magento-enable-customer-login.png)

Now, open login page for your store (e.g. in Private browser tab):

![Login form](/images/integrations/magento-customer-login-form.png)

{{% /steps %}}

## Supported Forms

- Customer Login
- Registration
- Forgot Password
- Contact
- Product Review
- Send to Friend
- Wishlist Share
- Orders & Returns

## Troubleshooting

> [!WARNING]
> Make sure to **exclude** Private Captcha script from any caching plugins you might be using. Only load script from `cdn.privatecaptcha.com`.

**Form integration is enabled, but captcha does not load.**

Possible reasons:

- Domain name of your Magento 2 store does not equal exactly to the domain name of the property in Private Captcha portal
- If you are testing locally, you need to enable "Allow localhost" in [Property settings]({{< relref "/docs/reference/property-settings.md" >}})

## Requirements

- Magento / Adobe Commerce 2.4.x
- PHP 8.1+
- [Private Captcha account](https://portal.{{< domain >}}/signup)
