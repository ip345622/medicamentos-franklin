import User from '../models/auth.model';
import Doctor from '../models/doctor.model';

export async function ValidateExisting(email: string): Promise<{ success: boolean, message: string }> {
    const userFound = await User.findOne({ email: email });
    const userDoctor = await Doctor.findOne({ email: email });
    if (userFound || userDoctor) return { success: true, message: 'The user existing' };


    return { success: false, message: 'No existing user found' };
}

  