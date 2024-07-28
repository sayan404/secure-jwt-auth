<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/uploadika-b352f.appspot.com/o/images%2Fsecure-jwt.png?alt=media&token=0f3ecf86-a6b4-49ec-a3af-7de8213ee11a" alt="secure-jwt-auth">
</p>


<br>
<br>

# secure-jwt-auth

`secure-jwt-auth` is a lightweight package for creating, decoding, and validating JSON Web Tokens (JWTs) with support for basic JWT features. It provides three core methods for JWT operations:

- `genToken`
- `decodeToken`
- `validateToken`

## Features

- **`genToken(secret: string, id: string | number, payload: object, ttl?: number , aud?: string, iss?: string ): string`**

  Creates a JWT using the provided secret, id, payload, and optional time-to-live (TTL) value. The generated token includes the specified claims and is signed using the provided secret.

- **`decodeToken(secret: string, jwt: string): { id: string | number, payload: object, expires_at: Date }`**

  Decodes a JWT back into its components, including the id and payload. Throws an error if the JWT cannot be decoded or if the signature is invalid.

- **`validateToken(secret: string, jwt: string , aud?: string, iss?: string): boolean`**

  Validates a JWT by decoding it and checking its expiry and signature. Returns `true` if the token is valid and `false` otherwise.

### Advanced Features

- **Support for Additional JWT Parameters**

  The package also supports optional JWT parameters like `aud` (audience), `iat` (issued at), and `iss` (issuer). These parameters can be used to enhance token security and validation.

## Installation

To install `secure-jwt-auth`, use npm:

```bash
npm install secure-jwt-auth
```

# Usage

### Encoding a JWT

Note : Although timeToLive is an optional parameter, we set a 1-hour validation for the token by default.

To encode a JWT, use the genToken method:

```bash
import { genToken } from 'secure-jwt-auth';

const token = genToken(SECRET, id , payload , timeToLive , audience , issuer);
```

### Decoding a JWT

To decode a JWT, use the decodeToken method:

```bash
import { decodeToken } from 'secure-jwt-auth';

const decoded = decodeToken(SECRET, token);
```

### Validating a JWT

To validate a JWT, use the validateToken method:

```bash
import { validateToken } from 'secure-jwt-auth';

const isValid = validateToken(SECRET, token);
```

## API Playground

Explore and interact with the `secure-jwt-auth` package using the API Playground set up for testing. You can experiment with encoding, decoding, and validating JWTs through the following link:

### **[API Playground on Postman](https://documenter.getpostman.com/view/23890489/2sA3kYk1S8)**

Feel free to test various endpoints and see how the package functions in different scenarios and if something weired occurs please feel free to reach out to me at sayanmajumder0002@gmail.com.
