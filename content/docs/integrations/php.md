---
title: "PHP"
date: 2025-08-20T08:35:57+03:00
---

{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

> [!NOTE]
> You can also use reCAPTCHA-compatible `/siteverify` endpoint directly (especially if you already have working reCAPTCHA integration) like in the [tutorial example]({{< relref "/docs/tutorials/complete-example.md" >}}), this SDK is just PHP-idiomatic implementation with convenience features.

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-php" title="GitHub repository" icon="github" >}}
  {{< card link="https://packagist.org/packages/private-captcha/private-captcha-php" title="Packagist package" icon="cube" >}}
{{< /cards >}}

## Installation

```bash
composer require private-captcha/private-captcha-php
```

## Usage

{{< callout >}}
Always check our [security recommendations]({{< relref "/docs/reference/security.md#server-side" >}}) when using this integration.
{{< /callout >}}

> [!NOTE]
> Before using this SDK, you'll need an API key. If you don't have one yet, see how to [create an API key]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}) in the Getting Started guide.

### Quick start

```php
<?php

use PrivateCaptcha\Client;

// Initialize the client with your API key
$client = new Client(apiKey: "your-api-key-here");

// Verify a captcha solution
try {
    $result = $client->verify(solution: "user-solution-from-frontend");
    if ($result->isOK()) {
        echo "Captcha verified successfully!";
    } else {
        echo "Verification failed: {$result}";
    }
} catch (Exception $e) {
    echo "Error: {$e->getMessage()}";
}
```

### Web framework integration

#### Laravel example

```php
<?php

use Illuminate\Http\Request;
use PrivateCaptcha\Client;
use PrivateCaptcha\Exceptions\SolutionException;

class FormController extends Controller
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client(apiKey: config('services.privatecaptcha.key'));
    }

    public function submit(Request $request)
    {
        try {
            // Verify captcha from form data
            $this->client->verifyRequest($request->all());

            // Process your form data here
            return response('Form submitted successfully!');

        } catch (SolutionException $e) {
            return response('Captcha verification failed', 400);
        }
    }
}
```

#### Symfony example

```php
<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use PrivateCaptcha\Client;
use PrivateCaptcha\Exceptions\SolutionException;

class FormController
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client(apiKey: $_ENV['PRIVATECAPTCHA_API_KEY']);
    }

    public function submit(Request $request): Response
    {
        try {
            $this->client->verifyRequest($request->request->all());
            // Process form data
            return new Response('Success!');
        } catch (SolutionException $e) {
            return new Response('Captcha failed', 400);
        }
    }
}
```

## Configuration

Client configuration allows to set default form field and domain (can be used for self-hosting or [EU isolation]({{< relref "/docs/reference/eu-isolation.md" >}})).

#### Client options

```php
<?php

use PrivateCaptcha\Client;

$client = new Client(
    apiKey: "your-api-key",
    domain: Client::EU_DOMAIN,                      // replace domain for self-hosting or EU isolation
    formField: "private-captcha-solution",          // custom form field name
    timeout: 10,                                    // request timeout in seconds
);
```

#### Non-standard backend domains

```php
<?php

use PrivateCaptcha\Client;

// Use EU domain
$euClient = new Client(
    apiKey: "your-api-key",
    domain: Client::EU_DOMAIN  // api.eu.privatecaptcha.com
);

// Or specify custom domain in case of self-hosting
$customClient = new Client(
    apiKey: "your-api-key", 
    domain: "your-custom-domain.com"
);
```

#### Retry configuration

```php
<?php

$result = $client->verify(
    solution: "user-solution",
    maxBackoffSeconds: 15,  // maximum wait between retries
    attempts: 3             // number of retry attempts
);
```

## Requirements

- PHP 8.1+
- cURL extension
- JSON extension