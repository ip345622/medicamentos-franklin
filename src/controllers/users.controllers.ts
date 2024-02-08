import { Request, Response } from "express"
// import mongoose from "mongoose"

import User from '../models/auth.model'
import Doctor from '../models/doctor.model'
import mongoose from "mongoose";


export const getUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(200).json({message: 'Not found users'});
        }
        return res.json(users);
    } catch (error) {
        return res.status(500).json("Error del servidor");
    }
}


export const getDoctors = async(_req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find();
        if (doctors.length === 0) {
            return res.status(200).json({message: 'Not found doctors'});
        }
        return res.json(doctors);
    } catch (error) {
        return res.status(500).json("Error del servidor");
    }
}


export const updateUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID no válido'});
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({message: 'User not found'});
    return res.json(user);
};


export const updateDoctor = async(req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID no válido'});
    }
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    if (!doctor) return res.status(404).json({message: 'User not found'});
    return res.json(doctor);
}

export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID no válido'});
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({message: 'Doctor not found'});
    return res.sendStatus(204);
}

export const deleteDoctor = async(req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID no válido'});
    }
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return res.status(404).json({message: 'Doctor not found'});
    return res.sendStatus(204);
}
