# auth-blitz

`auth-blitz` is a lightweight package for creating, decoding, and validating JSON Web Tokens (JWTs) with support for basic JWT features. It provides three core methods for JWT operations:

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

To install `auth-blitz`, use npm:

```bash
npm install auth-blitz
```

# Usage

### Encoding a JWT

To encode a JWT, use the genToken method:

```bash
import { genToken } from 'auth-blitz';

const token = genToken(SECRET, id , payload , ttl);
```

### Decoding a JWT

To decode a JWT, use the decodeToken method:

```bash
import { decodeToken } from 'auth-blitz';

const decoded = decodeToken(SECRET, token);
```

### Validating a JWT

To validate a JWT, use the validateToken method:

```bash
import { validateToken } from 'auth-blitz';

const isValid = validateToken(SECRET, token);
```


## API Playground

Explore and interact with the `simpler-jwt-auth` package using the API Playground set up for testing. You can experiment with encoding, decoding, and validating JWTs through the following link:

### **[API Playground on Postman](https://documenter.getpostman.com/view/23890489/2sA3kYk1Mc)**

Feel free to test various endpoints and see how the package functions in different scenarios and if something weired occurs please feel free to reach out to me at sayanmajumder0002@gmail.com.
