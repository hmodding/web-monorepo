export interface LoginDto {
  username: string;
  password: string;
  deviceInfo?: { [key: string]: any }; // Record<string, any> doesn't work
}
