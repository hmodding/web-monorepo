import User from './User';
import {JwtPayload} from "jwt-decode";
import {UserRole} from "../../../shared/types/UserRole";

export default interface JwtState extends JwtPayload {
  username?: string;
}

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}
