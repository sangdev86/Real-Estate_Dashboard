export interface IPayload {
  data?: any;
  message?: string | null | undefined;
  error?: string;
  key?: undefined | string;
  isResponseError?: boolean;
}
