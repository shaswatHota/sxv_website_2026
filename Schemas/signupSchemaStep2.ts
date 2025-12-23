import {z} from "zod";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6563e79e2a53d73faa8c35b769c152f1543086ca
const SignupSchemaStep2 = z.object({
    password: z.string().nonempty("Password is required").min(8,{message:"Password must be atleast 8 characters long."}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
    confirmPassword: z.string().nonempty("This field is required.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:"Passwords do not match"})
});

export default SignupSchemaStep2;

export type SignupFormType = z.infer<typeof SignupSchemaStep2>;
<<<<<<< HEAD
=======
const SignupSchemaStep1 = z.object({
    name: z.string().nonempty("Name is required").min(3,{message:"Name must be atleat 3 characters long"}).max(20,{message:"Name must not exceed 20 characters."}),
    email : z.string().nonempty("Email is required").email("Invalid email address"),
    phone: z.string().nonempty("Phone number is required.").regex(/^\d+$/, "Phone number should only contain digits.").min(10, { message: "Enter valid phone number." }).max(10, { message: "Enter valid phone number." })    
});

export default SignupSchemaStep1;

export type SignupFormTypeStep1 = z.infer<typeof SignupSchemaStep1>;
>>>>>>> auth
=======
>>>>>>> 6563e79e2a53d73faa8c35b769c152f1543086ca
