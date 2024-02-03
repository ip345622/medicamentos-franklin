// import mongoose from "mongoose"

// import User from '../models/auth.schema'
// import Doctor from '../models/doctor.schema'

export const register = async (_req: any,res: { send: (arg0: string) => void }) => {
    res.send("Registrar usuario y administrador");
}

export const registerDoctor = (_req: any, res: { send: (arg0: string) => void }) => {
    res.send("Registrar doctores");
}


export const login = (_req: any, res: { send: (arg0: string) => void }) => {
    res.send("Login En general");
}

export const logout = (_req: any, res: { send: (arg0: string) => void }) => {
    res.send("Cerrar sesión");
}