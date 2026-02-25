import DeleteIcon from "./icons/DeleteIcon"

export default function DeleteOrder({orderId, refreshHandler}) {

    const deleted = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://shop-apps-omega.vercel.app/api/orders", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(orderId)
            })
            const result = await res.json()
            if (res.ok) {
                refreshHandler(true)
            } else {
                console.log(result.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
            <button onClick={deleted} className="btn-icon">
                <DeleteIcon/>
            </button>
    )
}