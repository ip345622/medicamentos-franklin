//import mongoose from "mongoose";
import { Request, Response } from "express";
import Appointment,{ Iappointment } from "../models/appointment.schema";
import Doctor from '../models/doctor.model';
import User from '../models/auth.model'




export const createAppointment = async(req: Request, res: Response):Promise<any> => {
    try {
        const { id_user, id_doctor, data, time } = req.body;

        const newAppointment = new Appointment({
            id_user,
            id_doctor,
            data,
            time,
        });

        const savedAppointment = await newAppointment.save();

        return res.status(201).json({ message: 'Appointment created successfully', appointment: savedAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAppointments = async (_req: Request, res: Response): Promise<any> => {
    try {
        const appointments: Iappointment[] = await Appointment.find().lean();

        // Obtener los IDs únicos de los doctores en las citas
        const doctorIds = Array.from(new Set(appointments.map(appointment => appointment.id_doctor)));
        const userIds = Array.from(new Set(appointments.map(appointment => appointment.id_user)));

        // Obtener los nombres de los doctores
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).lean();
        const users = await User.find({ _id: { $in: userIds } }).lean();
        
        const appointmentsWithNames = appointments.map(appointment => {
            const doctor = doctors.find(doctor => doctor._id.toString() === appointment.id_doctor);
            const user = users.find(user => user._id.toString() === appointment.id_user.toString());
            // console.log(user);
            return { ...appointment, doctorName: doctor ? doctor.username : 'Doctor no encontrado', userName: user ? user.username : 'Usuario no encontrado' };
        });
        
        // console.log(doctors,users);
        // if(a)
        
        res.status(200).json(appointmentsWithNames);
        
    } catch (error) {
        console.error('Error fetching appointments: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAppointment = async(req: Request, res: Response):Promise<any> => {
    try {
        const { id } = req.params
        const appointment: null | Iappointment[] = await Appointment.findById(id).lean()

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }

        res.status(200).json(appointment)
    } catch (error) {
        console.error('Error fetching appointments: ', error)
        res.status(500).json({ error: 'Internal Server Error',})
    }
}

export const updateAppointments = async(req: Request, res: Response):Promise<any> => {
      try {
        const { id } = req.params;
        const { id_user, id_doctor, data, time } = req.body
        console.log(id)

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (id_user) appointment.id_user = id_user;
        if (id_doctor) appointment.id_doctor = id_doctor;
        if (data) appointment.data = data;
        if (time) appointment.time = time;

        await appointment.save();
        return res.status(200).json({ message: 'Appointment succesfully updated', appointment });
    } catch (error) {
        console.error('Error Updating Appointment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteAppointments = async(req: Request, res: Response):Promise<any> => {
    try{
        const { id } = req.params
        const response = await Appointment.findByIdAndDelete(id)
        res.status(200).json(response)
    } catch(error){
        console.error('Error while deleting appointment: ', error)
        res.status(500).json({ error: 'Internal Server Error'})
    }
}