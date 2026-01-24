# Property settings
Protection of a website or a form starts with creating a property in the [Portal](https://portal.{{< domain >}}). Property corresponds to a single CAPTCHA widget - it can be used on a website, a particular web page, form, subdomain etc. Property is identified by a Site Key, which looks like `aaaaaaaabbbbccccddddeeeeeeeeeeee`. Site Key is used in the [widget initialization]({{< relref "/docs/reference/widget-options.md" >}}).

We'll go through all property settings that you can change.

![Property settings](/images/reference/property-settings.png)

## Domain

![Enter name and domain](/images/integrations/new-wordpress-site.png)

You set domain when you create the property in the Portal. You can change the property name, but you **cannot** change Domain in settings.

### Subdomains

![Property settings subdomains](/images/reference/property-settings-subdomains.png)

By default CAPTCHA requests are only allowed on the domain that you used to create the property. If you created property with domain `example.com`, then you cannot use the same widget on `portal.example.com`. However, if you enable _"Allow subdomains"_ checkbox, all subdomains are allowed.

### Localhost

![Property settings localhost](/images/reference/property-settings-localhost.png)

In the lieu of the "Subdomains" logic, localhost access (for development) is also not allowed by default (in that case anybody can use your property Site Key locally). But you can temporarily enable _"Allow localhost"_ for development purposes. In that case you will have a "testing" label added to your property.

## Challenge verification

There're 2 important settings in this section:

![Property settings verification](/images/reference/property-settings-verification.png)

### Verification window

Captcha challenges (or "puzzles") have a validity period during which they can be "solved" and verified. You can set validity period from few minutes to a couple of days. If a CAPTCHA solution is checked outside of validity period, it's considered invalid.

### Repeated solutions

> [!NOTE]
> This is an advanced setting that allows to build different applications out of Private Captcha API.

By default you cannot submit a solution to the same CAPTCHA puzzle more than once. Second time it will be considered invalid. This is a protection against so called "replay attack", where a malicious actor solves puzzle only once, but sends your form or accesses your page multiple times.

However, there are cases when you want to allow this. One example if when Private Captcha is used as a proxy in front of your website, like in the use-case of AI scrapers protection (or API endpoints protection). In such case when the user requests a webpage with a valid solution (solved challenge/puzzle), we want to grant them access, up to a certain number of times.

This is where the setting with the number of repeated solutions comes into play. If you set the value to, say, `5`, it means user can solve the CAPTCHA puzzle once to access your resources `5` times before being requested to pass another challenge. The exact number you want to use is the trade off between annoying your user base and protecting your resources against automated access or AI scrapers.

## Challenge difficulty

Each CAPTCHA challenge has a certain "difficulty". Difficulty corresponds to the amount of resource the client has to use in order to "solve" the challenge. The higher the difficulty, more resources are required to "solve" (pass) the challenge.

![Property settings difficulty](/images/reference/property-settings-difficulty.png)

Private Captcha offers dynamic (automatically scaled) difficulty out of the box in all plans. This means when there are more requests, the difficulty of each subsequent challenge will grow, and when there are less requests, it will fall back to base settings. This is the basis of the security of scale.

### Base difficulty

This is the "default" challenge difficulty level when there are no user requests at all. You can test how does it feel using the playground right below those settings.

### Difficulty growth

When user (or bots) requests to your resources (websites, forms, API) keep coming, Private Captcha automatically scales the difficulty. You have 3 options of how fast the difficulty changes based on the number of requests:

- **Constant** (difficulty does not change at all and the value you set will always be returned)
- **Slow** (difficulty changes slower than usual, it will take more requests to increase the difficulty on average)
- **Normal** (default setting of difficulty growth)
- **Fast** (difficulty growth is very reactive and will grow faster as more requests come)
