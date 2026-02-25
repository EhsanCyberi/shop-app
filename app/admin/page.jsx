import Admin from "@/components/Admin";
import { Session } from "@/components/Session";
import IsAdmin from "@/components/IsAdmin";

export default async function Page() {
    const user = await Session()
    return (
        <div>
            <IsAdmin>
                <Admin/>
            </IsAdmin>
        </div>
    )
}