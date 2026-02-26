import { connToDb } from "@/configs/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Users from "@/models/Users";
import { cache } from "react";
import "server-only";

const getUserById = cache(async (id) => {
  const user = await Users.findById(id);
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
});

export async function Session() {
  await connToDb();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id?.toString?.() || decoded.id;

    const user = await getUserById(userId);
    return user;
  } catch (err) {
    console.error("session verify error:", err);
    return null;
  }
}