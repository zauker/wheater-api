import { Router, Request, Response } from 'express';
import ctrl from 'app/controllers/api.controller';
const router = Router();

router.get('/forecast', ctrl.forecast);

export default router;