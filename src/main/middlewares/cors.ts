import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('acces-control-allow-origin', '*')
  res.set('acces-control-allow-methods', '*')
  res.set('acces-control-allow-headers', '*')
  next()
}
