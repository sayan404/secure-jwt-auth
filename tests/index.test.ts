import { genToken, decodeToken, validateToken } from "../dist/index";
import {
  ErrorDecodeResponse,
  SuccessEncodeResponse,
  DecodeResponse,
  EncodeResponse,
} from "../dist/type";

const secret = "your-256-bit-secret";
const id = "12345";
const payload = { data: "test" };
const ttl = 3600;
const audience = "https://myapi.example.com";
const issuer = "https://auth.example.com";

describe("JWT Package", () => {
  let token: string;

  test("should encode a JWT with given payload, aud, iss, and ttl", () => {
    const result: EncodeResponse = genToken(
      secret,
      id,
      payload,
      ttl,
      audience,
      issuer
    );
    expect(result.success).toBe(true);

    if (result.success) {
      token = (result as SuccessEncodeResponse).token;
      expect(typeof token).toBe("string");
    }
  });

  test("should validate a JWT with correct aud and iss", () => {
    const isValid = validateToken(secret, token, audience, issuer);
    expect(isValid).toBe(true);
  });

  test("should invalidate a JWT with incorrect aud", () => {
    const isValid = validateToken(
      secret,
      token,
      "https://wrongapi.example.com",
      issuer
    );
    expect(isValid).toBe(false);
  });

  test("should invalidate a JWT with incorrect iss", () => {
    const isValid = validateToken(
      secret,
      token,
      audience,
      "https://wrongauth.example.com"
    );
    expect(isValid).toBe(false);
  });

  test("should invalidate an expired JWT", () => {
    const expiredTokenResponse: EncodeResponse = genToken(
      secret,
      id,
      payload,
      -1,
      audience,
      issuer
    ); // Token that expires immediately
    if (expiredTokenResponse.success) {
      const result: DecodeResponse = decodeToken(
        secret,
        (expiredTokenResponse as SuccessEncodeResponse).token
      );
      expect(result.success).toBe(false);

      if (!result.success) {
        const errorResult = result as ErrorDecodeResponse;
        expect(errorResult.message).toBe("Oops! Token Expired");
      }
    }
  });
});
