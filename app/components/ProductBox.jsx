function formater(num) {
    return new Intl.NumberFormat('fa-IR').format(num)
}

export default function ProductBox({products}) {
    return (
        <div className="box">
            <img className="image" src={products.image} alt={products.title} width={180} height={150} />
            <div>
                <h4>{products.title}</h4>
            </div>
            <div className="justify">
                <div className="center">{formater(products.price)}</div>
                <button className="button">دیدن جزئیات</button>
            </div>
        </div>
    )
}