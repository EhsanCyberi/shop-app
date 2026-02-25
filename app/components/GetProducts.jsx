export async function GetProducts(searchParams = {}) {
  const params = await searchParams
  const category = params.category || ""

  const url = category
    ? `https://shop-apps-omega.vercel.app/api/products?category=${category}`
    : "https://shop-apps-omega.vercel.app/api/products"

  const res = await fetch(url, {credentials: 'include',})
  const products = await res.json()

  return { products, category }
}