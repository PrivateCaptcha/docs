# FAQ
> [!NOTE]
> This is a _technical_ FAQ. If you're looking for product FAQ, [click here](https://privatecaptcha.com/faq/).

## API

{{% details title="Captcha widget does not load the puzzle" closed="true" %}}

> aka "Maximum number of attempts exceeded" error

Please check if you have an active subscription (or active trial period) in the [Billing settings](https://portal.{{<domain>}}/settings?tab=billing).

{{% /details %}}

{{% details title="Verification requests fail, but I did everything correctly" closed="true" %}}

We need request ID to tell the exact reason why your request was rejected.

Each request to Private Captcha API returns request ID, available in each [integration]({{< relref "/docs/integrations/" >}}) as a method `traceID()` (or similar) of the response object (or in the exception object) or, if you're using HTTP API directly, in the response header `X-Trace-ID`.

Please also check our [status page](https://status.privatecaptcha.com) to see if there're any ongoing incidents.

{{% /details %}}

{{% details title="HTTP 400/403 to all verification requests" closed="true" %}}

Chances are, you're not using a correct API key (e.g. you're using a sitekey instead of API key, or your API key is expired or has invalid scope). Check our [Getting Started]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}) guide.

{{% /details %}}

{{% details title="Test solution passes verification for any sitekey" closed="true" %}}

[Test solution]({{< relref "/docs/reference/testing.md" >}}) passes verification by design to enable testing.

Private Captcha [verify API]({{< relref "/docs/reference/verify-api.md" >}}) returns `success` and `code` fields and **both** fields should be used for verification, which is done in all [integrations]({{< relref "/docs/integrations" >}}) by using method `OK()` (or similar).

Additionally, you can specify `sitekey` argument with each `/verify` request which will cause `success` field to fail even without `code` check.

Check our [security guide]({{< relref "/docs/reference/security.md#verification" >}}) for details.

{{% /details %}}

{{% details title="Can we proxy/CNAME the API endpoints without self-hosting?" closed="true" %}}

Yes, please check the [DNS Proxy]({{< relref "/docs/reference/dns-proxy.md" >}}) docs.

{{% /details %}}


## Widget

{{% details title="'Invisible' mode does not stop bots" closed="true" %}}

If you're using `auto` mode for captcha widget together with "invisible" mode, this offers the least protection (only resource utilization cost). Check our [security guide]({{< relref "/docs/reference/security.md" >}}) in the client section.

{{% /details %}}

{{% details title="I want to use the same sitekey on multiple domains" closed="true" %}}

This scenario is not possible as it compromises security of Private Captcha solution, not to mention inherent problems like "noisy neighbor" (load of one domain affects the other domains puzzle difficulty).

Private Captcha allows to have the same sitekey on multiple [subdomains]({{< relref "/docs/reference/property-settings.md#subdomains" >}}) only (which is also not recommended for the same reasons).

{{% /details %}}

{{% details title="Does WordPress integration support widget popup mode?" closed="true" %}}

Currently widget only works in default mode, particularly for security reasons, but it is possible this will be available in future. Please contact support with your use-case.

{{% /details %}}

## Misc

{{% details title="Best practices for using Private Captcha during development" closed="true" %}}

Create a separate property and set [Allow localhost]({{< relref "/docs/reference/property-settings.md#localhost" >}}) setting. Use a different sitekey and API key for prod.

Alternatively you can use a [stub sitekey]({{< relref "/docs/reference/testing.md" >}}) which always passes verification.

{{% /details %}}

{{% details title="Is it possible to import domains in bulk to Private Captcha?" closed="true" %}}

Yes, please check our [Platform API]({{< relref "/docs/reference/platform-api.md" >}}) docs.

{{% /details %}}
