"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register() {
    const router = useRouter()
    let [message, setMessage] = useState("")
    let [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    function changeHandler(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }


    async function login(e) {
        try {
            e.preventDefault()
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            const data = await res.json();
            if (res.ok) {
                document.location.href = "/"
            } else {
                setMessage(data.error)
            }
        } catch (error) {
            setMessage("اطلاعات ارسال نشد " + error)
        }
    }

    return (
        <div>
            <form className="align" onSubmit={login}>
                <div className="form">
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
                        name="password"
                        onChange={changeHandler}
                        type="password"
                        className="input"
                        placeholder="رمز عبور"
                    />
                    <button className="button-cart">ورود</button>
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