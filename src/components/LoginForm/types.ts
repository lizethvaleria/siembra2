export type onLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<void>;

export type onRestorePassword = (email: string) => Promise<void>;
