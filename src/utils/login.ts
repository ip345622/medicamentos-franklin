import User from '../models/auth.schema';
import Doctor from '../models/doctor.schema';
import bcrypt from "bcryptjs";

export interface LoginResult {
    success: boolean;
    message: string;
  }
  
export  async function loginUser(email: string, password: string): Promise<LoginResult> {
    try {
      // Buscar en la base de datos de usuarios
      const user = await User.findOne({ email });
  
      if (user) {
        // Si el correo pertenece a un usuario, verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          return { success: true, message: 'Inicio de sesión exitoso como usuario.' };
        } else {
          return { success: false, message: 'Contraseña incorrecta.' };
        }
      }
  
      // Si no se encuentra en la base de datos de usuarios, buscar en la de doctores
      const doctor = await Doctor.findOne({ email });
  
      if (doctor) {
        // Si el correo pertenece a un doctor, verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, doctor.password);
  
        if (passwordMatch) {
          return { success: true, message: 'Inicio de sesión exitoso como doctor.' };
        } else {
          return { success: false, message: 'Contraseña incorrecta.' };
        }
      }
  
      // Si no se encuentra en ninguna de las bases de datos
      return { success: false, message: 'Usuario no encontrado.' };
    } catch (error) {
      return { success: false, message: 'Error al iniciar sesión.' };
    }
  }
  

 