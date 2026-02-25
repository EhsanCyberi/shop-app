"use client"
import { useRouter } from "next/navigation"
import DoneOrder from "./DoneOrder"
import DeleteOrder from "./DeleteOrder"

export default function Orders({orderUsers}) {
    const router = useRouter()
    function formater(num) {
        return new Intl.NumberFormat("fa-IR").format(num)
    }

    const refreshHandler = (valueChilde) => {
        if (valueChilde) {
            router.refresh()
        }
    }

    const orders = orderUsers
    return (
        <div>
            <div>
                <h1 className="center">محصولات</h1>
                <div className="over">
                    {
                        orders.length > 0 ? (
                            <table className="ad-table">
                                <thead>
                                    <tr>
                                        <td>
                                            <strong>نام کاربری</strong>
                                        </td>
                                        
                                        <td>
                                            <strong>ایمیل</strong>
                                        </td>

                                        <td>
                                            <strong>شهر - آدرس</strong>
                                        </td>

                                        <td>
                                            <strong>کدپستی</strong>
                                        </td>

                                        <td>
                                            <strong>جمع کل</strong>
                                        </td>

                                        <td>
                                            <strong>وضعیت</strong>
                                        </td>

                                        <td>
                                            <strong>محصولات</strong>
                                        </td>

                                        <td>
                                            <strong>زمان سفارش</strong>
                                        </td>

                                        <td>
                                            <strong>عملیات</strong>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map(
                                            (order) => (
                                                <tr key={order._id}>

                                                    <td>{order.user.name}</td>
                                                    <td>{order.user.email}</td>
                                                    <td>{order.user.city} - {order.user.address}</td>
                                                    <td>{order.user.postalCode}</td>
                                                    <td>{formater(order.totalPrice)}</td>
                                                    <td>{(order.status) ? "انجام شده" : "در صف انتظار"}</td>

                                                    <td>{order.cart.map(item => (
                                                        ` ${item.title}(${formater(item.number)})`
                                                    ))}</td>

                                                    <td>{new Date(order.time).toLocaleDateString("fa-IR")}</td>

                                                    <td>
                                                        <div className="flex">
                                                            {
                                                                (!order.status) && (
                                                                    <DoneOrder orderId={order._id} refreshHandler={refreshHandler}/>
                                                                )
                                                            }

                                                            <DeleteOrder orderId={order._id} refreshHandler={refreshHandler}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        ) : <div className="center">سفارشی یافت نشد</div> 
                    }

                </div>
            </div>
        </div>
    )
}