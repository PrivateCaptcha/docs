# Difficulty rules
Difficulty rules is a system of custom modifiers for CAPTCHA puzzle difficulty returned for the end-user, based on various conditions.

![Difficulty rules example](/images/reference/difficulty-rules-example.png "Example of a couple of difficulty rules")

## Building a Difficulty rule

Difficulty rule consists of two parts: **Condition** and **Action**.

![Difficulty rules structure](/images/reference/difficulty-rule-structure.png "Structure of the difficulty rule")

Condition and Action have different background colors in the list of rules and in the rule builder.

### Conditions

Conditions consist of the property of the request being matched, an operator that is applied to that property and a value it is matched against.

#### User Agent

Standard condition is the condition that matches `User-Agent` HTTP header using the following operators:

- Equals
- Contains
- Empty
- Known bot

(each operator can be negated, so that `"Empty"` becomes `"Not empty"`). Note that `Contains` is case-insensitive here.

Condition operator `"Known Bot"` covers all requesters that identify themselves as bots (curl, Python requests module and many others).

**Example**

![Difficulty rules User Agent](/images/reference/difficulty-rule-user-agent.png "Example: match all 'curl' requests")

#### Traffic Source

> [!NOTE]
> This condition is available **only** in SaaS version of Private Captcha at _{{< domain >}}_. It is not available in the self-hosted version.

Traffic sources are IP ranges maintained by _{{< domain >}}_ service and consist of the following lists:

- Cloud providers (AWS, GCP, Azure, Hetzner, and many many others)
- CDN providers (Cloudflare, Fastly, Akamai, and others)
- TOR network exit nodes
- VPN providers (Mullvad, ProtonVPN, and others)
- Consumer proxies (mainly Apple Private Relay)
- Search crawlers (Googlebot, Bingbot, GTPBot, and many others)
- Firehol list (Level 1 and Level 2 combined)
- "Common Threats" (Blocklist DE, NETMOUNTAINS, Emerging Threats, and CINS Army list)

These lists are not complete (e.g. for TOR network they don't cover literally *all* exit nodes), but they cover the vast majority of the providers and are comprehensive enough for `99.9%` of the use-cases.

These lists are kept up-to-date automatically.

**Example**

![Difficulty rules Traffic Source](/images/reference/difficulty-rule-traffic-source.png "Example: match requests from TOR, VPN and search crawlers")

#### IP Address

You can match standard IP addresses using standard CIDR notation with a list of up to `10` comma-separated prefixes. Both IPv4 and IPv6 addresses work. Supported operators:

- Matches
- Empty

For example, this can be useful as an allow-list for your organization IP ranges.

**Example**

![Difficulty rules IP address](/images/reference/difficulty-rule-ip-address.png "Example: match local networks")

#### Country

Detected country of the request, available as a list of countries.

**Example**

![Difficulty rules Country](/images/reference/difficulty-rule-country.png "Example: match suspicious requests from Antarctica")

#### HTTP Header

Match if the request has (or has not) one of up to `10` comma-separated HTTP headers.

**Example**

![Difficulty rules HTTP header](/images/reference/difficulty-rule-header.png "Example: match requests from Cloudflare Workers")

#### Always

There's a simple "Always" condition that always matches all requests. For example, if you need to quickly apply a rule over the organization to all properties.

### Actions

> [!WARNING]
> When few conditions match and have the same action type, only the last modification counts.

Actions typically mean adjusting the puzzle difficulty or blocking the request completely. Also here you can decide on the control flow if to keep processing the other difficulty rules after this one.

#### Difficulty level

Difficulty of the puzzle can be adjusted in percents (`%`) where percents mean "resources". So `+100%` adjustment means puzzle will require `100%` more compute resources to complete. This adjustment is applied on top of the [Base difficulty]({{< relref "/docs/reference/property-settings.md#base-difficulty" >}}) and **not** the final difficulty. It means that on top of that automatic difficulty scaling will take place. You can both increase and decrease difficulty using this action.

**Example**

![Difficulty rules Level](/images/reference/difficulty-rule-level.png "Example: require +50% more compute resources")

#### Difficulty growth

[Difficulty growth]({{< relref "/docs/reference/property-settings.md#difficulty-growth" >}}) (how reactive is automatic difficulty scaling to changes in requests) can be adjusted to any valid level here.

**Example**

![Difficulty rules Growth](/images/reference/difficulty-rule-growth.png "Example: change difficulty growth to 'Fast' for this request")

#### Block request

You can simply block the request, ultimately meaning that form submission will never pass CAPTCHA [verification]({{< relref "/docs/reference/verify-api.md" >}}) (because there will be no CAPTCHA solution in the first place).

Note that blocking the request automatically means that following rules will not be processed (like if you clicked _"Stop processing following rules"_ on any other rule action).

**Example**

![Difficulty rules Block](/images/reference/difficulty-rule-block.png "Example: block CAPTCHA request completely")

#### Break / noop

There's a `break` semantics control flow that allows you to stop processing following rules without any action. This preserves any previous modifiers made by matching rules.

**Example**

![Difficulty rules Break](/images/reference/difficulty-rule-break.png "Example: 'break' from rules")

## Priority and conflict resolution

### Ordering

Rules are always applied top to bottom (both for properties and organizations). Ordering of the rules matter and you can always change it using "Reorder" button.

### Organization vs Property

> [!WARNING]
> Property-level rules will be applied to the request **after** Organization rules.

All rules defined on the Organization level will apply to all properties in that organization. This is a very convenient way to manage rules of many properties at once.

### Multiple applied rules

When the request is matched to a few rules and same action is applied (e.g. `Difficulty level` adjustment, but with different values), only last modification is preserved (aka _"last-write wins"_).

## Reports

Usage reports are available only on property level and show how many times property rules were triggered.

![Difficulty rules reports](/images/reference/difficulty-rule-reports.png)

## Recommendations

It is recommended to make use of [Traffic Source](#traffic-source) (cover at least Cloud providers, Search/Crawlers and "Threat" lists) and bot [User-Agent](#user-agent) right away as those are very classical spammers/abusers.

You can also change both [Growth](#difficulty-growth) and [Level](#difficulty-levels) independently as they help each other and do not conflict.

## Limits

SaaS version of [Private Captcha]({{< domain >}}) has different limits for number of Organization-level and Property-level rules (subject to having specific add-ons). By default every Property has 1 rule included.

Self-hosted version (_"Enterprise Edition"_) has no rule limit, while _"Community Edition"_ does not have the rules feature at all.
