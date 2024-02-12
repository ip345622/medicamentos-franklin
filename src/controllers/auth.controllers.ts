// import mongoose from "mongoose"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoginResult, loginUser } from "../utils/login"
import User, { IUser } from '../models/auth.model'
import Doctor, { IDoctor } from '../models/doctor.model'
import { ValidateExisting } from "../middleware/valitdateEmail";

export async function register(req: Request, res: Response): Promise<any> {
  const { email } = req.body;
  try {
    const validate = await ValidateExisting(email);
    // console.log(validate);
    if (validate.success) return res.status(400).json("The user has already been registered");
    const user: IUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol
    });
    // Ecriptar
    user.password = await user.encryptPassword(user.password);
    // guardar usuario
    const saveUser = await user.save();

    const token: string = jwt.sign({_id: saveUser._id},process.env.TOKEN_SECRET || 'your-256-bit-secret',{
      expiresIn: 60 * 60 * 24 
     });
     res.cookie("token", token);
    res.json({
      id: saveUser._id,
      username: saveUser.username,
      email: saveUser.email,
    });
  }
  catch (error) {
    res.status(500).json(error);
  }
}


export const registerDoctor = async (req: Request, res: Response): Promise<any> => {
  const {email} = req.body;
  try {
    const validate = await ValidateExisting(email);
    // console.log(validate);
    if (validate.success) return res.status(400).json("The user has already been registered");
    const doctor: IDoctor = new Doctor({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      speciality: req.body.speciality,
      identification: req.body.identification
    });
    doctor.password = await doctor.encryptPassword(doctor.password);

    const saveDoctor = await doctor.save();

    const token: string = jwt.sign({_id: saveDoctor._id},process.env.TOKEN_SECRET || 'your-256-bit-secret',{
      expiresIn: 60 * 60 * 24 
     });
     res.cookie("token", token);
    res.json({
      id: saveDoctor._id,
      username: saveDoctor.username,
      email: saveDoctor.email,
      speciality: saveDoctor.speciality,
    });

  } catch (error) {
    res.status(400).json(error);
  }
}


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const loginResult: LoginResult = await loginUser(email, password);

    if (loginResult.success) {
      // Aquí puedes manejar la respuesta exitosa según tus necesidades
      res.status(200).json({ success: true, message: loginResult.message });
      const rol = loginResult.data;
      console.log(rol);
      
      // const token: string = jwt.sign({rol: rol},process.env.TOKEN_SECRET || 'your-256-bit-secret',{
      //   expiresIn: 60 * 60 * 24 
      //  });
      //  res.cookie("token", token);

      
    } else {
      // Aquí puedes manejar la respuesta para casos de error
      res.status(401).json({ success: false, message: loginResult.message });
      const token: string = jwt.sign({_id: loginResult.data},process.env.TOKEN_SECRET || 'your-256-bit-secret',{
        expiresIn: 60 * 60 * 24 
       });
       res.cookie("token", token);

    }


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor.' });
  }
}

export const logout = (_req: Request, res: Response) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

