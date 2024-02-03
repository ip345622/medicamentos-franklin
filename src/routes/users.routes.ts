import { Router } from "express";
import { getUsers,getDoctors,updateDoctor,updateUser,deleteDoctor,deleteUser } from "../controllers/users.controllers";

const router = Router();

router.get('/users',getUsers);
router.get('/doctor',getDoctors);

router.put('/user/:id',updateUser);
router.put('/doctor/:id',updateDoctor);

router.delete('/user/:id',deleteUser);
router.delete('/doctor/:id',deleteDoctor);


export default router;