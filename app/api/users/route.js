import { connToDb } from "@/configs/mongodb";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connToDb()
        const users = await Users.find({})
        return NextResponse.json(
            users,
            {status: 200},
        )
    } catch (err) {
        return NextResponse.json(
            {error: "خطا در دریافت اطلاعات کاربران از دیتابیس: " + err},
            {status: 500},
        )
    }
}

export async function PUT(req) {
    try {
        await connToDb()
        const data = await req.json()
        const user = await Users.findById(data._id)
        if (data.role == "user") {
            Object.assign(user, {
                role: "admin"
            })
        } else {
            Object.assign(user, {
                role: "user"
            })
        }
        await user.save()
        return NextResponse.json(
            {status: 200},
        )
    } catch (err) {
        return NextResponse.json(
            {error: "خطا در ویرایش نقش کاربر" + err},
            {status: 200},
        )
    }
}