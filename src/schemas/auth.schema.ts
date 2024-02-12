import {z} from "zod";

// User registration validation
export const registerSchema = z.object({
    username: z.string({
        required_error: "username is required"
    }),
     email: z.string({
         required_error: "Email is required"
     }).email({
         message: "The email is invalid"
     }),
     password: z.string({
         required_error: "Password is required"
     }).min(6,{
         message:"Password must be at least 6 characters"
     }),
});

// Doctor registration validation
export const SchemaDoctor = z.object({
    username: z.string({
        required_error: "Email is required"
    }),
     email: z.string({
         required_error: "Email is required"
     }).email({
         message: "The email is invalid"
     }),
     password: z.string({
         required_error: "Password is required"
     }).min(6,{
         message:"Password must be at least 6 characters"
     }),
     speciality: z.string({
        required_error: "Speciality is required"
    }),
    identification: z.string({
       required_error: "identification is required"
   })
});

// login
export const loginSchema = z.object({
    username: z.string({
        required_error: "username is required"
    }),
     email: z.string({
         required_error: "Email is required"
     }).email({
         message: "The email is invalid"
     }),
     password: z.string({
         required_error: "Password is required"
     }).min(6,{
         message:"Password must be at least 6 characters"
     }),
});