# Widget customization
This tutorial is mostly a collection of **visual** changes to the widget through `data-styles` [attribute]({{< relref "/docs/reference/widget-options.md#data-styles" >}}).

## Full-width widget

The only thing you need to do is to add `display: block` to `data-styles` (and make sure `form` itself is wide enough).

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form hx:rounded-lg" widgetstyle="display: block; --border-radius: 0.5rem;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form>
    <div class="private-captcha"
         data-styles="display: block;">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}


## Large widget

There're 2 things you can do: changing `font-size` scales everything inside the widget and stretching widget itself is done with `display` attribute (which by default is `inline-block`).

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form hx:rounded-lg" parentstyle="width: 500px; height: 160px;" widgetstyle="display: block; height: 100%; font-size: 24px; --border-radius: 0.5rem; --extra-spacing: 8px;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form style="width: 500px; height: 160px;">
    <div class="private-captcha"
         style="height: 100%"
         data-styles="display: block; height: 100%; font-size: 24px;">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}

## Border customization

Border color is customized with `--border` variable (a proxy to `border` CSS property) and border radius is customized with `--border-radius`

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form hx:rounded-lg" widgetstyle="--border-radius: 1rem; --border: 1px dashed blue;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form>
    <div class="private-captcha"
         data-styles="--border-radius: 1rem; --border: 1px dashed blue;">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}

## Box shadow

Make sure that container's parent (or `form` itself) has the same `border-radius` so there're no visual conflicts. Also make sure the container does **not** have `overflow: hidden`.

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form hx:shadow-xl hx:rounded-lg" parentstyle="display: inline-block;" widgetstyle="display: block; height: 100%; --border-radius: 0.5rem;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form>
    <div class="private-captcha"
         data-styles="box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); --border-radius: 0.5rem;">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}

## Accent colors

Here's how to make a red widget. You need to override `--border` (obviously), then `--accent-color`, `--pie-color` and `--checkbox-hover-color`.

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form" parentstyle="display: inline-block;" widgetstyle="--border: 1px solid #cd1811; --accent-color: #cd1811; --pie-color: #fdb8b7; --checkbox-hover-color: #feeded;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form>
    <div class="private-captcha"
         data-styles="--border: 1px solid #cd1811; --accent-color: #cd1811; --pie-color: #fdb8b7; --checkbox-hover-color: #feeded;">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}

## Responsive size

For mobile clients we want to show a smaller widget. We can achieve this using `font-size` and `clamp` CSS built-in to have smth like `font-size: clamp(18px, 4vw, 20px)`. Trick can be also used to things like `--extra-spacing`.

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form" widgetstyle="-extra-spacing: clamp(0.025rem, 2vw, 0.25rem); font-size: clamp(18px, 4vw, 20px); --border-radius: 0.5rem;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form>
    <div class="private-captcha"
         data-styles="font-size: clamp(18px, 4vw, 20px); --extra-spacing: clamp(0.025rem, 2vw, 0.25rem);">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}

## Extra spacing

Depending on preferred widget size, you might want to add more horizontal padding between sides and checkbox and logo. You can achieve that using `--extra-spacing`.

{{< tabs items="Widget,HTML" >}}

{{< tab >}}
{{< captchawidget formclass="pc-form" parentstyle="width: 400px" widgetstyle="display: block; --extra-spacing: 1.5rem;" >}}
{{< /tab >}}

{{< tab >}}
```html
<form style="width: 400px">
    <div class="private-captcha"
         data-styles="display: block; --extra-spacing: 1.5rem;">
    </div>
</form>
```
{{< /tab >}}

{{< /tabs >}}

## Even more customization

For _absolutely custom visualization_, you can make Private Captcha widget ["invisible"]({{< relref "/docs/tutorials/invisible-captcha.md" >}}) and make your own visualizations based on widget's callbacks and/or events. You can see an example of it in the linked page.
