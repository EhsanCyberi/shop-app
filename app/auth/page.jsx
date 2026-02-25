"use client"
import { useState } from "react"
import Login from "@/components/Login"
import Register from "@/components/Register"

export default function Page() {

    let [status, setStatus] = useState(true)
    return (
        <div className="cart">
            <h2 className="center">
                { status ? "ورود" : "ثبت نام"}
            </h2>
            <div className="center">
                <small>اطلاعات زیر را تکمیل کنید</small>
            </div>
            {
                status ? <Login/> : <Register/>
            }
            <div className="align" style={{gap: "10px", margin: "10px"}}>
                <button className="button-outline" onClick={() => setStatus(true)}>ورود</button>
                <button className="button-outline" onClick={() => setStatus(false)}>ثبت نام</button>
            </div>
        </div>
    )
}