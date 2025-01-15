---
title: Verify API
type: docs
prev: widget-options
#next: docs/folder/
---

After captcha widget has finished solving puzzle, it adds a hidden form field (defined by `data-solution-field` [attribute]({{< relref "/docs/reference/widget-options.md" >}})). When handling form submission on the server-side, this is the field you need to validate using Private Captcha API.

## Request

To verify solutions you need to make a `POST` request to `https://api.privatecaptcha.com/verify` with the body of the request being solution field's contents from your form.

```bash
# an example how that will look like with curl
curl -X POST \
  -H "X-Api-Key: your-api-key-here" \
  -d "solution" \
  https://api.privatecaptcha.com/verify
```

## Response

Here's how successful response from `/verify` endpoint looks like:

```json
{
  "success": true,
  "challenge_ts": "2025-01-13T16:17:27+00:00",
  "hostname": "privatecaptcha.com",
  "error-codes": []
}
```

{{< callout type="info" >}}
`/verify` endpoint returns [reCAPTCHA-compatible](https://developers.google.com/recaptcha/docs/verify) response. By default it uses reCAPTCHA v2 format. If you need v3 format, pass an additional header `X-Captcha-Compat-Version: rcV3`.
{{< /callout >}}

## Error codes

In case of errors, `error-codes` array will contain one or more of integer error codes:

Error code | Description
--- | ---
`0` | No error
`1` | Other (unknown) error
`2` | Solution contains duplicates
`3` | Solution verification error
`4` | Solution has invalid format
`5` | Puzzle for this solution has expired
`6` | Property for this puzzle/solution cannot be found
`7` | Property and API key's accounts don't match
`8` | Solution has been already verified
`9` | Maintenance mode (see below)

During maintenance mode, Private Captcha still verifies cryptographic solution validity, however, account validity is not verified. If solution is valid, `success` in response is equal to `true`, but `error-codes` contains `9` (maintenance mode error). You can decide yourself if you trust these form submissions.
