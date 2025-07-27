---
title: "Javascript"
date: 2025-07-19T14:06:29+03:00
type: docs
---

> [!NOTE]
> You can also use reCAPTCHA-compatible `/siteverify` endpoint directly (especially if you already have working reCAPTCHA integration) like in the [tutorial example]({{< relref "/docs/tutorials/complete-example.md" >}}), this SDK is just Javascript-idiomatic implementation with convenience features.

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

[GitHub repository](https://github.com/PrivateCaptcha/private-captcha-js)

## Installation

```bash
npm install private-captcha-js
```

## Usage

### Basic Verification

`verify()` supports automatic backoff and retrying (configured via `VerifyInput` parameter), enabled by default. You need to check the captcha verification status yourself.

```javascript
import { createClient } from 'private-captcha-js';

const client = createClient({ apiKey: 'your-api-key' });

const result = await client.verify({ solution: 'captcha-solution-from-client' });
if (result.success) {
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

```javascript
const client = createClient({
    apiKey: 'your-api-key',                 // Required
    formField: 'private-captcha-solution',  // Field from where to read the solution
    failedStatusCode: 403,                  // HTTP status code for failed verifications (middleware)
    domain: 'api.privatecaptcha.com'        // Override for EU isolation or for self-hosting
});
```

#### Retry configuration

When verifying puzzle solutions, you can also specify some retry and backoff options.

```javascript
client.verify({
    solution: 'solution',
    maxBackoffSeconds: 10,
    attempts: 10
});
```