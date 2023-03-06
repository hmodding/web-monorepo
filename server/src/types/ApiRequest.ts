import {Request as ExRequest} from 'express';
import {AuthtokenPayload} from "AuthtokenPayload";

export interface ApiRequest extends ExRequest {
  jwt: AuthtokenPayload
}