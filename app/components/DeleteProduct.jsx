"use client"

import DeleteIcon from "./icons/DeleteIcon"

export default function DeleteProduct({userId, refHandler}) {
    const user_id = userId
    const deleted = async (e) => {
        e.preventDefault()
        if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
            try {
                const res = await fetch("https://shop-apps-omega.vercel.app/api/products",{
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user_id),
                    credentials: 'include',
                })
                const result = await res.json()
                if (res.ok) {
                    refHandler(true)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <button onClick={deleted} className="btn-icon">
            <DeleteIcon/>
        </button>
    )
}