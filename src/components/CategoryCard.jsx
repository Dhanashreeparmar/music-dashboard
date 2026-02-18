import React from 'react'
import { Star } from 'lucide-react'
import { useProductsByCategoryQuery } from '../hooks/useProductQueries'
import { useCartStore } from '../store/cartStore'

const CategoryCard = ({ activeCategory }) => {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const incrementItem = useCartStore((state) => state.incrementItem)
  const decrementItem = useCartStore((state) => state.decrementItem)

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProductsByCategoryQuery(activeCategory)

  const sectionTitle = activeCategory === 'all' ? 'All Products' : activeCategory

  if (isLoading) {
    return (
      <section className="px-4 pb-4 pt-3 sm:px-5">
        <h2 className="mb-3 text-lg font-bold text-zinc-800">Loading products...</h2>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="px-4 pb-4 pt-3 sm:px-5">
        <h2 className="mb-3 text-lg font-bold text-zinc-800">
          Could not load products.
        </h2>
      </section>
    )
  }

  return (
    <section className="px-4 pb-4 pt-5 sm:px-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-800">{sectionTitle}</h2>
        <button
          type="button"
          className="text-xl font-semibold text-pink-600 hover:text-pink-700"
        >
          See All
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <article
            key={product.id}
            className="w-[210px] shrink-0 rounded-2xl border border-zinc-200 bg-white p-3"
          >
            <div className="relative mb-3 rounded-xl bg-[#f5f6f8] p-3">
              <img
                src={product.image}
                alt={product.title}
                className="mx-auto h-36 w-full object-contain"
              />

              <div className="absolute bottom-2 right-2">
                {(items[product.id]?.quantity || 0) === 0 ? (
                  <button
                    type="button"
                    onClick={() => addItem(product)}
                    className="rounded-xl border-2 border-pink-500 bg-white px-4 py-1 text-sm font-bold text-pink-600"
                  >
                    ADD
                  </button>
                ) : (
                  <div className="flex items-center overflow-hidden rounded-xl border-2 border-pink-500 bg-white">
                    <button
                      type="button"
                      onClick={() => decrementItem(product.id)}
                      className="px-2 py-1 text-lg font-bold text-pink-600"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-bold text-pink-600">
                      {items[product.id]?.quantity || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementItem(product.id)}
                      className="px-2 py-1 text-lg font-bold text-pink-600"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="rounded-md bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                  ₹{Math.round(product.price * 83)}
                </span>
                <span className="text-xs text-zinc-500 line-through">
                  ₹{Math.round(product.price * 83 * 1.25)}
                </span>
              </div>

              <h3 className="min-h-14 text-base font-medium leading-6 text-zinc-800">
                {product.title}
              </h3>

              <p className="text-sm text-zinc-500">1 piece</p>

              <div className="flex items-center gap-1 text-sm text-zinc-600">
                <Star className="h-4 w-4 fill-green-600 text-green-600" />
                <span className="font-semibold">{product.rating?.rate ?? 4.2}</span>
                <span>({product.rating?.count ?? 100})</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CategoryCard
