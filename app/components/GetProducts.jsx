export async function GetProducts(searchParams = {}) {
  const params = await searchParams
  const category = params.category || ""

  const url = category
    ? `https://shop-apps-7e62ame79-ehsans-projects-adeb9c1e.vercel.app/api/products?category=${category}`
    : "https://shop-apps-7e62ame79-ehsans-projects-adeb9c1e.vercel.app/api/products"

  const res = await fetch(url)
  const products = await res.json()

  return { products, category }
}