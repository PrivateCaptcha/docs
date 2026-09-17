# Vue

<div class="pc-callout">
{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create a property]({{< relref "docs/reference/property-settings.md" >}}) in your organization and get it's _sitekey_.
{{< /callout >}}
</div>

> [!NOTE]
> You can use a "default way" of adding `<div class="private-captcha" ...></div>` element with `https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js` Javascript include. But it will not work well with server-side rendering.

This is a **client-side** SDK for Vue.js, which is an alternative to using a standard script directly.

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-vue" title="GitHub repository" icon="github" >}}
  {{< card link="https://www.npmjs.com/package/@private-captcha/private-captcha-vue" title="NPM package" icon="cube" >}}
{{< /cards >}}

## Installation

```bash
npm install @private-captcha/private-captcha-vue
```

## Basic Usage

> NOTE: The captcha component must be rendered **inside a form**.

```vue
<script setup lang="ts">
import {
  PrivateCaptcha,
  type PrivateCaptchaEventDetail,
} from '@private-captcha/private-captcha-vue';

function handleCaptchaFinished(detail: PrivateCaptchaEventDetail): void {
  console.log('Captcha solved!', detail.widget.solution());
  // Submit your form here or enable the submit button.
}
</script>

<template>
  <form>
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">

    <PrivateCaptcha
      site-key="your-site-key-here"
      theme="dark"
      @finish="handleCaptchaFinished"
    />

    <button type="submit">Login</button>
  </form>
</template>
```

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `siteKey` | `string` | Your Private Captcha site key |

### Optional Props

Please refer to the [official widget options](https://docs.privatecaptcha.com/docs/reference/widget-options/) documentation.

### Events

All event handlers receive a `detail` object with these properties:

- `detail.widget` - The captcha widget facade with methods:
  - `execute()` - Start solving the captcha
  - `reset()` - Reset the captcha
  - `solution()` - Get the current solution string or `null`
  - `element()` - Get the DOM element hosting the captcha
- `detail.element` - The DOM element hosting the captcha

| Event | Handler type | Description |
|-------|--------------|-------------|
| `@init` | `(detail) => void` | Called when the captcha is initialized |
| `@start` | `(detail) => void` | Called when solving starts |
| `@finish` | `(detail) => void` | Called when solving completes |
| `@error` | `(detail) => void` | Called when an error occurs |
| `@reset` | `(detail) => void` | Called when the captcha is reset |

## Examples

### EU Isolation

```vue
<PrivateCaptcha
  site-key="your-site-key"
  :eu="true"
/>
```

## Requirements

- Vue 3.3+
