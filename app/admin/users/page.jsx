import IsAdmin from "@/components/IsAdmin";
import Loading from "@/components/Loading";
import UsersData from "@/components/UsersData";
import { Suspense } from "react";

export default async function Page() {
    const res = await fetch("https://shop-apps-omega.vercel.app/api/users", {
        credentials: 'include',
    })
    const users = await res.json()
    return (
        <div>
            <IsAdmin>
                <Suspense fallback={<Loading/>}>
                    <UsersData users={users}/>
                </Suspense>
            </IsAdmin>
        </div>
    )
}