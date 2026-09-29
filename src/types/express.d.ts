declare global {
  namespace Express {
    interface Request {
      user?: UserTokenPayload;
    }
  }
}

export {};
