# JavaScript
{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

{{< callout >}}
  If you have a working reCAPTCHA integration, check our [migration guide]({{< relref "/docs/tutorials/migrate-from-recaptcha.md" >}}) for easy instructions.
{{< /callout >}}

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-js" title="GitHub repository" icon="github" >}}
  {{< card link="https://www.npmjs.com/package/@private-captcha/private-captcha-js" title="NPM package" icon="cube" >}}
{{< /cards >}}

## Installation

```bash
npm install private-captcha-js
```

## Usage

{{< callout >}}
Always check our [security recommendations]({{< relref "/docs/reference/security.md#server-side" >}}) when using this integration.
{{< /callout >}}

> [!NOTE]
> Before using this SDK, you'll need an API key. If you don't have one yet, see how to create it in the [Getting Started guide]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}).

### Basic Verification

`verify()` supports automatic backoff and retrying (configured via `VerifyInput` parameter), enabled by default. You need to check the captcha verification status yourself.

```javascript
import { createClient } from 'private-captcha-js';

const client = createClient({ apiKey: 'your-api-key' });

const result = await client.verify({ solution: 'captcha-solution-from-client' });
if (result.ok()) {
    console.log('Captcha verified!');
}
```

### Express.js Middleware

`middleware()` returns a basic Express.js middleware that extracts and verifies form field, configured via `Configuration` object for the client instance.

```javascript
import express from 'express';
import { createClient } from 'private-captcha-js';

const app = express();
app.use(express.urlencoded({ extended: true })); // Required

const client = createClient({ apiKey: 'your-api-key' });

// Protect route with middleware
app.post('/submit', client.middleware(), (req, res) => {
    res.send('Form submitted successfully!');
});

// Or verify manually
app.post('/verify', async (req, res) => {
    try {
        const result = await client.verifyRequest(req);
        res.json({ success: result.success });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});
```

### Configuration

Client configuration allows to set default form field, domain (can be used for self-hosting or [EU isolation]({{< relref "/docs/reference/eu-isolation.md" >}})) and HTTP status for middleware version.

#### Client Options

```javascript
const client = createClient({
    apiKey: 'your-api-key',                 // Required
    formField: 'private-captcha-solution',  // Field from where to read the solution
    failedStatusCode: 403,                  // HTTP status code for failed verifications (middleware)
    domain: 'api.eu.privatecaptcha.com'        // Override for EU isolation or for self-hosting
});
```

#### Non-standard backend domains

For [EU isolation]({{< relref "/docs/reference/eu-isolation.md" >}}), you can use the domain option:

```javascript
const client = createClient({
    apiKey: 'your-api-key',
    domain: 'api.eu.privatecaptcha.com'  // EU domain
});
```

#### Retry Configuration

When verifying puzzle solutions, you can also specify some retry and backoff options.

```javascript
client.verify({
    solution: 'solution',
    maxBackoffSeconds: 10,
    attempts: 10
});
```
