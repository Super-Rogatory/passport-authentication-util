# Using Public Key Cryptography for Signatures && JSON Web Tokens

## From the jwt.io website, we can click on RS256 to ensure that we are using asymmetric cryptography.
## We should see.
- ## Encoded
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA
```
- ## Decoded -> Header
```
{
  "alg": "RS256",
  "typ": "JWT"
}
```
- ## Decoded -> Payload (includes various claims)
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```
- ## Decoded -> Signature (public and private keys - asymmetric crypt)
```
RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  ,
  PUBLIC KEY -> MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv
vkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc
aT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy
tvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0
e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb
V6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9
MwIDAQAB
  PRIVATE KEY -> MIIEogIBAAKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWw
kWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mr
m/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEi
NQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV
3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2
QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQABAoIBACiARq2wkltjtcjs
kFvZ7w1JAORHbEufEO1Eu27zOIlqbgyAcAl7q+/1bip4Z/x1IVES84/yTaM8p0go
amMhvgry/mS8vNi1BN2SAZEnb/7xSxbflb70bX9RHLJqKnp5GZe2jexw+wyXlwaM
+bclUCrh9e1ltH7IvUrRrQnFJfh+is1fRon9Co9Li0GwoN0x0byrrngU8Ak3Y6D9
D8GjQA4Elm94ST3izJv8iCOLSDBmzsPsXfcCUZfmTfZ5DbUDMbMxRnSo3nQeoKGC
0Lj9FkWcfmLcpGlSXTO+Ww1L7EGq+PT3NtRae1FZPwjddQ1/4V905kyQFLamAA5Y
lSpE2wkCgYEAy1OPLQcZt4NQnQzPz2SBJqQN2P5u3vXl+zNVKP8w4eBv0vWuJJF+
hkGNnSxXQrTkvDOIUddSKOzHHgSg4nY6K02ecyT0PPm/UZvtRpWrnBjcEVtHEJNp
bU9pLD5iZ0J9sbzPU/LxPmuAP2Bs8JmTn6aFRspFrP7W0s1Nmk2jsm0CgYEAyH0X
+jpoqxj4efZfkUrg5GbSEhf+dZglf0tTOA5bVg8IYwtmNk/pniLG/zI7c+GlTc9B
BwfMr59EzBq/eFMI7+LgXaVUsM/sS4Ry+yeK6SJx/otIMWtDfqxsLD8CPMCRvecC
2Pip4uSgrl0MOebl9XKp57GoaUWRWRHqwV4Y6h8CgYAZhI4mh4qZtnhKjY4TKDjx
QYufXSdLAi9v3FxmvchDwOgn4L+PRVdMwDNms2bsL0m5uPn104EzM6w1vzz1zwKz
5pTpPI0OjgWN13Tq8+PKvm/4Ga2MjgOgPWQkslulO/oMcXbPwWC3hcRdr9tcQtn9
Imf9n2spL/6EDFId+Hp/7QKBgAqlWdiXsWckdE1Fn91/NGHsc8syKvjjk1onDcw0
NvVi5vcba9oGdElJX3e9mxqUKMrw7msJJv1MX8LWyMQC5L6YNYHDfbPF1q5L4i8j
8mRex97UVokJQRRA452V2vCO6S5ETgpnad36de3MUxHgCOX3qL382Qx9/THVmbma
3YfRAoGAUxL/Eu5yvMK8SAt/dJK6FedngcM3JEFNplmtLYVLWhkIlNRGDwkg3I5K
y18Ae9n7dHVueyslrb6weq7dTkYDi3iOYRW8HRkIQh06wEdbxt0shTzAJvvCQfrB
jg/3747WSsf/zBTcHihTRBdAv6OmdhV4/dD5YBfLAkLrd+mX7iE=
)
```

- ## RECALL: For Identity Verification, we encrypt with the private key and decrypt with the public key

# Client-Server Conversation
## Client: "Hi server. I want to login to your application. Here is my username and password." - POST request -
## Server: "Okay, let me check your credentials"
## Server: "It seems as though your credentials are valid, I am going to create a JWT signed with my private key and give it to you" - Only the server knows the private key -
## Client: "Thank you for the JWT, I will keep this stored in my browser's local storage and attach it to all of my request"
## Client: "Hey, can I can access localhost:3000/myprofile?"
## Server: "I know we just talked, but to access that, I need to verify that JWT. Let me use my public key to verify it.."
## Server: "Looks good to me, access granted!"

# Code Example 
- ## Create a new file called issueJWT with the encoded JWT from the jwt.io website.
- ## **npm install base64url**
- ## Remember, encoded JWT are seperated by periods.
```
const base64url = require('base64url');

const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';

const jwtParts = JWT.split('.');

console.log(jwtParts);
```
- ## Output:
```
[
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0',
  'POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA'
]
```
- ## Array Destructuring
### Our jwtParts has three elements in the array, we could actually destructure these elements into variables.
```
const [headerInBase64UrlFormat, payloadInBase64UrlFormat, signatureInBase64UrlFormat] = jwtParts;
```
- ## Base64 Url Decoding
```
const decodedHeader = base64url.decode(headerInBase64UrlFormat);
const decodedPayload = base64url.decode(payloadInBase64UrlFormat);
const decodedSignature = base64url.decode(signatureInBase64UrlFormat);
```
- ## Output:
```
{"alg":"RS256","typ":"JWT"}
{"sub":"1234567890","name":"John Doe","admin":true,"iat":1516239022}
��e宿���(�$[����)�l4\e�'r�/6)�,�>�2��5�^ѳ�l�;�#s�v̂r��'Y������z
j�B�kmG�|TO���j�<���RuzcO��ka���&�k�    &��o2��e�������P�=��c�|������W�l�mjYK�դ�-
                                                                                ^5��?X���d
```
# Decrypting the Signature | Creating the JWT using crypto, base64url, and a signatureFunction. (ISSUANCE)
```
const base64url = require("base64url");
const crypto = require("crypto");
const signatureFunction = crypto.createSign("RSA-SHA256");
const fs = require("fs");
const path = require("path");

const headerObj = {
  alg: "RS256",
  typ: "JWT",
};
const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};
const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeaderFormat = base64url(headerObjString);
const base64UrlPayloadFormat = base64url(payloadObjString);

signatureFunction.write(base64UrlHeaderFormat + '.' + base64UrlPayloadFormat);
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '/priv_key.pem'), 'utf8');

const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');
const signatureBase64Url = base64url.fromBase64(signatureBase64);
```

- ## 1. Ensures that our header and payload are in JSON format
```
const headerObj = {
  alg: "RS256",
  typ: "JWT",
};
const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};
const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);
```


- ## 2. Ensures that our header and payload are in base64url format (that's the format for sending over the web)
```
const base64UrlHeaderFormat = base64url(headerObjString);
const base64UrlPayloadFormat = base64url(payloadObjString);
```

- ## 3. Utilize signature function to write the header and payload, signature will join later.
```
signatureFunction.write(base64UrlHeaderFormat + '.' + base64UrlPayloadFormat);
signatureFunction.end();
```

- ## 4. Importing our Private Key
```
const PRIV_KEY = fs.readFileSync(path.join(__dirname, '/priv_key.pem'), 'utf8');
```

- ## 5. Sign with the private key in base64 and then convert to base64url. signaturebase64url should be equivalent to our encoded signature.
```
const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');
const signatureBase64Url = base64url.fromBase64(signatureBase64);
```
# path.join() vs path.resolve()

- ## The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

- ## The path.join() method joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path.


# Verifying the signature. (VERIFICATION)
- ## When we verify a JWT, we receive the web token in base64 url format. We need to include a verifier function now.

```
const verifyFunction = crypto.createVerify("RSA-SHA256");
```
- ## Suppose we have received the JWT. This is the work flow 
```
const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';

const jwtParts = JWT.split('.');

const [headerInBase64UrlFormat, payloadInBase64UrlFormat, signatureInBase64UrlFormat] = jwtParts;

verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

const PUB_KEY = fs.readFileSync(path.join(__dirname, '/pub_key.pem'), 'utf8');

const signatureIsValid = verifyFunction.verify(PUB_KEY, jwtSignatureBase64, 'base64');

console.log(signatureIsValid);
```
# Using JSONWebToken library | npm install jsonwebtoken
## jsonwebtoken is the EASIER WAY to do this. This library abstracts away the crypto library.

# Abstractions with jwt.
- ## The jsonwebtoken library creates the header for us.
- ## Don't have to use JSON.stringify or convert to base64url.
- ## We can sign the JWT with our private key.
- ## We can then use the public key associated with our private key to verify the JWT.
```
-jwt-
const jwt = require('jsonwebtoken');
const fs = require('fs');

const PUB_KEY = fs.readFileSync(path.join(__dirname, '/pub_key.pem'), 'utf8');
const PRIV_KEY = fs.readFileSync(path.join(__dirname, '/priv_key.pem'), 'utf8');

const payloadObj = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022,
};
// ISSUANCE
const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'} );
// VERIFICATION
jwt.verify(signedJWT, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => console.log(payload));
```

## Versus
```
-crypto-
const base64url = require("base64url");
const crypto = require("crypto");
const signatureFunction = crypto.createSign("RSA-SHA256");
const verifyFunction = crypto.createVerify("RSA-SHA256");
const fs = require("fs");
const path = require("path");

// ISSUANCE //
const headerObj = {
  alg: "RS256",
  typ: "JWT",
};
const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};
const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeaderFormat = base64url(headerObjString);
const base64UrlPayloadFormat = base64url(payloadObjString);

signatureFunction.write(base64UrlHeaderFormat + '.' + base64UrlPayloadFormat);
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '/priv_key.pem'), 'utf8');

const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');
const signatureBase64Url = base64url.fromBase64(signatureBase64);

console.log(signatureBase64Url);
// END OF ISSUANCE //


// VERIFICATION

const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';

const jwtParts = JWT.split('.');

const [headerInBase64UrlFormat, payloadInBase64UrlFormat, signatureInBase64UrlFormat] = jwtParts;

verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

const PUB_KEY = fs.readFileSync(path.join(__dirname, '/pub_key.pem'), 'utf8');

const signatureIsValid = verifyFunction.verify(PUB_KEY, jwtSignatureBase64, 'base64');

console.log(signatureIsValid);

// END OF VERIFICATION //
```