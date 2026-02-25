"use client"

import { CartContex } from "@/context/CartContex"
import { useContext } from "react"

function formater(num) {
    return new Intl.NumberFormat("fa-IR").format(num)
}

export default function EditNumber({numbers}) {
    let {addNumber, lessNumber, cart} = useContext(CartContex)
    let numProduct = cart.find( (item) => item._id == numbers )
    return (
        <div className="add-less">
            <button className="less" onClick={() => lessNumber(numbers)}>-</button>
            <div>{ formater(numProduct.number) }</div>
            <button className="add" onClick={() => addNumber(numbers)}>+</button>
        </div>
    )
}