"use client"

import { useState } from "react"
import PencilIcon from "./icons/EditIcon"
import AddNewProduct from "./AddNewProduct"
import DeleteProduct from "./DeleteProduct"
import { useRouter } from "next/navigation"
import EditProduct from "./EditProduct"

export default function ProductsAdmin({products = []}) {
    const router = useRouter()
    const [status, setStatus] = useState("normal")

    const refHandler = (childrenValue) => {
        if (childrenValue) {
            router.refresh()
        }
    }

    const productList = products
    
    const handleComp = (parametr) => {
        setStatus(parametr)
    }

    const [keyProduct, setKeyProduct] = useState("")

    const findkey = (key) => {
        handleComp("edit")
        setKeyProduct(key)
    }
    
    return (
        <div>
            <h1 className="center">محصولات</h1>
            <div className="over">
                {
                    productList.length > 0 ? (
                        <table className="ad-table">
                            <thead>
                                <tr>
                                    <td>
                                        <strong>محصولات</strong>
                                    </td>
                                    
                                    <td>
                                        <strong>دسته بندی</strong>
                                    </td>

                                    <td>
                                        <strong>عملیات</strong>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList.map(
                                        (product) => (
                                            <tr key={product._id}>
                                                <td>{product.title}</td>
                                                <td>{product.category}</td>
                                                <td>
                                                    <div className="flex">
                                                        <button className="btn-icon" onClick={()=> findkey(product._id)}>
                                                            <PencilIcon/>
                                                        </button>

                                                        <DeleteProduct refHandler={refHandler} userId={product._id}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    ) : <div className="center">محصولی یافت نشد</div> 
                }
            </div>
            <div className="align" style={{marginBottom: "20px"}}>
                {
                    status == "edit" ? (
                        <EditProduct productData={productList} refHandler={refHandler} kays={keyProduct} handleComp={handleComp} />
                    ) : status == "send" ? (
                        <AddNewProduct refHandler={refHandler} handleComp={handleComp}/>
                    ) : (
                        <button onClick={()=> handleComp("send")} className="button">افزودن محصول</button>
                    )
                }
            </div>
        </div>
    )
}