"use client"
import { CartContex } from "@/context/CartContex";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import MenuIcon from "./icons/MenuIcon";


function formater(num) {
    return new Intl.NumberFormat("fa-IR").format(num)
}

export default function Header({user}) {
    const [navigations, setNavigations] = useState(false)
    const [userProps, setUserProps] = useState(user)
    const router = useRouter()
    const {cart} = useContext(CartContex)
    const logout = async () => {
    await fetch("http://localhost:3000/api/logout",{ 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    });
        setUserProps(null)
        document.location.href = "/auth"
    }

    const showNav = () => {
        setNavigations(!navigations)
    }

  return (
    <header className="header">
        <div className="in-header">
            <div className="section">
                <div className="nav-menu">
                    <button onClick={showNav} className="menu-icon">
                        <MenuIcon/>
                    </button>
                    {
                        navigations && (
                            <nav className="nav">
                                <div className="nav-item">
                                    <Link className="link" href={"/"}>صفحه اصلی</Link>
                                </div>
                                
                                <div className="nav-item">
                                    <Link className="link" href={"/cart"}>
                                سبد خرید
                                <span> ({formater(cart.length)})</span>
                                    </Link>
                                </div>
                                {userProps ? (
                                    <>
                                        <div className="nav-item">
                                            <button className="link" onClick={logout}>خروج از حساب</button>
                                        </div>
                                        <div className="nav-item">
                                            <Link className="link" href={"/profile"}>پروفایل</Link>
                                        </div>
                                    </>
                                    )
                                    : (
                                        <div className="nav-item">
                                            <Link className="link" href={"/auth"}>ورود</Link>
                                        </div>
                                    )}

                                    { userProps?.role == "admin" && (
                                        <div className="nav-item">
                                            <Link className="link" href={"/admin"}>مدیریت</Link>
                                        </div>
                                    )

                                    }
                            </nav>
                    )
                }
                </div>
                <Image src="/next.svg" alt="next js" width={100} height={50} />
            </div>
        </div>
    </header>
  )
}