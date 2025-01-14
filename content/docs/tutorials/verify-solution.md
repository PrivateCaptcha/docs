---
title: Verify solution
type: docs
prev: install-widget
#next: ''
---

Solution verification is done on the server-side, when you are processing the form where captcha widget was installed.

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
	req, err := http.NewRequest("POST", "https://api.privatecaptcha.com/verify", strings.NewReader(solution))
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