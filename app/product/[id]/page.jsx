import ProductDetails from "@/components/ProductDetails";

export default function Page({params}) {
    return (
        <div>
            <ProductDetails idValue={params}/>
        </div>
    )
}