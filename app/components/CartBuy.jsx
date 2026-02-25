"use client"
import EditNumber from "@/components/EditNumber";
import { CartContex } from "@/context/CartContex";
import { useContext, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";

function formater(num) {
    return new Intl.NumberFormat("fa-IR").format(num);
}



export default function CartBuy({user}) {
    console.log("users data: ", user?.name);
    
    let {cart, totalPrice, removeFromCart, clearCart} = useContext(CartContex)

    let [users, setUsers] = useState({
        name: user?.name,
        email: user?.email,
        city: "",
        address: "",
        postalCode: "",
    })


    function changeHanler(e) {
        setUsers({...users, [e.target.name]: e.target.value})
    } 

    async function submitDataOrder(e) {
        e.preventDefault()
        const orderData = {
            user: users,
            cart,
            totalPrice: totalPrice()
        }

        const response = await fetch("https://shop-apps-omega.vercel.app/api/orders", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(orderData)
        })
        if (response.ok) {
            alert("سفارش شما ثبت شد")
            clearCart()
            setUsers({
                name: "",
                email: "",
                city: "",
                address: "",
                postalCode: "",
            })
        } else {
            alert("خطا در ثبت سفارش")
        }
        
    }

    return (
        <div className="colum">
            <div className="cart">
                <h2 className="center">سبد خرید</h2>
                <div className="over">
                    {cart.length == 0 && <div className="center"> سبد خرید خالی است </div>}
                    { cart.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={2} className="right paddings">
                                    <strong>کالا</strong>
                                </th>
                                <th colSpan={2} className="right paddings">
                                    <strong>تعداد</strong>
                                </th>
                                <th className="center paddings">
                                    <strong>قیمت</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(
                                    (product) => (
                                        <tr key={product._id} className="cart-product">
                                            <td className="td-cart">
                                                <img className="new-img" src={product.image} width={100} height={100} alt={product.title}/>
                                            </td>
                                            <td className="right">
                                                {product.title}
                                            </td>
                                            <td>
                                                <EditNumber numbers={product._id}/>
                                            </td>
                                            <td>
                                                <button onClick={() => removeFromCart(product._id)} className="button-delete">
                                                    <DeleteIcon/>
                                                </button>
                                            </td>
                                            <td className="center">
                                                {formater(product.price)}
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                            <tr>
                                <td colSpan={4} className="paddings"><strong>مجموع خرید</strong></td>
                                <td className="center paddings"><strong>{formater(totalPrice())}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
            {cart.length > 0 && (
            <div className="cart">
                <h2 className="center">اطلاعات شما</h2>
                <form className="align" onSubmit={submitDataOrder}>
                    <div className="form">
                        <input
                            required
                            name="city"
                            onChange={changeHanler}
                            type="text"
                            className="input"
                            placeholder="شهر"
                        />
                        <input
                            required
                            name="address"
                            onChange={changeHanler}
                            type="text"
                            className="input"
                            placeholder="آدرس"
                        />
                        <input
                            required
                            name="postalCode"
                            onChange={changeHanler}
                            type="number"
                            className="input"
                            placeholder="کد پستی"
                        />
                        <button className="button-cart">خرید آنلاین</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    )
}