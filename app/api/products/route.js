import { connToDb } from "@/configs/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connToDb()
        const {searchParams} = new URL(request.url)
        const category = searchParams.get("category")
        let products
        if (category) {
            products = await Product.find({category})
        } else {
            products = await Product.find({})
        }
        return NextResponse.json(products, {status: 200})
    } catch(err) {
        return NextResponse.json({error: "خطا در دریافت محصولات"}, {status: 500})
    }
}

export async function POST(req) {
    try {
        await connToDb();
        const data = await req.json();
        data.price = Number(data.price)
        const newProduct = new Product(data);
        await newProduct.save();
        return NextResponse.json({ message: "محصول اضافه شد" }, { status: 201 });
    } catch (error) {
        console.error("پیام خطا:", error.message);
    }
}


export async function DELETE(req) {
    try {
        await connToDb();
        const productId = await req.json();
        const getTarget = await Product.findById(productId)
        await getTarget.deleteOne()
        return NextResponse.json(
            {msg: "محصول از دیتابیس حذف شد"},
            {status: 200},
        )
    } catch (error) {
        console.error("پیام خطا:", error.message);
        return NextResponse.json(
            {error: "خطا در حذف از دیتابیس"},
            {status: 500},
        )
    }
}


export async function PUT(req) {
    try {
        await connToDb()
        const data = await req.json()
        const product = await Product.findById(data.id)
        Object.assign(product, data)
        await product.save()
        return NextResponse.json(
            {message: "با موفقیت ویرایش شد"},
            {status: 200},
        )
    } catch (error) {
        return NextResponse.json(
            {error: "اشکال در ویرایش اطلاعات محصول از دیتابیس"},
            {status: 500},
        )
    }
}