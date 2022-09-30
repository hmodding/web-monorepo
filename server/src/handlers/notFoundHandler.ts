import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  console.log('### 404 NOT FOUND:');
  console.log(req.url, req.body);
  res.status(404).send({
    message: 'Not Found',
  });
};
