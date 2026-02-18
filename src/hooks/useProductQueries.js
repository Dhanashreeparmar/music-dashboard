import { useQuery } from '@tanstack/react-query'
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../lib/productApi'

const BASE_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000,
  gcTime: 15 * 60 * 1000,
  refetchOnWindowFocus: true,
}

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    ...BASE_QUERY_OPTIONS,
  })

export const useAllProductsQuery = () =>
  useQuery({
    queryKey: ['products', 'all'],
    queryFn: fetchAllProducts,
    ...BASE_QUERY_OPTIONS,
  })

export const useProductsByCategoryQuery = (category) =>
  useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category),
    ...BASE_QUERY_OPTIONS,
  })
