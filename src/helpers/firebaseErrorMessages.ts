const matchesRegex = (str: string) => (regEx: RegExp) => {
  return Boolean(str.match(regEx));
};

export const getAuthErrorMessage = (errorMessage: string) => {
  const errorMatch = matchesRegex(errorMessage);
  if (errorMatch(/email-already-exists/g)) {
    return "El correo ya está registrado";
  }
  if (errorMatch(/invalid-email/g)) {
    return "El correo ingresado no es válido";
  }
  if (errorMatch(/invalid-password/g)) {
    return "Contraseña inválida";
  }
  if (errorMatch(/user-not-found/g)) {
    return "Este correo aún no está registrado";
  }
  return "Error, por favor intentalo de nuevo";
};
