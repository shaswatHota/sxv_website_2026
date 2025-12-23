import {z} from "zod";

export const LoginSchema = z.object({
    email : z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(8,{message:"Password must be atleast 8 characters long."}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  })
});

export type LoginFormType = z.infer<typeof LoginSchema>; 
