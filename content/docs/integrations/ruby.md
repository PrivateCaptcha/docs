---
title: "Ruby"
date: 2025-10-26T08:48:32+02:00
---

{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

> [!NOTE]
> You can also use reCAPTCHA-compatible `/siteverify` endpoint directly (especially if you already have working reCAPTCHA integration) like in the [tutorial example]({{< relref "/docs/tutorials/complete-example.md" >}}), this SDK is just Python-idiomatic implementation with convenience features.

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-ruby" title="GitHub repository" icon="github" >}}
  {{< card link="https://rubygems.org/gems/private_captcha/" title="RubyGems package" icon="cube" >}}
{{< /cards >}}

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'private_captcha'
```

And then execute:

```bash
bundle install
```

Or install it yourself as:

```bash
gem install private_captcha
```

## Usage

{{< callout >}}
Always check our [security recommendations]({{< relref "/docs/tutorials/security-recommendations.md#server-side" >}}) when using this integration.
{{< /callout >}}

> [!NOTE]
> Before using this SDK, you'll need an API key. If you don't have one yet, see how to [create an API key]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}) in the Getting Started guide.

### Quick start

```ruby
require 'private_captcha'

# Initialize the client with your API key
client = PrivateCaptcha::Client.new do |config|
  config.api_key = 'your-api-key-here'
end

# Verify a captcha solution
begin
  result = client.verify('user-solution-from-frontend')
  if result.ok?
    puts 'Captcha verified successfully!'
  else
    puts "Verification failed: #{result.error_message}"
  end
rescue PrivateCaptcha::Error => e
  puts "Error: #{e.message}"
end
```

### Web framework integration

### Sinatra example

```ruby
require 'sinatra'
require 'private_captcha'

client = PrivateCaptcha::Client.new do |config|
  config.api_key = 'your-api-key'
end

post '/submit' do
  begin
    # Verify captcha from form data
    client.verify_request(request)

    # Process your form data here
    'Form submitted successfully!'
  rescue PrivateCaptcha::Error
    status 400
    'Captcha verification failed'
  end
end
```

### Rails example

```ruby
class FormsController < ApplicationController
  def submit
    client = PrivateCaptcha::Client.new do |config|
      config.api_key = 'your-api-key'
    end

    begin
      client.verify_request(request)
      # Process form data
      render plain: 'Success!'
    rescue PrivateCaptcha::Error
      render plain: 'Captcha failed', status: :bad_request
    end
  end
end
```

### Rack middleware

```ruby
require 'private_captcha'

use PrivateCaptcha::Middleware,
  api_key: 'your-api-key',
  failed_status_code: 403
```

## Configuration

### Client options

```ruby
require 'private_captcha'

client = PrivateCaptcha::Client.new do |config|
  config.api_key = 'your-api-key'
  config.domain = PrivateCaptcha::Configuration::EU_DOMAIN  # replace domain for self-hosting or EU isolation
  config.form_field = 'private-captcha-solution'            # custom form field name
  config.max_backoff_seconds = 20                           # maximum wait between retries
  config.attempts = 5                                       # number of retry attempts
  config.logger = Logger.new(STDOUT)                        # optional logger
end
```

### Non-standard backend domains

```ruby
require 'private_captcha'

# Use EU domain
eu_client = PrivateCaptcha::Client.new do |config|
  config.api_key = 'your-api-key'
  config.domain = PrivateCaptcha::Configuration::EU_DOMAIN  # api.eu.privatecaptcha.com
end

# Or specify custom domain in case of self-hosting
custom_client = PrivateCaptcha::Client.new do |config|
  config.api_key = 'your-api-key'
  config.domain = 'your-custom-domain.com'
end
```

### Retry configuration

```ruby
result = client.verify(
  'solution',
  max_backoff_seconds: 15,  # maximum wait between retries
  attempts: 3               # number of retry attempts
)
```