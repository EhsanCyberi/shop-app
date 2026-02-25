"use client"

import { CartContex } from "@/context/CartContex"
import { useContext, useState } from "react"
export default function AddToCartButton({product, user}) {
    let {addToCart} = useContext(CartContex)
    const [alert, setAlert] = useState(false)

    const handleClick = () => {
        if(user) {
            addToCart(product)
        } else {
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 3000);
        }
    }

    return (
        <div>
            <button className="button" onClick={handleClick}>افزودن به سبد خرید</button>
            { alert && (<div className="alert activate">لطفا ابتدا وارد شوید</div> )}
        </div>
    )
}