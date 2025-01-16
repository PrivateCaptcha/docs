---
title: Verify solution
type: docs
prev: install-widget
next: local-e2e-test
---

After captcha widget has finished solving puzzle, it adds a hidden form field (defined by `data-solution-field` [attribute]({{< relref "/docs/reference/widget-options.md" >}})). When handling form submission on the server-side, this is the field you need to validate using [verify API]({{< relref "/docs/reference/verify-api.md" >}}).

In this tutorial we will learn how to verify solution on the server side, given that we have [installed the widget]({{< relref "/docs/tutorials/install-widget.md" >}}) correctly.

## Step by step

{{% steps %}}

### Create an API key

API key is a prerequisite for verifying captcha. You can create your Private Captcha API key [in the portal](https://portal.privatecaptcha.com/settings?tab=apikeys).

![Create new API key](/images/tutorials/create-api-key.png)

### Call REST endpoint

{{< tabs items="Go" >}}
{{< tab >}}
```go {filename="main.go"}
func checkSolution(solution, apiKey string) error {
	req, err := http.NewRequest("POST", "https://api.privatecaptcha.com/siteverify", strings.NewReader(solution))
	if err != nil {
		return err
	}

	req.Header.Set("X-Api-Key", apiKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	response := struct {
		Success    bool  `json:"success"`
		ErrorCodes []int `json:"error-codes,omitempty"`
		// NOTE: other fields omitted for brevity
	}{}

	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return err
	}

	if !response.Success {
		return errors.New("solution is not correct")
	}

	return nil
}
```
{{< /tab >}}
{{< /tabs >}}

### Check response

Parse response and [check errors]({{< relref "/docs/reference/verify-api.md" >}}).

```json
{
  "success": true,
  "challenge_ts": "2025-01-13T16:17:27+00:00",
  "hostname": "privatecaptcha.com",
  "error-codes": []
}
```

{{% /steps %}}