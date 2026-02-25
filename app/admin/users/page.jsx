import IsAdmin from "@/components/IsAdmin";
import ProductsAdmin from "@/components/ProductsAdmin";
import UsersData from "@/components/UsersData";

export default async function Page() {
    const res = await fetch("https://shop-apps-7e62ame79-ehsans-projects-adeb9c1e.vercel.app/api/users")
    const users = await res.json()
    return (
        <div>
            <IsAdmin>
                <UsersData users={users}/>
            </IsAdmin>
        </div>
    )
}