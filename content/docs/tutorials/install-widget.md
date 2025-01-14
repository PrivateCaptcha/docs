---
title: Install widget
type: docs
prev: docs/reference/
next: verify-solution
---

## Step by step

{{% steps %}}

### Create new property

Create your property in the [dashboard](https://portal.privatecaptcha.com/) and copy the `sitekey` from the integration snippet.

![Create new property](/images/tutorials/create-property.png)

### Copy widget snippet

Add captcha widget inside your form:
```html {filename="index.html"}
<form>
    <!-- ... --->
    <div class="private-captcha"
        data-sitekey="your-sitekey"
        data-finished-callback="your-callback">
    </div>
    <!-- ... --->
</form>
```

### Verify solution

In your form's handler on the server, before processing user input, [verify solution]({{< relref "/docs/tutorials/verify-solution.md" >}}) using Private Captcha API.

```bash
curl -X POST \
  -H "X-Api-Key: your-api-key-here" \
  -d "solution" \
  https://api.privatecaptcha.com/verify
```

{{% /steps %}}


## Sample client code

Here's a minimal, yet functional, example of using widget with your form.

```html {filename="index.html"}
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Private Captcha Example</title>

    <!-- required: add/include privatecaptcha script (do NOT host it yourself) -->
    <script defer src="https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js"></script>

    <!-- our own callback for when captcha is "solved" -->
    <script type="text/javascript">
        function onCaptchaSolved() {
            const submitButton = document.querySelector('#formSubmit');
            submitButton.disabled = false;
        }
    </script>
</head>
<body>
    <form action='/submit' method="POST">
        <label> Email </label>
        <!-- NOTE: by default, captcha solving will start after email field receives focus -->
        <input type="email" name="email" placeholder="Email address" required />

        <!-- NOTE: required `class` "private-captcha" and `data-sitekey` attributes set -->
        <div class="private-captcha"
            data-sitekey="your-sitekey" 
            data-finished-callback="onCaptchaSolved">
        </div>

        <!-- NOTE: initially disabled submit button -->
        <button id="formSubmit" type="submit" disabled> Submit </button>
    </form>
</body>
</html>
```

Key things to note:
- captcha widget is added inside the form, marked with class `private-captcha` and has `sitekey` set using "data" attribute
- form submit button is enabled only _after_ captcha successfully solves the puzzle (inside our callback `onCaptchaSolved()`)
- captcha solving will start only _after_ user started to fill-in the form (default value `auto` of captcha attribute `data-start-mode`)
