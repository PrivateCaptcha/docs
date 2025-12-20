---
title: "Platform API"
date: 2025-12-19T17:50:22+01:00
---

> [!NOTE]
> API is also available [here](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/PrivateCaptcha/PrivateCaptcha/refs/heads/main/docs/openapi.yaml) as Swagger / OpenAPI definition.

This reference documentation describes the Portal API for Private Captcha, which allows for the management of organizations, properties, and asynchronous tasks.

{{< callout type="warning" >}}If you are looking for an API to verify captcha challenges, see [Verify API]({{< relref "docs/reference/verify-api.md" >}}).{{</callout>}}

## Authentication

All endpoints in this section require an API key with the **portal** scope. This key must be sent in the `X-API-Key` header.

**Example Header:**

```http
X-API-Key: your_portal_api_key_here
```

## Response structure

All API responses follow a standard JSON structure containing `meta`, `data`, and optional `pagination` objects.

```json
{
  "meta": {
    "code": 1000,
    "description": "OK",
    "request_id": "req_12345"
  },
  "data": { ... },
  "pagination": {
    "page": 0,
    "per_page": 50,
    "has_more": true
  }
}
```

| Field | Required | Explanation |
| --- | --- | --- |
| `meta` | yes | Contains the status `code`, a human-readable `description`, and a unique `request_id`. |
| `data` | yes | The payload of the response (object or array). |
| `pagination` | no | (Optional) Present on list endpoints. |

### Status codes

Common status codes:

| Code | Description |
|---|---|
| 1000 | OK |
| 1001 | Failure |
| 1002 | Undefined |
| 1003 | Not implemented |
| 1004 | API is deprecated |

Organization management status codes:

| Code | Description |
|---|---|
| 1100 | Name cannot be empty. |
| 1101 | Name is too long. |
| 1102 | Organization name contains invalid characters. |
| 1103 | Organization with this name already exists. |
| 1104 | Organizations limit reached on your current plan, please upgrade to create more. |
| 1105 | Requested organization does not seem to exist. |
| 1106 | You do not have permissions to access this organization. |
| 1107 | Organization ID must be empty. |
| 1108 | Organization ID must not be empty. |
| 1109 | Organization ID is not valid. |

Property management status codes:

| Code | Description |
|---|---|
| 1200 | Properties batch limit size was exceeded. |
| 1201 | Name cannot be empty. |
| 1202 | Name is too long. |
| 1203 | Property name contains invalid characters. |
| 1204 | Property with this name already exists. |
| 1205 | Domain name cannot be empty. |
| 1206 | Localhost is not allowed as a domain. |
| 1207 | IP address cannot be used as a domain. |
| 1208 | Domain name is not valid. |
| 1209 | Failed to resolve domain name. |
| 1210 | Invalid format of domain name. |
| 1211 | Property ID cannot be empty. |
| 1212 | Property ID is not valid. |
| 1213 | Duplicate property ID found in request. |
| 1214 | Insufficient permissions to update settings. |

Subscription status codes:

| Code | Description |
|---|---|
| 1300 | Property limit reached for current subscription plan. |

## Organizations

### Get User Organizations

Retrieves a list of all organizations owned by the authenticated user.

* **Method:** `GET`
* **Endpoint:** `/orgs`
* **Output:** Array of objects containing `id` (string) and `name` (string).

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X GET https://api.privatecaptcha.com/orgs \
  -H "X-API-Key: your_portal_api_key_here"

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": {
    "code": 1000,
    "description": "OK",
    "request_id": "req_12345"
  },
  "data": [
    {
      "id": "vDWtASYqrB",
      "name": "Company Website"
    },
    ...
  ]
}

```

{{< /tab >}}
{{< /tabs >}}

### Create Organization

Creates a new organization for the user. Note that the `id` field in the input must be empty.

* **Method:** `POST`
* **Endpoint:** `/org`
* **Input:** JSON object with `name` (string).
* **Output:** Object containing `id` (string) and `name` (string).

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X POST https://api.privatecaptcha.com/org \
  -H "X-API-Key: your_portal_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Marketing Org"}'

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": {
    "code": 1000,
    "description": "OK",
    "request_id": "req_12345"
  },
  "data": {
    "id": "vDWtASYqrB",
    "name": "New Marketing Org"
  }
}

```

{{< /tab >}}
{{< /tabs >}}

### Update Organization

Updates an existing organization. Only the owner can perform this action.

* **Method:** `PUT`
* **Endpoint:** `/org`
* **Input:** JSON object with `id` (string) and `name` (string).
* **Output:** Object containing `id` (string) and `name` (string).

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X PUT https://api.privatecaptcha.com/org \
  -H "X-API-Key: your_portal_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"id": "vDWtASYqrB", "name": "Updated Name"}'

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": {
    "code": 1000,
    "description": "OK",
    "request_id": "req_12345"
  },
  "data": {
    "id": "vDWtASYqrB",
    "name": "Updated Name"
  }
}

```

{{< /tab >}}
{{< /tabs >}}

### Delete Organization

Deletes an existing organization. Only the owner can perform this action.

* **Method:** `DELETE`
* **Endpoint:** `/org`
* **Input:** JSON object with the `id` (string) of the organization to delete.
* **Output:** `null`.

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X DELETE https://api.privatecaptcha.com/org \
  -H "X-API-Key: your_portal_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"id": "vDWtASYqrB"}'

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": {
    "code": 1000,
    "description": "OK",
    "request_id": "req_12345"
  }
}

```

{{< /tab >}}
{{< /tabs >}}

## Properties

### Get Org Properties

Lists properties associated with a specific organization. This endpoint supports pagination.

* **Method:** `GET`
* **Endpoint:** `/org/{org_id}/properties`
* **Query Parameters:**
    * `page`: Page number (optional)
    * `per_page`: Items per page (optional, max 50)
* **Output:** Array of objects containing `id`, `name`, and `sitekey`.

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X GET "https://api.privatecaptcha.com/org/vDWtASYqrB/properties?page=1&per_page=10" \
  -H "X-API-Key: your_portal_api_key_here"

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": { "code": 1000, "description": "OK", "request_id": "qwerty123" },
  "data": {
    "properties": [
      {
        "id": "0VgGggmbGa",
        "name": "Primary Domain",
        "sitekey": "525e0ef5b9bc489f882274b3ca24b710"
      },
      ...
    ],
    "pagination": {
      "page": 1,
      "per_page": 10,
      "has_more": false
    }
  }
}

```

{{< /tab >}}
{{< /tabs >}}

### Get Property details

Retrieves detailed settings for a specific property.

* **Method:** `GET`
* **Endpoint:** `/org/{org_id}/property/{property_id}`
* **Output:** Object containing property details (`id`, `name`, `domain`, `sitekey`, `level`, `growth`, `validity_seconds`, `allow_subdomains`, `allow_localhost`, `max_replay_count`).

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X GET https://api.privatecaptcha.com/org/vDWtASYqrB/property/0VgGggmbGa \
  -H "X-API-Key: your_portal_api_key_here"

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": { "code": 1000, "description": "OK", "request_id": "qwerty123" },
  "data": {
    "id": "0VgGggmbGa",
    "name": "Primary Domain",
    "domain": "example.com",
    "sitekey": "525e0ef5b9bc489f882274b3ca24b710",
    "level": 1,
    "growth": "medium",
    "validity_seconds": 21600,
    "allow_subdomains": false,
    "allow_localhost": false,
    "max_replay_count": 1
  }
}

```

{{< /tab >}}
{{< /tabs >}}

{{< callout type="info" >}}See also [Property Settings]({{< relref "docs/reference/property-settings.md" >}}) for details on each specific field.{{</ callout >}}

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier of the property. |
| `name` | string | Display name of the property. |
| `domain` | string | The domain name where the widget is deployed. |
| `sitekey` | string | The public key used to integrate the widget. |
| `level` | integer | Difficulty level of the puzzle. Must be between 1 and 255. |
| `growth` | string | Difficulty growth rate. Allowed values: `constant`, `slow`, `medium`, `fast`. |
| `validity_seconds` | integer | Duration in seconds for which a single solution remains valid. |
| `allow_subdomains` | boolean | If `true`, the widget will work on subdomains of the specified domain. |
| `allow_localhost` | boolean | If `true`, the widget will work on `localhost` and `127.0.0.1`. |
| `max_replay_count` | integer | Maximum number of times a single solution can be verified during the `validity_seconds`. Must be between `1` and `1,000,000`. |

### Create Properties (Async)

Triggers an asynchronous task to create a batch of properties (up to 128). It returns a task ID that can be used to check the status.

* **Method:** `POST`
* **Endpoint:** `/org/{org_id}/properties`
* **Input:** Array of objects containing `name`, `domain`, and optional settings (`level`, `growth`, `validity_seconds`, `allow_subdomains`, `allow_localhost`, `max_replay_count`).
* **Output:** Object containing task `id`.

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X POST https://api.privatecaptcha.com/org/vDWtASYqrB/properties \
  -H "X-API-Key: your_portal_api_key_here" \
  -H "Content-Type: application/json" \
  -d '[{"name": "Blog", "domain": "blog.example.com"}]'

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": { "code": 1000, "description": "OK", "request_id": "qwerty123" },
  "data": {
    "id": "e3e6854e06944cf48f49f93abb5a527e"
  }
}

```

{{< /tab >}}
{{< /tabs >}}

### Update Properties (Async)

Triggers an asynchronous task to update a batch of properties.

* **Method:** `PUT`
* **Endpoint:** `/properties`
* **Input:** Array of objects containing `id` and settings to update.
* **Output:** Object containing task `id`.

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X PUT https://api.privatecaptcha.com/properties \
  -H "X-API-Key: your_portal_api_key_here" \
  -H "Content-Type: application/json" \
  -d '[{"id": "0VgGggmbGa", "level": 2}]'

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": { "code": 1000, "description": "OK", "request_id": "qwerty123" },
  "data": {
    "id": "e3e6854e06944cf48f49f93abb5a527e"
  }
}

```

{{< /tab >}}
{{< /tabs >}}

### Delete Properties (Async)

Triggers an asynchronous task to delete a batch of properties.

* **Method:** `DELETE`
* **Endpoint:** `/properties`
* **Input:** Array of strings (encrypted property IDs).
* **Output:** Object containing task `id`.

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X DELETE https://api.privatecaptcha.com/properties \
  -H "X-API-Key: your_portal_api_key_here" \
  -H "Content-Type: application/json" \
  -d '["0VgGggmbGa"]'

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": { "code": 1000, "description": "OK" },
  "data": {
    "id": "e3e6854e06944cf48f49f93abb5a527e"
  }
}

```

{{< /tab >}}
{{< /tabs >}}
## Async Tasks

### Get Task details

Retrieves the current status and results of an asynchronous task.

* **Method:** `GET`
* **Endpoint:** `/asynctask/{id}`
* **Output:** Object containing `id`, `finished` (bool), and `result` (one or many of operation results).

{{< tabs items="Request,Response" >}}
{{< tab >}}

```bash
curl -X GET https://api.privatecaptcha.com/asynctask/e3e6854e06944cf48f49f93abb5a527e \
  -H "X-API-Key: your_portal_api_key_here"

```

{{< /tab >}}
{{< tab >}}

```json
{
  "meta": { "code": 1000, "description": "OK", "request_id": "qwerty123" },
  "data": {
    "id": "e3e6854e06944cf48f49f93abb5a527e",
    "finished": true,
    "result": [
      { "code": 1000 },
      ...
    ]
  }
}

```

{{< /tab >}}
{{< /tabs >}}
