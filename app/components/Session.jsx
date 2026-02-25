import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Users from "@/models/Users";
import { cache } from "react";
export const Session = cache( async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decode.id)
    if(!user) return null
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
  } catch(err) {
    console.log("session verify error: ", err)
    return null;
  }
})