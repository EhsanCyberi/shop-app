import { connToDb } from "@/configs/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connToDb()

        const {user, cart, totalPrice} = await request.json()

        const newOrder = new Order({
            user,
            cart,
            totalPrice,
            status: false,
            time: new Date(),
        })

        await newOrder.save()

        return NextResponse.json({message: "سفارش با موفقیت ثبت شد", status: 201})

    } catch (err) {
        return NextResponse.json({message: "خطا در ثبت سفارش", status: 500})
    }
}

export async function GET() {
    try {
        await connToDb()
        const orders = await Order.find({})
        return NextResponse.json(orders, 
            {message: "سفارشات با موفقیت دریافت شد"},
            {status: 200},
        )
    } catch (error) {
        return NextResponse.json(
            {error: "خطا در دریافت سفارشات در دیتابیس"},
            {status: 500},
        )        
    }

}

export async function PUT(req) {
    try {
        await connToDb()
        const data = await req.json()
        const order = await Order.findById(data.id)
        Object.assign(order, {
            status: data.statusOrder
        })
        await order.save()
        return NextResponse.json(
            {status: 200},
        )
    } catch (error) {
        return NextResponse.json(
            {status: "خطا در ویرایش وضعیت سفارش: " + error},
            {status: 500},
        )

    }
}

export async function DELETE(req) {
    try {
        await connToDb()
        const orderId = await req.json()
        const order = await Order.findById(orderId)
        await order.deleteOne()
        return NextResponse.json(
            {status: 200},
        )
    } catch (error) {
        return NextResponse.json(
            {error: "خطا در حذف سفارش از دیتابیس: " + error},
            {status: 200},
        )
    }
}