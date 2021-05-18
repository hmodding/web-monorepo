import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { v1 } from 'uuid';

export function validatePassword(given: string, expected: string): boolean {
  return bcrypt.compareSync(given, expected);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateToken(data: string | null = null, length: number = -1) {
  if (data === null) {
    data = v1();
  }

  const token = crypto
    .createHash('sha256')
    .update(data)
    .update(crypto.randomBytes(256))
    .digest('hex');

  return length > 0 ? token.substr(0, length) : token;
}
