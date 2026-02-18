import React from 'react'
import { X, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const CartSheet = () => {
  const items = useCartStore((state) => state.items)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const total = useCartStore((state) => state.total)
  const closeCart = useCartStore((state) => state.closeCart)
  const incrementItem = useCartStore((state) => state.incrementItem)
  const decrementItem = useCartStore((state) => state.decrementItem)
  const removeItem = useCartStore((state) => state.removeItem)

  const entries = Object.values(items)

  React.useEffect(() => {
    if (!isCartOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
            <h2 className="text-xl font-bold text-zinc-800">My Cart</h2>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-md p-1 text-zinc-600 hover:bg-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {entries.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-zinc-700">Your cart is empty</p>
                <p className="mt-1 text-sm text-zinc-500">Add products to see them here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map(({ product, quantity }) => (
                  <article
                    key={product.id}
                    className="rounded-xl border border-zinc-200 p-3"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-zinc-100 p-2">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold text-zinc-800">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-zinc-700">
                          ₹{Math.round(product.price * 83)}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center overflow-hidden rounded-lg border border-pink-500">
                            <button
                              type="button"
                              onClick={() => decrementItem(product.id)}
                              className="px-2 py-1 text-base font-bold text-pink-600"
                            >
                              -
                            </button>
                            <span className="min-w-8 text-center text-sm font-bold text-pink-600">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementItem(product.id)}
                              className="px-2 py-1 text-base font-bold text-pink-600"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-zinc-200 px-4 py-4">
            <div className="flex items-center justify-between text-base font-semibold text-zinc-800">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CartSheet
