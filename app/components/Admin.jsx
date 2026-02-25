"use client"

import Link from "next/link"

export default function Admin() {
    return (
        <div className="center">
            <h1>پنل مدیریت</h1>
            <div className="buttons-box">
                <Link href={"/admin/products"} className="link-color">محصولات</Link>
                <Link href={"/admin/orders"} className="link-color">سفارشات</Link>
                <Link href={"/admin/users"} className="link-color">کاربران</Link>
            </div>
        </div>
    )
} 