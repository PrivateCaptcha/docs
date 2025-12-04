---
title: Invisible captcha
type: docs
captcha_scripts: true
---

Invisible captcha refers to the situation when you don't want to show captcha widget for various reasons (e.g. custom UI integraion or design restrictions).

{{< callout type="warning" >}}
Invisible captcha **can** provide the lowest level of protection, when implemented incorrectly. [Read more]({{< relref "/docs/reference/security" >}})
{{< /callout >}}

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

{{< tabs items="HTML,Javascript" >}}
{{< tab >}}
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
        <svg id="spinner" ... />
        <svg id="checkmark" ... />

        Submit
    </button>
</form>
```
{{</ tab >}}
{{< tab >}}
```javascript
function invisibleCaptchaStarted() {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('checkmark').classList.add('hidden');
}

function invisibleCaptchaFinished(widget) {
    setTimeout(() => {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('checkmark').classList.remove('hidden');
    }, 1500);

    setTimeout(() => {
        widget.reset();
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('checkmark').classList.add('hidden');
    }, 3000);
}
```
{{</ tab >}}
{{< /tabs >}}

### Demo

You can try the above setup by clicking this button:

{{< invisiblewidget >}}