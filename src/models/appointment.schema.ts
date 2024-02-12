import mongoose from "mongoose";

export interface Iappointment extends Document {
    id_user: string;
    id_doctor: string;
    description: string;
    status: string;
}


const appointmentSchema = new mongoose.Schema({
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    id_doctor:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'canceled', 'postponed'],
        default: 'pending',
    }
    
},
{
  timestamps: true,
}
);

export default mongoose.model('Appointment',appointmentSchema);