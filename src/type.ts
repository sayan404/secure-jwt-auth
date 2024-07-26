interface SuccessDecodeReponse {
  id: string | number;
  payload: object;
  created_at: number;
  expires_at: number;
  success: boolean;
  aud? : string;
  iss? : string;
}
interface ErrorDecodeResponse {
  message: string;
  success: boolean;
}
interface SuccessEncodeReponse {
  success: boolean;
  token: string;
}
interface ErrorEncodeResponse {
  success: boolean;
  message: string;
}
type DecodeReponse = SuccessDecodeReponse | ErrorDecodeResponse;
type EncodeReponse = SuccessEncodeReponse | ErrorEncodeResponse;
export type {
  SuccessDecodeReponse,
  ErrorDecodeResponse,
  SuccessEncodeReponse,
  ErrorEncodeResponse,
  DecodeReponse,
  EncodeReponse,
};
