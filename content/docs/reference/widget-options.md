---
title: Widget options
type: docs
#prev: /
next: captcha-object
captcha_scripts: true
---

Here's the minimal captcha field declaration:

```html {filename="index.html"}
<div class="private-captcha" data-sitekey="abcdef"></div>
```

Private Captcha widget is automatically initialized on all elements with `private-captcha` class name.

## Attributes

Apart from the required `sitekey` data attribute, the following _optional_ attributes are supported:

Attribute | Values | Description
--- | --- | ---
`data-start-mode` | `auto`, `click` | In `auto` mode (default) captcha widget starts solving captcha whenever parent form receives focus.
`data-debug` | `true` | When set to `true`, will show widget's internal state and print debug logs.
`data-solution-field` | `private-captcha-solution`, your value | Name of the hidden form field with captcha solution that has to be verified on the server side.
`data-puzzle-endpoint` | `''` or your value | Endpoint to get captcha puzzle (override in case of self-hosting).
`data-display-mode` | `widget`, `popup`, `hidden` | How captcha widget will be shown. Defaults to `widget`. When hidden, you need to setup widget callbacks (see below).
`data-lang` | `en` | Captcha widget localization.
`data-theme` | `light`, `dark` | Widget theme (defaults to `light`)
`data-styles` | `{valid CSS}` | Overrides for host variables of the widget's web component, on top of theme.
`data-store-variable` | `{JS variable name}` | If present, attaches Captcha Object to the html element (helps with multiple widgets on a page)

### Notes and examples

#### `data-display-mode`

- `widget` is the default display mode of captcha
- `popup` captcha widget appears _relative_ to the first parent that has a class `private-captcha-anchor`.
  ```html
  <form>
      <div class="private-captcha-anchor">
          <div class="private-captcha" data-display-mode="popup" data-sitekey="xyz"></div>
      </div>
      <!-- ... -->
      <button type="button" onclick="window.privateCaptcha.autoWidget.execute()">Click me!</button>
  </form>
  ```

  {{< widgetpopup >}}

- `hidden` captcha widget is permanently hidden and you need to handle all callbacks yourself. [See example]({{< relref "/docs/tutorials/invisible-captcha.md" >}}).

#### `data-lang`

`data-lang` allows you to show widget localization in your own language. Translations are defined in the `widget/js/strings.js` file. If translation to your language is not there, feel free to contribute it.

#### `data-theme`

> TIP: Use theme toggle on this website to check how the widget will look like

`light` theme | `dark` theme
--- | ---
{{< captchawidget theme=light >}} | {{< captchawidget theme=dark >}}

#### `data-styles`

`data-styles` allows you to override some of the widget styles to better fit into your website's design, on top of `data-theme`. Example of override: `data-style="--border-radius: .75rem;"`.

The following variables support overrides:

- `--dark-color`
- `--gray-color`
- `--light-color`
- `--lighter-color`
- `--gray-color`
- `--accent-color`
- `--extra-spacing`
- `--label-spacing`
- `--border-radius`
- `--background-color`

#### `data-store-variable`

Captcha object, that is created from the widget configuation, provides a [number of APIs]({{< relref "/docs/reference/captcha-object.md" >}}).

If this is the only captcha widget on a page, you can access this object via `window.privateCaptcha.autoWidget`.

However, in case of multiple widgets, you can assign this attribute to a variable name and then access it as a field of the `HTMLElement`.

```html
<div class="private-captcha" data-sitekey="xyz"
    id="pcWidget" data-store-variable="_privateCaptcha"></div>
<!-- Used in the onclick -->
<button type="button" onclick="document.getElementById('pcWidget')._privateCaptcha.execute()">
    Submit
</button>
```

## Callbacks

You can set your own Javascript handlers for various lifecycle events. All callbacks receive a single argument which is the [Captcha Object]({{< relref "/docs/reference/captcha-object.md" >}}) itself.

Callback | Description
--- | ---
`data-init-callback` | Widget has received a new puzzle to solve (possibly after previous puzzle expiration).
`data-started-callback` | Captcha started solving the puzzle.
`data-finished-callback` | Puzzle has been solved. You can use this callback to enable the form submit button.
`data-errored-callback` | Puzzle endpoint is not reachable or puzzle solving has failed.

### Example

```html {filename="index.html"}
<form>
    <div class="private-captcha"
        data-finished-callback="onCaptchaSolved">
    </div>
</form>
```

```javascript {filename="script.js"}
function onCaptchaSolved(widget) {
    console.log('Solved!');
}
```