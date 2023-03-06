import {JwtPayload} from "jsonwebtoken";

export interface AuthtokenPayload extends JwtPayload {
  username: string;
}