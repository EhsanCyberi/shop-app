import { GetProducts } from "@/components/GetProducts";
import IsAdmin from "@/components/IsAdmin";
import ProductsAdmin from "@/components/ProductsAdmin";

export default async function Page({searchParams}) {
    const {products, category} = await GetProducts(searchParams)

    return (
        <div>
            <IsAdmin>
                <ProductsAdmin products={products}/>
            </IsAdmin>
        </div>
    )
}