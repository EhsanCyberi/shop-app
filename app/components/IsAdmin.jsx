import { redirect } from "next/navigation"
import { Session } from "./Session"


export default async function IsAdmin({children}) {
    const user = await Session()
    if (user?.role !== "admin") {
        redirect("/")
    }
    return children
}