"use client"
import { useEffect, useState } from "react"

export default function EditProduct({refHandler, productData, kays, handleComp}) {
    const prdct = productData.find( (item) => item._id == kays )

        useEffect( () => {
            setProduct({
                id: prdct?._id,
                title: prdct?.title,
                price: prdct?.price,
                image: prdct?.image,
                category: prdct?.category,
            })
        }, [prdct])
        

    let [message, setMessage] = useState("")
    let [product, setProduct] = useState({
        id: "",
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

    async function editProduct(e) {
        e.preventDefault()
        try {
            const res = await fetch("https://shop-apps-omega.vercel.app/api/products", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(product),
                credentials: 'include',
            })
            const result = await res.json()
            if (res.ok) {
                setMessage(result.message)
                handleComp("normal")
                refHandler(true)
            }
        } catch (error) {
            setMessage("خطا در ویرایش اطلاعات" + error)
        }
    }

    return (
        <div className="center">
            <h3 className="center" style={{marginBottom: "10px"}}>ویرایش محصول</h3>
            <form className="align" onSubmit={editProduct}>
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
                    <button className="button-cart">ویرایش</button>
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