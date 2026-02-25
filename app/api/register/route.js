import { connToDb } from "@/configs/mongodb";
import Users from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connToDb()
        const dataUsers = await req.json()
        if (!dataUsers.password || dataUsers.password.length < 6) {
            return NextResponse.json(
                {error: "رمز عبور باید بیش از 6 حرف باشد"},
                {status: 400}
            )
        }
        const newEmail = dataUsers.email.trim().toLowerCase()
        const validEmail = await Users.findOne({
            email: newEmail
        })
        if (validEmail) {
            return NextResponse.json(
                {error: "ایمیل قبلا ثبت شده است"},
                {status: 400}
            )
        }

        const hashedPass = await bcrypt.hash(dataUsers.password, 10)
        dataUsers.password = hashedPass
        const newUser = new Users(dataUsers)
        await newUser.save()
        return NextResponse.json(
            {message: "حساب ایجاد شد، از طریق دکمه ورود وارد حساب شوید"},
            {status: 201}
        )
    } catch (error) {
        console.error("خطا در ثبت نام" , error)
        return NextResponse.json(
            {error: "خطا در ثبت نام"},
            {status: 500}
        )
    }
}