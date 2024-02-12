import {Schema, model, Document} from 'mongoose';
import bcrypt from "bcryptjs";



export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    rol: string;
    // metodos
    encryptPassword(password:string): Promise<string>;
    validatePassword(password:string): Promise<boolean>;
}


const userSchema =new Schema({
    username:{
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['user', 'administrator'],
        default: 'user',
    }
},
{
    timestamps: true,
  }
)

// Encriptar la contraseña a través del schema ya creado
userSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    // Generar la sal de forma asíncrona
    const salt = await bcrypt.genSalt(10);
  
    const hashedPassword = await bcrypt.hash(password, salt);
  
    return hashedPassword;
  };

// Validar la contraseña
userSchema.methods.validatePassword = async function  (password: string): Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}

export default model<IUser>('User',userSchema);