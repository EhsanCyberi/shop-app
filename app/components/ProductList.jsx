import Link from "next/link"
import ProductBox from "./ProductBox"
import { GetProducts } from "./GetProducts"


export default async function ProductList({searchParams}) {
    const {products, category} = await GetProducts(searchParams)
    
    return (
        <div>
            <h1 className="center"> {category ? `محصولات ${category}` : "محصولات پر فروش"} </h1>
            <div className="product-list">
                {
                    products.map(
                        (item)=> (
                            <Link href={`/product/${item._id}`} key={item._id}>
                                <ProductBox products={item}/>
                            </Link>
                        )
                    )
                }
            </div>
        </div>
    )
}