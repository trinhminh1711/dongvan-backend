import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const users = []; // giả lập database

export const registerUser = async ({ username, email, password }) => {
  const existing = users.find(u => u.email === email);
  if (existing) throw new Error("Email đã tồn tại");

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, email, password: hashed };
  users.push(user);

  return { id: user.id, username: user.username, email: user.email };
};

export const loginUser = async ({ email, password }) => {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error("Sai email hoặc mật khẩu");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Sai email hoặc mật khẩu");

  const token = generateToken({ id: user.id, email: user.email, role: "user" });
  return { token, user: { id: user.id, username: user.username, email: user.email } };
};
