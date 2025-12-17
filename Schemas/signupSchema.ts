import {z} from "zod";

const SignupSchema = z.object({
    name: z.string().nonempty("Name is required").min(3,{message:"Name must be atleat 3 characters long"}).max(20,{message:"Name must not exceed 20 characters."}),
    email : z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(8,{message:"Password must be atleast 8 characters long."}),
    confirmPassword: z.string().nonempty("This field is required."),
    phone: z.string().nonempty("Phone number is required.").regex(/^\d+$/, "Phone number should only contain digits.").min(10, { message: "Enter valid phone number." }).max(10, { message: "Enter valid phone number." })
});

export default SignupSchema;

export type SignupFormType = z.infer<typeof SignupSchema>;
