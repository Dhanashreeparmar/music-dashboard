import React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Gem,
  Headphones,
  Mars,
  Shirt,
  ShoppingBag,
  Venus,
} from 'lucide-react'
import { useAllProductsQuery, useCategoriesQuery } from '../hooks/useProductQueries'

const iconByCategory = {
  electronics: Headphones,
  jewelery: Gem,
  "men's clothing": Mars,
  "women's clothing": Venus,
}

const prettifyCategory = (category) => {
  if (category === "men's clothing") return "Men's Clothing"
  if (category === "women's clothing") return "Women's Clothing"
  if (category === 'jewelery') return 'Jewellery'
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const AllTabs = ({ activeCategory, onCategoryChange }) => {
  const carouselRef = React.useRef(null)

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategoriesQuery()

  const {
    data: products = [],
    isLoading,
    isError,
  } = useAllProductsQuery()

  const carouselCards = React.useMemo(() => {
    const tabCategories = ['all', ...categories]
    if (tabCategories.length === 0 || products.length === 0) return []

    return tabCategories.map((category) => {
      const representative =
        category === 'all'
          ? products[0]
          : products.find((product) => product.category === category) || products[0]

      return {
        key: `card-${category}`,
        label: category === 'all' ? 'All' : prettifyCategory(category),
        image: representative.image,
        apiCategory: category,
      }
    })
  }, [categories, products])

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return
    const amount = direction === 'left' ? -380 : 380
    carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-2 sm:px-4">
        <ul className="flex items-center gap-5 overflow-x-auto py-2.5 whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categoriesLoading ? (
            <li className="py-2 text-sm font-medium text-zinc-500">Loading categories...</li>
          ) : categoriesError ? (
            <li className="py-2 text-sm font-medium text-red-500">Could not load categories.</li>
          ) : (
            ['all', ...categories].map((category) => {
              const isActive = activeCategory === category
              const Icon =
                category === 'all'
                  ? ShoppingBag
                  : iconByCategory[category] || Shirt

              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    className={`relative flex items-center gap-1.5 py-2 text-sm font-semibold transition sm:text-base ${
                      isActive
                        ? 'text-[#7e22ce]'
                        : 'text-[#5d667a] hover:text-zinc-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{category === 'all' ? 'All' : prettifyCategory(category)}</span>
                    {isActive ? (
                      <span className="absolute -bottom-[11px] left-0 h-[3px] w-full rounded-full bg-[#a855f7]" />
                    ) : null}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>

      <div className="border-t border-zinc-100 bg-[#f3f3f4] py-3">
        <div className="mx-auto flex w-full max-w-[1280px] items-center gap-2 px-1 sm:px-4">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={carouselRef}
            className="flex flex-1 gap-3 overflow-x-auto px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {isLoading ? (
              <div className="py-8 text-sm text-zinc-500">Loading categories...</div>
            ) : isError ? (
              <div className="py-8 text-sm text-red-500">Could not load categories.</div>
            ) : (
              carouselCards.map((card) => (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => onCategoryChange(card.apiCategory)}
                  className="w-[132px] shrink-0 text-left"
                >
                  <div
                    className={`mb-2 flex h-[118px] items-center justify-center rounded-2xl p-3 ${
                      activeCategory === card.apiCategory
                        ? 'bg-[#ede4ff] ring-1 ring-[#a855f7]'
                        : 'bg-[#e8e8eb]'
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.label}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-center text-[15px] font-semibold leading-5 text-zinc-800">
                    {card.label}
                  </p>
                </button>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default AllTabs
