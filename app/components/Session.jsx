// lib/session.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Users from "@/models/Users";
import { cache } from "react";
import "server-only";

// کش فقط برای پیدا کردن کاربر از روی id (memoization داخل یک درخواست)
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
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    // jwt.verify معمولاً sync است، پس await لازم نیست
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded.id رو به string تبدیل می‌کنیم (اگر ObjectId باشد)
    const userId = decoded.id?.toString?.() || decoded.id;

    // از تابع کش‌شده استفاده می‌کنیم
    const user = await getUserById(userId);

    return user;
  } catch (err) {
    console.error("session verify error:", err);
    return null;
  }
}