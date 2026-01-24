# React
{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create a property]({{< relref "docs/reference/property-settings.md" >}}) in your organization and get it's _sitekey_.
{{< /callout >}}

> [!NOTE]
> You can use a "default way" of adding `<div class="private-captcha" ...></div>` element with `https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js` Javascript include. But it will not work well with server-side rendering (e.g. in Next.js).

This is a **client-side** SDK for React, which is an alternative to using a standard script directly.

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-react" title="GitHub repository" icon="github" >}}
  {{< card link="https://www.npmjs.com/package/@private-captcha/private-captcha-react" title="NPM package" icon="cube" >}}
{{< /cards >}}

## Installation

```bash
npm install @private-captcha/private-captcha-react
```

## Basic usage

```tsx
import React from 'react';
import { PrivateCaptcha } from '@private-captcha/private-captcha-react';

function MyForm() {
  const handleCaptchaFinished = (detail) => {
    console.log('Captcha solved!', detail.widget.solution());
    // Submit your form here or enable the submit button
  };

  return (
    <form>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />

      <PrivateCaptcha
        siteKey="your-site-key-here"
        theme="dark"
        onFinish={handleCaptchaFinished}
      />

      <button type="submit">Login</button>
    </form>
  );
}
```

## Props API

### Required props

| Prop | Type | Description |
|------|------|-------------|
| `siteKey` | `string` | Your Private Captcha site key |

### Optional props

Please refer to the [official widget options]({{< relref "/docs/reference/widget-options.md" >}}) documentation.

### Event handler props

All event handler functions receive a `detail` object with these properties:
- `detail.widget` - [captcha object]({{< relref "/docs/reference/captcha-object.md" >}})
- `detail.element` - The DOM element hosting the captcha

| Prop | Type | Description |
|------|------|-------------|
| `onInit` | `(detail) => void` | Called when captcha is initialized |
| `onStart` | `(detail) => void` | Called when solving starts |
| `onFinish` | `(detail) => void` | Called when solving completes |
| `onError` | `(detail) => void` | Called when an error occurs |

## Examples

### EU-isolation

For [EU isolation]({{< relref "/docs/reference/eu-isolation.md" >}}) you need to add `eu="true"` attribute to the widget declaration:

```tsx
<PrivateCaptcha
  siteKey="your-site-key"
  eu={true}
/>
```

## Requirements

- React  18+
