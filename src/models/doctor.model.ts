import {Schema,model,Document} from "mongoose";
import bcrypt from "bcryptjs";

export interface IDoctor extends Document{
    username:string;
    email:string;
    password:string;
    speciality:string;
    identification:string;
    // metodos
    encryptPassword(password:string): Promise<string>;
    validatePassword(password:string): Promise<boolean>;
}

const doctorSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    },
    speciality:{
        type: String,
        required: true,
    },
    identification:{
        type: String,
        required: true,
    }
},
{
  timestamps: true,
}
);

// Encriptar la contraseña a través del schema ya creado
doctorSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    // Generar la sal de forma asíncrona
    const salt = await bcrypt.genSalt(10);
  
    const hashedPassword = await bcrypt.hash(password, salt);
  
    return hashedPassword;
  };

// Validar la contraseña
doctorSchema.methods.validatePassword = async function  (password: string): Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}

export default model<IDoctor>('Doctor',doctorSchema);