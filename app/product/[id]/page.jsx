import Loading from "@/components/Loading";
import ProductDetails from "@/components/ProductDetails";
import { Suspense } from "react";

export default function Page({params}) {
    return (
        <div>
            <Suspense fallback={<Loading/>}>
                <ProductDetails idValue={params}/>
            </Suspense>
        </div>
    )
}