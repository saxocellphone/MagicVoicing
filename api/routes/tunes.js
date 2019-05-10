import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('list of tunes here');
});

export default router;