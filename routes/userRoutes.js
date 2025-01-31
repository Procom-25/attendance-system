import express from 'express'
import { verify } from '../controllers/userController.js';
const router=express.Router();

router.post('/verify/:teamcode',verify)
export default router;