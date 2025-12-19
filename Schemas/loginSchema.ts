import {z} from "zod";

export const LoginSchema = z.object({
    email : z.string().nonempty("Email is required").email("Invalid email address"),
    password : z.string().nonempty("Password is required").min(8,{message:"Password must be atleast 8 characters long"}).regex(/^\d+$/, "Phone number should only contain digits.")
});

export type LoginFormType = z.infer<typeof LoginSchema>; 