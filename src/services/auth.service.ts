import { AppError } from "../error/AppError.js";
import { generateToken } from "../lib/jwt.js";
import {
  CreateUser,
  findUserByEmail,
  findEmailWithPassword,
} from "../repositories/user.repository.js";
import { User, userSchema } from "../types/user.js";
import bcrypt from "bcrypt";
export async function registerUser(
  email: string,
  password: string,
): Promise<void> {
  if (!email || !password) {
    throw new AppError(400, "username or password is invalid");
  }

  //find user if its already present then we dont want another user to login with same account or email id
  //1 st find the user by email
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError(409, "Email already present"); //409 conflict
  }
  const passoword_hash = await bcrypt.hash(password, 10);
  await CreateUser(email, passoword_hash);
}

export async function LoginUser(
  email: string,
  password: string,
): Promise<{ accessToken: string }> {
  if (!email || !password) {
    throw new AppError(400, "Email and password are required");
  }

  const user = await findEmailWithPassword(email);

  if (!user?.password_hash) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  const accessToken = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  console.log(accessToken);
  return { accessToken };
}
