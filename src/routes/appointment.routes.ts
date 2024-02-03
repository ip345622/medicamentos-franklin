import { Router } from "express";
import { createAppointment ,getAppointments, getAppointment,updateAppointments, deleteAppointments } from "../controllers/appointment.controllers";

const router =  Router();

router.post('/appointments',createAppointment);
router.get('/appointments',getAppointments);
router.get('/appointments/:id',getAppointment);
router.put('/appointments/:id',updateAppointments);
router.delete('/appointments/:id',deleteAppointments);


export default router;