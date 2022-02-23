import { z } from "zod";
import {
  ageValidator,
  colorValidator,
  emailValidator,
  passwordValidator,
} from "./common";

export const RegisterFormFieldsSchema = z
  .object({
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator,
    age: ageValidator,
    preferedColor: colorValidator,
    likesCats: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .transform((inputs) => {
    return {
      email: inputs.email,
      password: inputs.confirmPassword,
      age: inputs.age,
      preferedColor: inputs.preferedColor,
      likesCats: inputs.likesCats,
    };
  });

export type withConfirmationPassword<T> = T & { confirmPassword: string };

export type RegisterFormFieldsType = z.infer<typeof RegisterFormFieldsSchema>;
