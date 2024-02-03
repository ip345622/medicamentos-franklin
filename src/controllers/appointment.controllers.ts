// import mongoose from "mongoose";

// import appointmentSchema from "../models/appointment.schema";


export const createAppointment = async (_req: any,res: { send: (arg0: string) => void }) =>{
    res.send("Crear consultas");
}

export const getAppointments = async (_req: any,res: { send: (arg0: string) => void }) =>{
    res.send("mostrar consultas");
}

export const getAppointment = async (_req: any,res: { send: (arg0: string) => void }) =>{
    res.send("mostrar una consulta");
}

export const updateAppointments = async (_req: any,res: { send: (arg0: string) => void }) =>{
    res.send("Actualizar una consulta");
}

export const deleteAppointments = async (_req: any,res: { send: (arg0: string) => void }) =>{
    res.send("Eliminar consulta");
}