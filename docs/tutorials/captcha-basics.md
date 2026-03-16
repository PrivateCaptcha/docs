# How CAPTCHA works
Implementing a CAPTCHA is a standard security practice to prevent automated bots from abusing your forms (e.g., for spam, brute-force attacks, or fake registrations).

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server
    participant CAPTCHAProvider as CAPTCHA Provider

    Browser->>CAPTCHAProvider: Request challenge
    CAPTCHAProvider-->>Browser: Show challenge

    User->>Browser: Solve the challenge
    Browser-->>Browser: Challenge passed — token generated

    User->>Browser: Submit form
    Browser->>Server: Form data + token
    Server->>CAPTCHAProvider: Is this token valid?
    CAPTCHAProvider-->>Server: Yes / No
    Server->>Server: Process form (only if valid)
```

{{% steps %}}

### Frontend

You add two things to your HTML page: **a widget** (the visual challenge the user interacts with) and **a script** loaded from the CAPTCHA provider. The script drives the widget and handles all communication with the provider's servers.

When the user completes the challenge, the provider's script injects a hidden input field into your form containing a short-lived token. The user never sees this field — it travels silently alongside the rest of the form data when the form is submitted.

[Read more]({{< relref "docs/integrations/client-side.md" >}})

### Backend

On the server, **before** you do anything with the submission, you take that token and send it to the CAPTCHA provider's verification API. The provider confirms whether the token is valid and was genuinely earned by a human. Only if verification passes do you proceed to process the form — save the data, send the email, create the account, etc. If it fails, you reject the submission outright.

{{% /steps %}}


{{< cards >}}
  {{< card link="/docs/getting-started.md" title="Getting started"  
  subtitle="How to start using Private Captcha"
   >}}
  {{< card link="/docs/tutorials/complete-example" title="End-to-end example"
  subtitle="Follow along to see a complete integration example"
  icon="code" >}}
{{< /cards >}}
