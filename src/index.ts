import * as crypto from "crypto";
import { DecodeReponse, EncodeReponse } from "./type";
const base64UrlEncode = (input: string): string => {
  return input.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

const base64UrlDecode = (input: string): string => {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  switch (input.length % 4) {
    case 2:
      input += "=";
      break;
    case 3:
      input += "==";
      break;
  }
  return Buffer.from(input, "base64").toString();
};

const encode = (secret: string, header: object, payload: object): string => {
  const headerBase64 = base64UrlEncode(
    Buffer.from(JSON.stringify(header)).toString("base64")
  );
  const payloadBase64 = base64UrlEncode(
    Buffer.from(JSON.stringify(payload)).toString("base64")
  );
  const data = `${headerBase64}.${payloadBase64}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");
  const signatureBase64 = base64UrlEncode(signature);

  return `${data}.${signatureBase64}`;
};

const decode = (secret: string, token: string) => {
  const [headerBase64, payloadBase64, signatureBase64] = token.split(".");
  const data = `${headerBase64}.${payloadBase64}`;

  const signatureCheck = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");
  const signatureCheckBase64 = base64UrlEncode(signatureCheck);

  if (signatureBase64 !== signatureCheckBase64)
    throw new Error("Invalid token signature");
  const header = JSON.parse(base64UrlDecode(headerBase64));
  const payload = JSON.parse(base64UrlDecode(payloadBase64));
  const { id, iat, exp, aud, iss, ...payloadWithoutId } = payload;
  return { header, _id: id, iat, exp, payload: payloadWithoutId, aud, iss };
};

export const genToken = (
  secret: string,
  id: string | number,
  payload: object,
  ttl?: number,
  aud?: string,
  iss?: string
): EncodeReponse => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const issuedAt = Math.floor(Date.now() / 1000);

  const jwtPayload = {
    ...payload,
    id,
    iat: issuedAt,
    ...(ttl ? { exp: issuedAt + ttl } : { exp: issuedAt }),
    ...(aud ? { aud } : {}),
    ...(iss ? { iss } : {}),
  };
  try {
    const token: string = encode(secret, header, jwtPayload);
    return { success: true, token };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const decodeToken = (secret: string, token: string): DecodeReponse => {
  try {
    const { _id, iat, exp, payload, aud, iss } = decode(secret, token);
    if (exp && exp <= Math.floor(Date.now() / 1000))
      throw new Error("Oops! Token Expired");
    return {
      success: true,
      id: _id,
      payload: { ...payload },
      aud,
      iss,
      created_at: iat * 1000,
      expires_at: exp * 1000,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const validateToken = (
  secret: string,
  token: string,
  expectedAud?: string,
  expectedIss?: string
): boolean => {
  try {
    const { exp, aud, iss } = decode(secret, token);
    if (
      exp &&
      exp >= Math.floor(Date.now() / 1000) &&
      (expectedAud ? aud === expectedAud : true) &&
      (expectedIss ? iss === expectedIss : true)
    )
      return true;
    return false;
  } catch {
    return false;
  }
};
