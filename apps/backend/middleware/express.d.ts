declare namespace Express {
   export interface Request {
      tenant?: string,
      userId?: string
   }
}