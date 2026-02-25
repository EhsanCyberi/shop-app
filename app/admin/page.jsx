import Admin from "@/components/Admin";
import IsAdmin from "@/components/IsAdmin";

export default async function Page() {
    return (
        <div>
            <IsAdmin>
                <Admin/>
            </IsAdmin>
        </div>
    )
}