# Java
{{< callout type="warning" icon="key" >}}
  To use this integration you need to [create an API key](https://portal.{{< domain >}}/settings?tab=apikeys) in your account.
{{< /callout >}}

{{< callout >}}
  If you have a working reCAPTCHA integration, check our [migration guide]({{< relref "/docs/tutorials/migrate-from-recaptcha.md" >}}) for easy instructions.
{{< /callout >}}

This is a **server-side** SDK, which you would use to verify captcha solution against Private Captcha API. This SDK does _not_ solve puzzles on the client side (used to protect APIs).

{{< cards >}}
  {{< card link="https://github.com/PrivateCaptcha/private-captcha-java" title="GitHub repository" icon="github" >}}
  {{< card link="https://central.sonatype.com/artifact/com.privatecaptcha/private-captcha-java" title="Maven package" icon="cube" >}}
{{< /cards >}}

## Installation

> Minimum supported Java version is 11

### Maven

Add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>com.privatecaptcha</groupId>
    <artifactId>private-captcha-java</artifactId>
    <version>0.0.1</version>
</dependency>
```

### Gradle

Add the following to your `build.gradle`:

```groovy
implementation 'com.privatecaptcha:private-captcha-java:0.0.1'
```

## Usage

{{< callout >}}
Always check our [security recommendations]({{< relref "/docs/reference/security.md#server-side" >}}) when using this integration.
{{< /callout >}}

> [!NOTE]
> Before using this SDK, you'll need an API key. If you don't have one yet, see how to create it in the [Getting Started guide]({{< relref "/docs/getting-started.md#create-a-new-api-key" >}}).

### Basic Verification

```java
import com.privatecaptcha.*;

PrivateCaptchaClient client = new PrivateCaptchaClient(
    new PrivateCaptchaConfiguration("pc_your_api_key")
);

try {
    VerifyOutput output = client.verify(new VerifyInput(solution));
    
    if (output.ok()) {
        System.out.println("Verification successful!");
    } else {
        System.out.println("Verification failed: " + output.getErrorMessage());
    }
} catch (PrivateCaptchaHttpException e) {
    System.err.println("HTTP error: " + e.getStatusCode());
} catch (VerificationFailedException e) {
    System.err.println("Verification failed after " + e.getAttempts() + " attempts");
}
```

### Configuration

#### Client options

```java
import java.time.Duration;

PrivateCaptchaConfiguration config = new PrivateCaptchaConfiguration("pc_your_api_key")
    .setDomain(Domains.GLOBAL)
    .setFormField("private-captcha-solution")
    .setFailedStatusCode(403)
    .setConnectTimeout(Duration.ofSeconds(10))
    .setReadTimeout(Duration.ofSeconds(30));

PrivateCaptchaClient client = new PrivateCaptchaClient(config);
```

#### Verification Input Options

```java
VerifyInput input = new VerifyInput(solution)
    .setSitekey("your-sitekey")
    .setMaxBackoffSeconds(20)
    .setMaxAttempts(5);

VerifyOutput output = client.verify(input);
```

### Server Integration

The `verifyRequest()` method provides easy integration with any HTTP server framework using the `FormParameterExtractor` functional interface:

#### Servlet (Jakarta/Javax)

```java
@WebServlet("/submit-form")
public class FormServlet extends HttpServlet {
    
    private final PrivateCaptchaClient captchaClient = new PrivateCaptchaClient(
        new PrivateCaptchaConfiguration(System.getenv("PC_API_KEY"))
    );
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        try {
            VerifyOutput output = captchaClient.verifyRequest(request::getParameter);
            
            if (!output.ok()) {
                response.sendError(captchaClient.getFailedStatusCode(), 
                    "Captcha verification failed: " + output.getErrorMessage());
                return;
            }
            
            // Process the form...
            response.getWriter().println("Form submitted successfully!");
            
        } catch (Exception e) {
            response.sendError(captchaClient.getFailedStatusCode(), 
                "Captcha verification error");
        }
    }
}
```

#### Spring MVC

```java
@RestController
public class FormController {
    
    private final PrivateCaptchaClient captchaClient = new PrivateCaptchaClient(
        new PrivateCaptchaConfiguration(System.getenv("PC_API_KEY"))
    );
    
    @PostMapping("/submit-form")
    public ResponseEntity<String> submitForm(HttpServletRequest request) {
        try {
            VerifyOutput output = captchaClient.verifyRequest(request::getParameter);
            
            if (!output.ok()) {
                return ResponseEntity.status(captchaClient.getFailedStatusCode())
                    .body("Captcha verification failed: " + output.getErrorMessage());
            }
            
            return ResponseEntity.ok("Form submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(captchaClient.getFailedStatusCode())
                .body("Captcha verification error");
        }
    }
}
```

#### Spring WebFlux

```java
@RestController
public class FormController {
    
    private final PrivateCaptchaClient captchaClient = new PrivateCaptchaClient(
        new PrivateCaptchaConfiguration(System.getenv("PC_API_KEY"))
    );
    
    @PostMapping("/submit-form")
    public Mono<ResponseEntity<String>> submitForm(ServerWebExchange exchange) {
        return exchange.getFormData().map(formData -> {
            try {
                VerifyOutput output = captchaClient.verifyRequest(formData::getFirst);
                
                if (!output.ok()) {
                    return ResponseEntity.status(captchaClient.getFailedStatusCode())
                        .body("Captcha verification failed");
                }
                
                return ResponseEntity.ok("Form submitted successfully!");
            } catch (Exception e) {
                return ResponseEntity.status(captchaClient.getFailedStatusCode())
                    .body("Captcha verification error");
            }
        });
    }
}
```

#### Vert.x

```java
router.post("/submit-form").handler(ctx -> {
    try {
        VerifyOutput output = captchaClient.verifyRequest(ctx.request()::getParam);
        
        if (!output.ok()) {
            ctx.response()
                .setStatusCode(captchaClient.getFailedStatusCode())
                .end("Captcha verification failed");
            return;
        }
        
        ctx.response().end("Form submitted successfully!");
    } catch (Exception e) {
        ctx.response()
            .setStatusCode(captchaClient.getFailedStatusCode())
            .end("Captcha verification error");
    }
});
```

#### Javalin

```java
app.post("/submit-form", ctx -> {
    try {
        VerifyOutput output = captchaClient.verifyRequest(ctx::formParam);
        
        if (!output.ok()) {
            ctx.status(captchaClient.getFailedStatusCode())
               .result("Captcha verification failed");
            return;
        }
        
        ctx.result("Form submitted successfully!");
    } catch (Exception e) {
        ctx.status(captchaClient.getFailedStatusCode())
           .result("Captcha verification error");
    }
});
```
