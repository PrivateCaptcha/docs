---
title: Captcha object
type: docs
prev: widget-options
next: verify-api
---

Captcha object is available as the `window.privateCaptcha.autoWidget` or as attached via `data-store-variable` [attribute]({{< relref "/docs/reference/widget-options.md#data-store-variable" >}}). It is also passed as the only parameter into all of the [callbacks]({{< relref "/docs/reference/widget-options.md#callbacks" >}}).

## Methods

### `solution()`

Returns the found solution. Can be used in [callbacks]({{< relref "/docs/reference/widget-options.md#callbacks" >}}) for custom processing of the form.

Example:

```javascript
function onCaptchaSolved(widget) {
    console.log('Found solution:', widget.solution());
}
```

```html
<div class="private-captcha" data-sitekey="xyz" data-finished-callback="onCaptchaSolved"></div>
```

### `reset()`

Resets capcha widget to the initial state. Deletes found solution. Optionally can accept an object with options, that correspond to the `data`-attributes, that are set on the widget itself. Please mind the [name conversion](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#name_conversion) rules for `dataset` attributes. For `popup` display mode, `reset()` will hide the widget.

Example:

```javascript
window.privateCaptcha.autoWidget.reset();
// with options
window.privateCaptcha.autoWidget.reset({debug: true, displayMode: 'popup'});
```

### `execute()`

Starts solving captcha puzzle, shows widget if needed (e.g. for display style `popup`). Can be used instead of default handler for forms (make sure _not_ to use input type `submit` for the button).

Example:

```html
<form>
    <button type="button" onclick="window.privateCaptcha.autoWidget.execute()">Submit</button>
</form>
```