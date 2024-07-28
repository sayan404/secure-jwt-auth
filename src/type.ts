interface SuccessDecodeResponse {
  id: string | number;
  payload: object;
  created_at: number;
  expires_at: number;
  success: boolean;
  aud?: string;
  iss?: string;
}
interface ErrorDecodeResponse {
  message: string;
  success: boolean;
}
interface SuccessEncodeResponse {
  success: boolean;
  token: string;
}
interface ErrorEncodeResponse {
  success: boolean;
  message: string;
}
type DecodeResponse = SuccessDecodeResponse | ErrorDecodeResponse;
type EncodeResponse = SuccessEncodeResponse | ErrorEncodeResponse;
export type {
  SuccessDecodeResponse,
  ErrorDecodeResponse,
  SuccessEncodeResponse,
  ErrorEncodeResponse,
  DecodeResponse,
  EncodeResponse,
};
