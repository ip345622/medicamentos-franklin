import { Router } from "express";

import { register,registerDoctor,login,logout } from "../controllers/auth.controllers";


const router = Router();

router.post('/register',register);
router.post('/registerDoctor',registerDoctor);
router.post('/login',login);
router.post('/logout',logout);


export default router;