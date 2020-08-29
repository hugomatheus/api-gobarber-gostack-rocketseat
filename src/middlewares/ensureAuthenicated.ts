import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenicated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  /*
   * authHeader == Bearer tokenEnviadoNoHeaderDaRequest
   * const [type, token] = authHeader.split(' ');
   * type == Bearer | token == tokenEnviadoNoHeaderDaRequest
   */

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}

export default ensureAuthenicated;
