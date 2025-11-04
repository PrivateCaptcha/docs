---
title: Getting started
type: docs
weight: 1
---

Before integrating Private Captcha into your application, you need to complete a few setup steps in the [Private Captcha Portal](https://portal.{{< domain >}}).

## Prerequisites

- A Private Captcha account ([sign up](https://portal.{{< domain >}}/signup) if you don't have one)

## Setup steps

{{% steps %}}

### Create a new property in Private Captcha portal

A property represents a single CAPTCHA widget that can be used on a website, web page, or form. Each property is identified by a unique **Sitekey**.

Go to [Private Captcha Portal](https://portal.{{< domain >}}) and click **"Add new property"**.

![Add new property](/images/integrations/add-new-property.png)

Enter a name for your property (e.g., _"My Website"_) and the domain where you'll use the CAPTCHA (e.g., `example.com`).

> [!WARNING]
> The domain should **exactly** match your website domain. For local development, you'll need to enable "Allow localhost" in [property settings]({{< relref "/docs/reference/property-settings.md#localhost" >}}) later.

![Enter name and domain](/images/integrations/new-wordpress-site.png)

Click **"Create"** to complete property creation.

### Note Sitekey of the property

After creating the property, you'll be presented with an integration snippet. The _Sitekey_ is visible in the widget configuration.

Alternatively, you can find it later by opening your property in the portal, going to the **"Integrations"** tab, and noting the **Sitekey** value.

![Property sitekey](/images/integrations/property-sitekey.png)

The _Sitekey_ looks like `aaaaaaaabbbbccccddddeeeeeeeeeeee` and is used for the client-side widget initialization.

### Create a new API key

API keys are used for server-side verification of CAPTCHA solutions. Each API key has an expiration date and can be revoked at any time.

Go to [API key settings](https://portal.{{< domain >}}/settings?tab=apikeys) and click **"Create new key"**. Give it a meaningful name (e.g., "Production API key", "WordPress API key").

![Create a new API key](/images/integrations/new-api-key.png)

Set an expiration date and click **"Create"**.

### Copy and store your API key

After creation, the API key value will be displayed. **Copy it immediately** and store it securely (e.g., in a password manager).

![Copy API key value](/images/integrations/copy-api-key.png)

> [!WARNING]
> The API key value is only shown once. If you lose it, you'll need to create a new API key. Store it securely and never commit it to version control.

{{% /steps %}}

## Next Steps

Now that you have a property with a _Sitekey_ (for client-side widget) and an API key (for server-side verification), you can proceed to:

{{< cards >}}
  {{< card link="/docs/tutorials/complete-example" title="End-to-end example"
  subtitle="Follow along to see a complete integration example"
  icon="code" >}}
  {{< card link="/docs/integrations/go" title="Integrations"  
  subtitle="Use one of the SDKs for server-side verification"
   >}}
  {{< card link="/docs/tutorials/widget-customization" title="Widget customization"
  subtitle="Integrate the widget on your frontend"
  icon="light-bulb" >}}
{{< /cards >}}
