import IsAdmin from "@/components/IsAdmin";
import Loading from "@/components/Loading";
import Orders from "@/components/Orders";
import { Suspense } from "react";

export default async function Page() {
    const response = await fetch("http://localhost:3000/api/orders")
    const orders = await response.json()
    return (
        <div>
            <IsAdmin>
                <Suspense ffallback={<Loading />}>
                    <Orders orderUsers={orders}/>
                </Suspense>
            </IsAdmin>
        </div>
    )
}