import Doctor, { IDoctor } from '../models/doctor.model'
import User, { IUser } from '../models/auth.model'
import { Request, Response } from "express";


export const getUsers = async(_req: Request, res: Response):Promise<any> => {
    try {
        const users: IUser[] = await User.find().lean(); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error while fetching users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getDoctors = async(_req: Request, res: Response) => {
    try {
        const doctors: IDoctor[] = await Doctor.find().lean(); 
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error while fetching doctors: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, password, rol } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;
        if (rol) user.rol = rol;

        await user.save();
        return res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateDoctor = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id)
        const { username, email, password, rol, speciality, identification } = req.body;

        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (username) doctor.username = username;
        if (email) doctor.email = email;
        if (password) doctor.password = password;
        if (speciality) doctor.speciality = rol;
        if (identification) doctor.identification = identification

        await doctor.save();
        return res.status(200).json({ message: 'Usuario actualizado exitosamente', doctor });
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    try{
        const Id = req.params.id
        const response = await User.findByIdAndDelete(Id)
        res.status(200).json(response)
    } catch(error){
        console.error('Error while deleting user: ', error)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}

export const deleteDoctor = async(req: Request, res: Response) => {
    try{
        const Id = req.params.id
        const response = await Doctor.findByIdAndDelete(Id)
        res.status(200).json(response)
    } catch(error){
        console.error('Error while deleting doctor: ', error)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}
