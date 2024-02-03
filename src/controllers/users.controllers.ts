// import mongoose from "mongoose"

// import User from '../models/auth.schema'
// import Doctor from '../models/doctor.schema'


export const getUsers = async(_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Mostrar usuarios registrados");
}

export const getDoctors = async(_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Mostrar Doctores registrados");
}


export const updateUser = async(_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Actualizar usuarios");
}

export const updateDoctor = async(_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Actualizar doctores");
}

export const deleteUser = async(_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Eliminar usuarios");
}

export const deleteDoctor = async(_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Eliminar doctores");
}
