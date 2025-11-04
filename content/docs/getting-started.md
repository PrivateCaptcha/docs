---
title: Getting started
type: docs
weight: 1
---

Before integrating Private Captcha into your application, you need to complete a few setup steps in the [Private Captcha Portal](https://portal.privatecaptcha.com).

## Prerequisites

- A Private Captcha account ([sign up](https://portal.privatecaptcha.com/signup) if you don't have one)

## Setup Steps

{{% steps %}}

### Create a new property in Private Captcha portal

A property represents a single CAPTCHA widget that can be used on a website, web page, or form. Each property is identified by a unique **Site Key**.

Go to [Private Captcha Portal](https://portal.privatecaptcha.com) and click **"Add new property"**.

![Add new property](/images/integrations/add-new-property.png)

Enter a name for your property (e.g., "My Website") and the domain where you'll use the CAPTCHA (e.g., `example.com`).

> [!WARNING]
> The domain should **exactly** match your website domain. For local development, you'll need to enable "Allow localhost" in property settings later.

![Enter name and domain](/images/integrations/new-wordpress-site.png)

Click **"Create"** to complete property creation.

### Note Site Key of the property

After creating the property, you'll be presented with an integration snippet. The Site Key is visible in the widget configuration.

Alternatively, you can find it later by opening your property in the portal, going to the **"Integrations"** tab, and noting the **Site Key** value.

![Property sitekey](/images/integrations/property-sitekey.png)

The Site Key looks like `aaaaaaaabbbbccccddddeeeeeeeeeeee` and is used for client-side widget initialization.

### Create a new API key

API keys are used for server-side verification of CAPTCHA solutions. Each API key can have an expiration date and can be revoked at any time.

Go to [API key settings](https://portal.privatecaptcha.com/settings?tab=apikeys) and click **"Create new key"**. Give it a meaningful name (e.g., "Production API key", "WordPress API key").

![Create a new API key](/images/integrations/new-api-key.png)

Optionally set an expiration date and click **"Create"**.

### Copy and store your API key

After creation, the API key value will be displayed. **Copy it immediately** and store it securely (e.g., in a password manager).

![Copy API key value](/images/integrations/copy-api-key.png)

> [!WARNING]
> The API key value is only shown once. If you lose it, you'll need to create a new API key. Store it securely and never commit it to version control.

{{% /steps %}}

## Next Steps

Now that you have a property with a Site Key (for client-side widget) and an API key (for server-side verification)

You can proceed to:


{{< cards >}}
  {{< card link="/docs/tutorials/complete-example" title="Tutorial"
  subtitle="Follow along to see a complete example"
  icon="code" >}}
  {{< card link="/docs/integrations/go" title="Integrations"  
  subtitle="Use one of the SDKs for server-side verification"
   >}}
  {{< card link="/docs/tutorials/widget-customization" title="Widget customization"
  subtitle="Integrate the widget on your frontend"
  icon="light-bulb" >}}
{{< /cards >}}
