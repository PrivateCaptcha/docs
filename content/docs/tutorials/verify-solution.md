---
title: Verify solution
type: docs
prev: widget-example
#next: ''
---

## Step by step

{{% steps %}}

### Create an API key

API key is a prerequisite for verifying captcha. You can create your API key [in the portal](https://portal.staging.privatecaptcha.com/settings?tab=apikeys).

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

    if resp.StatusCode != http.StatusOK {
        return errors.New("solution is not correct")
    }

    return nil
}
```
{{< /tab >}}
{{< /tabs >}}

### Check response

In case HTTP response code is not `200`, you can parse response and [check errors]({{< relref "/docs/reference/verify-endpoint.md" >}}).

{{% /steps %}}