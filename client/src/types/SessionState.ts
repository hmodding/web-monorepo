import User from './User';
import {JwtPayload} from "jwt-decode";
import {UserRole} from "../../../shared/types/UserRole";

export default interface SessionState extends JwtPayload {
  username?: string;
  role?: UserRole;
}

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}
