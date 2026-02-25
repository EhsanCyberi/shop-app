import ProductList from "./ProductList";

export default function Products({searchParams}) {
    return (
        <div>
            <ProductList searchParams={searchParams}/>
        </div>
    )
}