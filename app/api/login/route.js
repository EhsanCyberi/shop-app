import { connToDb } from "@/configs/mongodb";
import Users from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await connToDb()

    const userData = await req.json()

    const userDb = await Users.findOne({
        email: userData.email
    })

    if (!userDb) {
        return NextResponse.json(
            {error: "حسابی با چنین ایمیلی وجود ندارد"},
            {status: 401},
        )
    }
    
    const isMatch = await bcrypt.compare(userData.password, userDb.password)
    
    if (!isMatch) {
        return NextResponse.json(
            {error: "رمز عبور نادرست است"},
            {status: 401},
        )
    }

    const token = jwt.sign(
        {id: userDb._id ,name: userDb.name ,email: userDb.email ,role: userDb.role},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    const response = NextResponse.json({message: "ورود موفقیت آمیز"})

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
    return response;
}