import {z} from "zod";

const SignupSchemaStep2 = z.object({
    password: z.string().nonempty("Password is required").min(8,{message:"Password must be atleast 8 characters long."}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
    confirmPassword: z.string().nonempty("This field is required.").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:"Passwords do not match"})
});

export default SignupSchemaStep2;

export type SignupFormType = z.infer<typeof SignupSchemaStep2>;
