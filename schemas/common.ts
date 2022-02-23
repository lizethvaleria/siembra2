import { z } from "zod";

/**
 * Constants
 */

export const EMAIL_MAX_LENGTH = 100;
export const EMAIL_MIN_LENGTH = 5;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 100;

/**
 * Messages
 */

export const INVALID_EMAIL_MSG = "Correo no válido";

export const tooSmallMessage = (ammount: number) =>
  `El campo debe ser mayor a ${ammount} caractéres`;

export const tooBigMessage = (ammount: number) =>
  `El campo debe ser menor a ${ammount} caractéres`;

export const wrongAge = (age: number, how: ">" | "<") =>
  `La edad debe ser ${how === "<" ? "menor" : "mayor"} a ${age}`;

/**
 * Validators
 */

export const emailValidator = z
  .string()
  .email()
  .min(EMAIL_MIN_LENGTH)
  .max(EMAIL_MAX_LENGTH);

export const passwordValidator = z
  .string()
  .min(PASSWORD_MIN_LENGTH)
  .max(EMAIL_MAX_LENGTH);

export const ageValidator = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => val > 0, { message: wrongAge(0, ">") })
  .refine((val) => val < 120, { message: wrongAge(120, "<") });

const colorEnums = z.enum(["Negro", "Gris", "Blanco"]);

export const colorValidator = colorEnums.nullable();

export const ColorOptionsArray = colorEnums.Values;

export type ColorOptions = z.infer<typeof colorValidator>;

export const errorsMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case "too_small":
      if (issue.type === "string") {
        return {
          message: tooSmallMessage(issue.minimum),
        };
      }
      break;
    case "too_big":
      if (issue.type === "string") {
        return { message: tooBigMessage(issue.maximum) };
      }
      break;
    case "invalid_string":
      if (issue.validation === "email") {
        return { message: INVALID_EMAIL_MSG };
      }
      break;
    case "invalid_type":
      if (issue.received === "undefined") {
        return { message: "El campo es necesario" };
      }
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(errorsMap);
