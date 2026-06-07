---
title: "N8N webhook protection"
date: 2026-06-07T13:18:58+02:00
draft: true
---

In this tutorial we will create a new N8N webhook for contact form and will protect it with Private Captcha [form proxy]({{< relref "/docs/reference/form-proxy.md" >}}) feature.

## Setup a page with a form

### Create HTML form

Let's create a basic form:

![Basic form](/images/tutorials/n8n/n8n-form.png)

There's nothing fancy inside:

```html
<body>
    <div class="form-container">
        <h2>Contact Us</h2>

        <form action="#" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required >
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required >
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</body>
```

### Process form in N8N

To be able to submit this form, let's create a new workflow in N8N and for _Trigger_ select a webhook:

![Basic form](/images/tutorials/n8n/n8n-webhook-url.png)

Now use the webhook URL as the form's `action` attribute:

```diff
@@ -80,7 +80,7 @@
         <h2>Contact Us</h2>
-        <form action="#" method="post">
+        <form action="https://n8n.yourdomain.com/webhook-test/d41b4068-af05-4e82-8eb9-5fbf50409f37" method="post">
             <div class="form-group">
                 <label for="name">Name</label>
```

{{< callout type="info" >}}
Note that N8N gives you a `Test URL` by default - we will switch to `Production URL` later.
{{< /callout >}}

### Test webhook

Now when we click "Test webhook" in N8N and submit a form (e.g. from your browser), we will receive an event:

![Form submission](/images/tutorials/n8n/n8n-form-submission.png)

## Webhook protection

Now if you will deploy this to your website, the problem is that this webhook is available publicly. Everyone who opens your webpage, can just copy the URL and send millions of requests with spam.

To fix that, we will add a captcha widget to the form and proxy it through Private Captcha server that will verify the submission.

### Create form proxy

In Private Captcha Portal, click "New Form Proxy":

![New form proxy](/images/tutorials/n8n/private-captcha-form.png)

For the `Domain`, enter the domain of your website (where contact form is hosted) and for `URL`, enter the URL of the webhook from N8N (the one you put into form's `action` attribute).

### Integrate form on the website

After you've created the form, you will see the integration steps:

![Form integration](/images/tutorials/n8n/form-integration-steps.png)

{{% steps %}}

#### Add captcha widget include

In the head of the website, we need to add widget include:

```diff
@@ -75,6 +75,7 @@
             background-color: #005fcc;
         }
     </style>
+    <script defer src="https://cdn.privatecaptcha.com/widget/js/privatecaptcha.js"></script>
 </head>
 <body>
     <div class="form-container">
```

#### Update form `action` URL

```diff
@@ -75,12 +75,13 @@
         <h2>Contact Us</h2>
-        <form action="https://ndmtion.intmaker.com/webhook-test/d41b4068-af05-4e82-8eb9-5fbf50409f37" method="post">
+        <form action="https://api.privatecaptcha.com/form/21dce88d638f4174aa8a6d1e2605903a" method="POST" >
             <div class="form-group">
                 <label for="name">Name</label>
```

#### Add captcha widget to the form

```diff
@@ -110,6 +111,7 @@
                 ></textarea>
             </div>
 
+            <div class="private-captcha" data-sitekey="a3bb25a00ba04664943754715ada96c9"></div>
             <button type="submit">Submit</button>
         </form>
     </div>
```

And disable the submit button by default, enabling it only when captcha is solved:

```diff
     </style>
     <script defer src="https://cdn.staging.privatecaptcha.com/widget/js/privatecaptcha.js"></script>
+    <script>
+        function onCaptchaSolved() {
+            document.querySelector('button[type="submit"]').disabled = false;
+        }
+    </script>
 </head>
 <body>
@@ -110,7 +122,8 @@
             <div class="private-captcha" data-sitekey="a3bb25a00ba04664943754715ada96c9" data-finished-callback="onCaptchaSolved"></div>
-            <button type="submit">Submit</button>
+            <button type="submit" disabled>Submit</button>
         </form>
     </div>
```

If you did it correctly, on default the form submit button will be disabled:

![Submit disabled](/images/tutorials/n8n/n8n-form-submit-disabled.png)

And when the captcha is solved, submit button becomes enabled:

![Submit enabled](/images/tutorials/n8n/n8n-form-submit-enabled.png)

{{< callout type="warning" icon="key" >}}
  If you are testing this on **localhost** and the widget fails to load, you need to enable `Allow localhost` in [Property settings]({{< relref "docs/reference/property-settings.md#localhost" >}}) (you can click "Manage" in form settings)
{{< /callout >}}

{{% /steps %}}

## Going live

### Switch to N8N Production Webhook URL

By default N8N webhook gives you `Test URL` and you need to switch to `Production URL` in the end.

![N8N prod URL](/images/tutorials/n8n/n8n-prod-url.png)

You can also update this URL in Private Captcha Portal in your form's settings (if it's still using `Test URL` there). Note that you have a _single_ Private Captcha Form URL - you only change N8N URL in settings.

### Final testing

This is not required, but a good chance to test if everything is wired up together correctly.

#### Via Private Captcha

In Private Captcha portal in your form's settings, you have an option to `Test` the webhook:

![Private Captcha Test](/images/tutorials/n8n/private-captcha-test.png)

You can observe this data arriving in N8N:

![Private Captcha N8N Test](/images/tutorials/n8n/private-captcha-n8n-test.png)

#### On your website

And, finally, make sure everything works together by visiting your website and submitting your form.

Now your actual N8N webhook will only receive the submissions that passed CAPTCHA and rate limiting and they are hidden from public by default.