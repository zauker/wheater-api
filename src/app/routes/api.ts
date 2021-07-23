import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', ( req: Request, res: Response ) => {
  res.send('API route!');
});

export default router;