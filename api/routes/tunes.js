import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('list of tunes here');
});

router.post('/', (req, res) => {
  console.log(req);
});

export default router;