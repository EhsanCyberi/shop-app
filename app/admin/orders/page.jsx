import IsAdmin from "@/components/IsAdmin";
import Loading from "@/components/Loading";
import Orders from "@/components/Orders";
import { Suspense } from "react";

export default async function Page() {
    const response = await fetch("https://shop-apps-7e62ame79-ehsans-projects-adeb9c1e.vercel.app/api/orders")
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