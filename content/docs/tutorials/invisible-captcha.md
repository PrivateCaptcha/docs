---
title: Invisible captcha
type: docs
captcha_scripts: true
prev: 'complete-example'
#next: ''
---

Invisible captcha refers to the situation when you don't want to show captcha widget for various reasons (e.g. custom UI integraion or design restrictions).

## Setup

To permanently hide the widget, set `data-display-mode` [attribute]({{< relref "/docs/reference/widget-options.md#data-display-mode" >}}) to `hidden`.

```diff
<div class="private-captcha" data-sitekey="xyz"
	...
+    data-display-mode="hidden"
    ...
>
</div>
```

Additionally, you need to supply [callbacks]({{< relref "/docs/reference/widget-options.md#callbacks" >}}) for at least 2 events: `data-started-callback` and `data-finished-callback`.

```diff
<div class="private-captcha" data-sitekey="xyz"
	...
+    data-started-callback="invisibleCaptchaStarted"
+    data-finished-callback="invisibleCaptchaFinished"
    ...
>
</div>
```

### Triggering solving

By default, captcha will begin solving when any input from the parent form will receive input. For example, it will happen when you fill out input fields or click the Submit button.

However, if you want to control when the solving will start, you can set `data-start-mode` [attribute]({{< relref "/docs/reference/widget-options.md#attributes" >}}) to `click` and trigger solving captcha using [API method]({{< relref "/docs/reference/captcha-object.md#execute" >}}) `execute()`.

## Example

Here's how a more complete example of the above looks like:

```html
<form>
    <div class="private-captcha"
        data-sitekey="xyz"
        data-display-mode="hidden"
        data-start-mode="click"
        data-started-callback="invisibleCaptchaStarted"
        data-finished-callback="invisibleCaptchaFinished">
    </div>
    <button type="button" onclick="window.privateCaptcha.autoWidget.execute()">
        Submit
    </button>
</form>
```

### Demo

You can try the above setup by clicking this button:

{{< invisiblewidget >}}