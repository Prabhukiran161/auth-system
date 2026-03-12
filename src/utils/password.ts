import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const generateHash = async (input: string): Promise<string> => {
  return bcrypt.hash(input, SALT_ROUNDS);
};

export const compareHash = async (
  input: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(input, hash);
};
