---
title: Widget options
type: docs
#prev: /
next: verify-api
---

Here's the minimal captcha field declaration:

```html {filename="index.html"}
<div class="private-captcha" data-sitekey="abcdef"></div>
```

Private Captcha widget is automatically initialized on all elements with `private-captcha` class name.

## Attributes

Apart from the required `sitekey` attribute, the following _optional_ attributes are supported:

Attribute | Values | Description
--- | --- | ---
`data-start-mode` | `auto`, `click` | In `auto` mode (default) captcha widget starts solving captcha whenever parent form receives focus.
`data-debug` | `true` | When set to `true`, will show widget's internal state and print debug logs.
`data-solution-field` | `private-captcha-solution`, your value | Name of the hidden form field with captcha solution that has to be verified on the server side.
`data-puzzle-endpoint` | `''` or your value | Endpoint to get captcha puzzle (override in case of self-hosting).
`data-display-mode` | `widget`, `popup`, `hidden` | How captcha widget will be shown. Defaults to `widget`. When hidden, you need to setup widget callbacks (see below).
`data-lang` | `en` | Captcha widget localization.
`data-styles` | `{valid CSS}` | Overrides for host variables of the widget's web component.

### Notes and examples

#### `data-display-mode`

`popup` captcha widget appears relative to the first parent that has a class `private-captcha-anchor`.

#### `data-lang`

`data-lang` allows you to show widget localization in your own language. Translations are defined in the `widget/js/strings.js` file. If translation to your language is not there, feel free to contribute it.

#### `data-styles`

`data-styles` allows you to override some of the widget styles to better fit into your website's design. Example of override: `data-style=":host { --border-radius: .75rem; }"`.

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

## Callbacks

You can set your own Javascript handlers for various lifecycle events.

Callback | Description
--- | ---
`data-started-callback` | Captcha started solving the puzzle.
`data-finished-callback` | Puzzle has been solved. You can use this callback to enable the form submit button.
`data-errored-callback` | Puzzle endpoint is not reachable or puzzle solving has failed.