import { Router } from 'express';
import ctrl from '../controllers/api.controller';
const router = Router();

router.get('/forecast', ctrl.forecast);

export default router;