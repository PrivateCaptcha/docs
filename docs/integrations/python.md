# Python
{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

{{< callout >}}
  If you have a working reCAPTCHA integration, check our [migration guide]({{< relref "/docs/tutorials/migrate-from-recaptcha.md" >}}) for easy instructions.
{{< /callout >}}

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-py" title="GitHub repository" icon="github" >}}
  {{< card link="https://pypi.org/project/private-captcha/" title="PyPi package" icon="cube" >}}
{{< /cards >}}

## Installation

```bash
pip install private-captcha
```

## Usage

{{< callout >}}
Always check our [security recommendations]({{< relref "/docs/reference/security.md#server-side" >}}) when using this integration.
{{< /callout >}}

> [!NOTE]
> Before using this SDK, you'll need an API key. If you don't have one yet, see how to create it in the [Getting Started guide]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}).

### Quick start

```python
from private_captcha import Client

# Initialize the client with your API key
client = Client(api_key="your-api-key-here")

# Verify a captcha solution
try:
    result = client.verify(solution="user-solution-from-frontend")
    if result.ok():
        print("Captcha verified successfully!")
    else:
        print(f"Verification failed: {result}")
except Exception as e:
    print(f"Error: {e}")
```

### Web framework integration

#### Flask example

```python
from flask import Flask, request
from private_captcha import Client, SolutionError

app = Flask(__name__)
client = Client(api_key="your-api-key")

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Verify captcha from form data
        client.verify_request(request.form)

        # Process your form data here
        return "Form submitted successfully!"

    except SolutionError:
        return "Captcha verification failed", 400
```

#### Django example

```python
from django.http import HttpResponse
from private_captcha import Client, SolutionError

client = Client(api_key="your-api-key")

def submit_view(request):
    if request.method == 'POST':
        try:
            client.verify_request(request.POST)
            # Process form data
            return HttpResponse("Success!")
        except SolutionError:
            return HttpResponse("Captcha failed", status=400)
```

## Configuration

#### Client options

```python
from private_captcha import Client, EU_DOMAIN

client = Client(
    api_key="your-api-key",
    domain=EU_DOMAIN,                       # replace domain for self-hosting or EU isolation
    form_field="private-captcha-solution",  # custom form field name
    timeout=10.0,                           # request timeout in seconds
)
```

#### Non-standard backend domains

For [EU isolation]({{< relref "/docs/reference/eu-isolation.md" >}}), you can use built-in constant `EU_DOMAIN`:

```python
from private_captcha import Client, EU_DOMAIN

# Use EU domain
eu_client = Client(
    api_key="your-api-key",
    domain=EU_DOMAIN  # api.eu.privatecaptcha.com
)

# Or specify custom domain in case of self-hosting
custom_client = Client(
    api_key="your-api-key", 
    domain="your-custom-domain.com"
)
```

#### Retry configuration

When verifying puzzle solutions, you can also specify some retry and backoff options.

```python
result = client.verify(
    max_backoff_seconds=15,  # maximum wait between retries
    attempts=3               # number of retry attempts
)
```
