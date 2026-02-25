import { GetProducts } from "@/components/GetProducts";
import IsAdmin from "@/components/IsAdmin";
import Loading from "@/components/Loading";
import ProductsAdmin from "@/components/ProductsAdmin";
import { Suspense } from "react";

export default async function Page({searchParams}) {
    const {products, category} = await GetProducts(searchParams)

    return (
        <div>
            <IsAdmin>
                <Suspense fallback={<Loading/>}>
                    <ProductsAdmin products={products}/>
                </Suspense>
            </IsAdmin>
        </div>
    )
}