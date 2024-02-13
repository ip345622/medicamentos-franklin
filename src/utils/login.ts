import User from '../models/auth.model';
import Doctor from '../models/doctor.model';
import bcrypt from "bcryptjs";

export interface LoginResult {
    success: boolean;
    message: string;
    data: string;
  }
  
export  async function loginUser(email: string, password: string): Promise<LoginResult> {
    try {
      // Buscar en la base de datos de usuarios
      const user = await User.findOne({ email });
  
      if (user) {
        // Si el correo pertenece a un usuario, verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          return { success: true, message: user.rol, data: user.rol};
        } else {
          return { success: false, message: 'Contraseña incorrecta.', data: '' };
        }
      }
  
      // Si no se encuentra en la base de datos de usuarios, buscar en la de doctores
      const doctor = await Doctor.findOne({ email });
  
      if (doctor) {
        // Si el correo pertenece a un doctor, verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, doctor.password);
  
        if (passwordMatch) {
          return { success: true, message: 'Doctor', data: doctor._id };
        } else {
          return { success: false, message: 'Contraseña incorrecta.', data: ''};
        }
      }
  
      // Si no se encuentra en ninguna de las bases de datos
      return { success: false, message: 'Usuario no encontrado.', data: '' };
    } catch (error) {
      return { success: false, message: 'Error al iniciar sesión.', data: '' };
    }
  }
  

 