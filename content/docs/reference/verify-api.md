---
title: Verify API
type: docs
prev: captcha-object
#next: docs/folder/
---

After captcha widget has finished solving the puzzle, it adds a hidden form field with solution (defined by `data-solution-field` [attribute]({{< relref "/docs/reference/widget-options.md" >}})).

```html
<form>
    <!-- ... -->
    <input name="private-captcha-solution" type="hidden" value="AAAAAAACAhQEAOiDAAAAAAC...IsoSTgYAAA=">
    <!-- ... -->
</form>
```

When handling form submission on the server-side, this is the field you need to validate using Private Captcha API.

## Request

To verify solutions you need to make a `POST` request to `https://api.{{<domain>}}/siteverify` with the body of the request being solution field's contents from your form.

```bash
# an example how that will look like with curl
curl -X POST \
  -H "X-Api-Key: your-api-key-here" \
  -d "solution" \
  https://api.{{< domain >}}/siteverify
```

## Response

Here's how successful response from `/siteverify` endpoint looks like:

```json
{
  "success": true,
  "challenge_ts": "2025-01-13T16:17:27+00:00",
  "hostname": "privatecaptcha.com",
  "error-codes": []
}
```

> [!NOTE]
> `/siteverify` endpoint returns [reCAPTCHA-compatible](https://developers.google.com/recaptcha/docs/verify) response. By default it uses reCAPTCHA v2 format. If you need v3 format, pass an additional header `X-Captcha-Compat-Version: rcV3`.

### Verifying captcha

Verification status is defined by a single field only: `success` (boolean) must be equal to `true`.

## Error codes

> [!NOTE]
> If `error-codes` is not empty, it does **not** mean that verification failed. See details [below](#errors-during-successful-verification).

`error-codes` array can contain one or more of error codes:

Error code | Description
--- | ---
`no-error` | No error (shown here for completeness)
`error-other` | Unspecified error
`solution-duplicates` | Solution contains duplicates
`solution-invalid` | Solution verification error
`solution-bad-format` | Solution has invalid format
`puzzle-expired` | Puzzle for this solution has expired
`property-invalid` | Property for this puzzle/solution cannot be found
`property-owner-mismatch` | Property and API key's accounts don't match
`solution-verified-before` | Solution has been already verified
`property-test` | Test property is used for verification
`maintenance-mode` | Maintenance mode (see below)
`integrity-error` | Puzzle or solution integrity is compromised

### Errors during successful verification

There are a couple of cases, when `success` in response will be equal to `true` (successful verification), but `error-codes` will not be empty. This is made in order to help you distinguish certain use-cases of captcha (and decide yourself if you trust submissions):

- When you're using a test property, `error-codes` will contain `property-test` (but verification will succeed).
- During maintenance mode, Private Captcha still verifies cryptographic solution validity, however, account validity might not be possible to verify. If solution is valid, `success` in response is equal to `true`, but `error-codes` will contain `maintenance-mode`.
- If you configured property to _"Accept repeated solutions"_ (during verification window), verification of repeated solution will cause `error-codes` to contain `solution-verified-before`.