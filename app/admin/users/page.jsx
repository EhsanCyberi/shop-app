import IsAdmin from "@/components/IsAdmin";
import ProductsAdmin from "@/components/ProductsAdmin";
import UsersData from "@/components/UsersData";

export default async function Page() {
    const res = await fetch("https://shop-apps-omega.vercel.app/api/users", {
        credentials: 'include',
    })
    const users = await res.json()
    return (
        <div>
            <IsAdmin>
                <UsersData users={users}/>
            </IsAdmin>
        </div>
    )
}