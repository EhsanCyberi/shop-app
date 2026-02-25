import IsAdmin from "@/components/IsAdmin";
import ProductsAdmin from "@/components/ProductsAdmin";
import UsersData from "@/components/UsersData";

export default async function Page() {
    const res = await fetch("http://localhost:3000/api/users")
    const users = await res.json()
    return (
        <div>
            <IsAdmin>
                <UsersData users={users}/>
            </IsAdmin>
        </div>
    )
}