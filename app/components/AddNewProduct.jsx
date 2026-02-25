"use client"
import { useState } from "react"

export default function AddNewProduct({refHandler, handleComp}) {
    let [message, setMessage] = useState("")
    let [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        category: "",
    })

    function changeHandler(e) {
        setProduct({...product, [e.target.name]: e.target.value})
    }


    const changeStatus = () => {
        handleComp("normal")
    }

    async function addProduct(e) {
        e.preventDefault()
        try {
            const res = await fetch("https://shop-apps-omega.vercel.app/api/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(product),
                credentials: 'include',
            })
            const result = await res.json()
            if (await res.ok) {
                setMessage(result.message)
                setProduct({
                    title: "",
                    price: "",
                    image: "",
                    category: "",
                })
                refHandler(true)
                handleComp("normal")
            }
        } catch (error) {
            setMessage("خطا در ارسال اطلاعات" + error)
        }
    }

    return (
        <div className="center">
            <h3 className="center" style={{marginBottom: "10px"}}>افزودن محصول</h3>
            <form className="align" onSubmit={addProduct}>
                <div className="form">
                    <input
                        required
                        value={product.title}
                        name="title"
                        onChange={changeHandler}
                        type="text"
                        className="input"
                        placeholder="نام محصول"
                    />
                    <input
                        required
                        value={product.price}
                        name="price"
                        onChange={changeHandler}
                        type="number"
                        className="input"
                        placeholder="قیمت"
                    />
                    <input
                        required
                        value={product.category}
                        name="category"
                        onChange={changeHandler}
                        type="text"
                        className="input"
                        placeholder="دسته بندی"
                    />
                    <input
                        required
                        value={product.image}
                        name="image"
                        onChange={changeHandler}
                        type="text"
                        className="input"
                        placeholder="لینک تصویر"
                    />
                    <button className="button-cart">افزودن</button>
                    <button onClick={changeStatus} style={{marginTop: "0px"}} className="button-cart">لغو</button>
                </div>
            </form>
            <span style={{color: "black"}}>
                <small>
                    {message}
                </small>
            </span>
        </div>
    )
}