import CartBuy from "@/components/CartBuy";
import { Session } from "@/components/Session";

export default async function Page() {
    const user = await Session()
    return (
        <CartBuy user={user}/>
    )
}