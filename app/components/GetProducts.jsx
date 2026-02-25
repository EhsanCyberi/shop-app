export async function GetProducts(searchParams = {}) {
  const params = await searchParams
  const category = params.category || ""

  const url = category
    ? `http://localhost:3000/api/products?category=${category}`
    : "http://localhost:3000/api/products"

  const res = await fetch(url)
  const products = await res.json()

  return { products, category }
}