import CheckIcon from "./icons/CheckIcon"

export default function DoneOrder({orderId, refreshHandler}) {
    const sendData = {
        id: orderId,
        statusOrder: true,
    }
    const CheckOrder = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://shop-apps-omega.vercel.app/api/orders", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(sendData)
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
            <button onClick={CheckOrder} className="btn-icon">
                <CheckIcon/>
            </button>
    )
}