import { GetProducts } from "./GetProducts";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import {Session} from "./Session"

function formater(num) {
    return new Intl.NumberFormat("fa-IR").format(num);
}

export default async function ProductDetails({idValue}) {
    const user = await Session();
    const {products, category} = await GetProducts()
    const idProduct = await idValue
    const {id} = idProduct
    const productTarget = products.find(
        (item) => item._id == id
    )

    return (
        <div className="new-box">
            <div>
                <img className="new-img" src={productTarget.image} alt={productTarget.title} width={250} height={250} />
            </div>
            <div className="new-info">
                <h1>{productTarget.title}</h1>
                <div>
                    <span>دسته بندی: </span>
                    <Link href={`/?category=${productTarget.category}`}>{productTarget.category}</Link>
                </div>
                <div className="new-justify">
                    <div className="">{formater(productTarget.price)} تومان</div>
                    <AddToCartButton product={productTarget} user={user}/>
                </div>
            </div>
        </div>
    )
}