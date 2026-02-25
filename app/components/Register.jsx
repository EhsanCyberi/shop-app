"use client"
import { useState } from "react"

export default function Register() {
    let [message, setMessage] = useState("")
    let [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    function changeHandler(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function sendData(e) {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(user)
            })
            const resData = await res.json();
            if (res.ok) {
                setMessage(resData.message)
            } else {
                setMessage(resData.error)
            }
        } catch (error) {
            setMessage("اطلاعات ارسال نشد" + error)
        }
    }
    
    return (
        <div>
            <form className="align" onSubmit={sendData}>
                <div className="form">
                    <input
                        required
                        name="name"
                        onChange={changeHandler}
                        type="text"
                        className="input"
                        placeholder="نام کاربری"
                    />
                    <input
                        required
                        name="email"
                        onChange={changeHandler}
                        type="email"
                        className="input"
                        placeholder="ایمیل"
                    />
                    <input
                        required
                        minLength={6}
                        name="password"
                        onChange={changeHandler}
                        type="password"
                        className="input"
                        placeholder="رمز عبور"
                    />
                    <button className="button-cart">ثبت نام</button>
                    <span style={{color: "red"}} className="center">
                        <small>
                            {message}
                        </small>
                    </span>
                </div>
            </form>
        </div>
    )
}