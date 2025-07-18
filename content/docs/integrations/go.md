---
title: Go
type: docs
---

> [!NOTE]
> You can also use reCAPTCHA-compatible `/siteverify` endpoint directly (especially if you already have working reCAPTCHA integration) like in the [tutorial example]({{< relref "/docs/tutorials/complete-example.md" >}}), this SDK is just Golang-idiomatic implementation with convenience features.

This is a server-side SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

[GitHub repository](https://github.com/PrivateCaptcha/private-captcha-go)

## Usage

### Installation

```bash
go get -u github.com/PrivateCaptcha/private-captcha-go
```

### Code

#### Import and instantiation

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

#### Verify solution directly

`Verify()` supports automatic backoff and retrying (configured via `VerifyInput` parameter), enabled by default. You need to check the captcha verification status yourself.

```go
output, err := client.Verify(ctx, pc.VerifyInput{Solution: solution})
// ... handle err

if !output.Success {
	fmt.Printf("Captcha verification failed. Error: %s", result.Error())
}
```

#### Wrapper around HTTP request

`VerifyRequest()` operates on the `http.Request` level, extracts and verifies form field, configured via `Configuration` object for the client instance, with standard defaults. You only need to check if the `err == nil`.

```go
func handler(w http.ResponseWriter, r *http.Request) {
	if err := client.VerifyRequest(r.Context(), r); err != nil {
		return
	}
}
```

#### Simple HTTP middleware

`VerifyFunc()` is a basic HTTP middleware that returns `http.StatusForbidden` (configured via `Configuration` object for client instance) if the captcha solution is not verified.

```go
mux.Handle("POST /my/form", client.VerifyFunc(actualHandler))
```
