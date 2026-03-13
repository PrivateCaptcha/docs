# Client side
"Client-side" integration means where and how you add a widget to the protected website, page or form.

There are 2 ways to do it: _"native"_ and _"pre-built"_.

## Native integration

"Native" integration means you use our CDN script directly (this is the recommended way) and add some code to handle the form submission.

{{% steps %}}

### Add Private Captcha script to site header

```diff {filename="index.html"}
...
 <head>
+    <script defer src="https://cdn.{{< domain >}}/widget/js/privatecaptcha.js"></script>
 </head>
 <body>
...
```

Make sure that you serve captcha script from our domain `cdn.{{< domain >}}` and you don't proxy or cache it on your side.

### Add a captcha widget inside your form

Captcha widget is just an element with class `private-captcha` and your sitekey. Make sure to replace sitekey to the actual value from the [Portal](https://portal.{{< domain >}}).

```diff {filename="index.html"}
<form action='/submit' method="POST">
+  <div class="private-captcha" data-sitekey="xyz"></div>
</form>
```

By default our script will initialize all elements with class `private-captcha`, but explicit rendering is also possible. Check [widget reference]({{< relref "docs/reference/widget-options.md" >}}) for details.

### Restrict form submission

Make sure that your form **cannot** be submitted until captcha is solved.

> [!NOTE]
> Below is just one way how this can be done. Check [widget reference]({{< relref "docs/reference/widget-options.md#events-and-callbacks" >}}) for details.

For example, you can disable the "Submit" button by default and enable only after captcha is solved. This can be achieved by using `data-finished-callback` attribute (listening to `privatecaptcha:finish` event).

```diff {filename="index.html"}
@@ -18,7 +18,13 @@
             padding: 20px;
         }
     <script defer src="https://cdn.{{< domain >}}/widget/js/privatecaptcha.js"></script>
+    <script type="text/javascript">
+        function onCaptchaSolved() {
+            const submitButton = document.querySelector('#formSubmit');
+            submitButton.disabled = false;
+        }
+    </script>
 </head>
 <body>
          <form action='/submit' method="POST">
             <label> Email: </label>
             <input type="email" name="email" placeholder="Email address" required />
-            <div class="private-captcha" data-sitekey="xyz"></div>
+            <div class="private-captcha" data-sitekey="xyz"
+                data-finished-callback="onCaptchaSolved"></div>
             <button id="formSubmit" type="submit" disabled> Submit </button>
         </form>
     </div>
```

{{% /steps %}}

## Pre-built integrations

> [!WARNING]
> Using pre-built integration like React means you **must** ensure to keep Private Captcha package updated to the latest version at all times.

Pre-built integrations mean you handle the widget yourself using web components or React component.

{{< cards >}}
  {{< card link="/docs/integrations/react" title="React integration"
  subtitle="Read more on a dedicated page"
  icon="code" >}}
{{< /cards >}}
