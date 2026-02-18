const API_BASE = 'https://fakestoreapi.com'

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

export const fetchCategories = () => fetchJson(`${API_BASE}/products/categories`)

export const fetchAllProducts = () => fetchJson(`${API_BASE}/products`)

export const fetchProductsByCategory = (category) => {
  if (category === 'all') return fetchAllProducts()
  return fetchJson(
    `${API_BASE}/products/category/${encodeURIComponent(category)}`,
  )
}
