---
title: "React"
date: 2025-07-27T14:12:04+03:00
---

> [!NOTE]
> You can use a "default way" of adding `<div class="private-captcha" ...></div>` element with `https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js` Javascript include. But it will not work well with server-side rendering (e.g. in Next.js).

This is a **client-side** SDK for React, which is an alternative to using a standard script directly.

[GitHub repository](https://github.com/PrivateCaptcha/private-captcha-react)

## Installation

```bash
npm install @private-captcha/private-captcha-react
```

## Basic Usage

```tsx
import React from 'react';
import { PrivateCaptcha } from '@private-captcha/private-captcha-react';

function MyForm() {
  const handleCaptchaFinished = (opts) => {
    console.log('Captcha solved!', opts.solution());
    // Submit your form here or enable the submit button
  };

  return (
    <form>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />

      <PrivateCaptcha
        siteKey="your-site-key-here"
        theme="dark"
        finishedCallback={handleCaptchaFinished}
      />

      <button type="submit">Login</button>
    </form>
  );
}
```

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `siteKey` | `string` | Your Private Captcha site key |

### Optional Props

Please refer to the [official widget options]({{< relref "/docs/reference/widget-options.md" >}}) documentation.

### Callback Props

All callback functions receive a [captcha object]({{< relref "/docs/reference/captcha-object.md" >}}) as the only parameter.

| Prop | Type | Description |
|------|------|-------------|
| `initCallback` | `(opts) => void` | Called when captcha is initialized |
| `startedCallback` | `(opts) => void` | Called when solving starts |
| `finishedCallback` | `(opts) => void` | Called when solving completes |
| `erroredCallback` | `(opts) => void` | Called when an error occurs |

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