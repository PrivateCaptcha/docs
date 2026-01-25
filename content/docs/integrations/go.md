---
title: Go
type: docs
---

{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

{{< callout >}}
  If you have a working reCAPTCHA integration, check our [migration guide]({{< relref "/docs/tutorials/migrate-from-recaptcha.md" >}}) for easy instructions.
{{< /callout >}}

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-go" title="GitHub repository" icon="github" >}}
{{< /cards >}}

## Installation

```bash
go get -u github.com/PrivateCaptcha/private-captcha-go
```

## Usage

{{< callout >}}
Always check our [security recommendations]({{< relref "/docs/reference/security.md#server-side" >}}) when using this integration.
{{< /callout >}}

> [!NOTE]
> Before using this SDK, you'll need an API key. If you don't have one yet, see how to create it in the [Getting Started guide]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}).

### Import and instantiation

Add import:

```go
import pc "github.com/PrivateCaptcha/private-captcha-go"
```

Create the client:

```go
client, err := pc.NewClient(pc.Configuration{APIKey: "pc_abcdef"})
// ... handle err
```

`Configuration` object allows to switch to EU endpoint, specify default form field for the solution, HTTP client, and status code for middleware version.

### Verify solution directly

`Verify()` supports automatic backoff and retrying (configured via `VerifyInput` parameter), enabled by default. You need to check the captcha verification status yourself.

```go
output, err := client.Verify(ctx, pc.VerifyInput{Solution: solution})
// ... handle err

if !output.OK() {
	fmt.Printf("Captcha verification failed. Error: %s", result.Error())
}
```

### Wrapper around HTTP request

`VerifyRequest()` operates on the `http.Request` level, extracts and verifies form field, configured via `Configuration` object for the client instance, with standard defaults. You only need to check if the `err == nil`.

```go
func handler(w http.ResponseWriter, r *http.Request) {
	if err := client.VerifyRequest(r.Context(), r); err != nil {
		return
	}
}
```

### Simple HTTP middleware

`VerifyFunc()` is a basic HTTP middleware that returns `http.StatusForbidden` (configured via `Configuration` object for client instance) if the captcha solution is not verified.

```go
mux.Handle("POST /my/form", client.VerifyFunc(actualHandler))
```

### Configuration

Client configuration allows to set default form field, domain (can be used for self-hosting or EU isolation) and HTTP status for middleware version.

#### Non-standard backend domains

For [EU isolation]({{< relref "/docs/reference/eu-isolation.md" >}}), you can use built-in constant `EUDomain`:

```go
client, err := pc.NewClient(pc.Configuration{Domain: pc.EUDomain})
// ... handle err
```

For self-hosted installation, use API domain name.

#### Retry Configuration

When verifying puzzle solutions, you can also specify some retry and backoff options.

```go
input := pc.Configuration{
	Solution: "solution",
	MaxBackoffSeconds: 10,
	Attempts: 10,
}
output, err := client.Verify(ctx, input)
// ... handle err
```