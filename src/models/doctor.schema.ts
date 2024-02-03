import mongoose from "mongoose";




const doctorSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
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

export default mongoose.model('Doctor',doctorSchema);