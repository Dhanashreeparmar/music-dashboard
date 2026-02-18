import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const STORAGE_KEY = 'zepto_cart_v1'

const toInr = (usdValue) => Math.round(usdValue * 83)

const getTotals = (items) => {
  const entries = Object.values(items)
  const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0)
  const total = entries.reduce(
    (sum, entry) => sum + toInr(entry.product.price) * entry.quantity,
    0,
  )
  return { totalItems, total }
}

const upsertItem = (items, product) => {
  const existing = items[product.id]
  return {
    ...items,
    [product.id]: {
      product,
      quantity: (existing?.quantity || 0) + 1,
    },
  }
}

const incrementItemQty = (items, productId) => {
  const existing = items[productId]
  if (!existing) return items
  return {
    ...items,
    [productId]: {
      ...existing,
      quantity: existing.quantity + 1,
    },
  }
}

const decrementItemQty = (items, productId) => {
  const existing = items[productId]
  if (!existing) return items

  if (existing.quantity <= 1) {
    const nextItems = { ...items }
    delete nextItems[productId]
    return nextItems
  }

  return {
    ...items,
    [productId]: {
      ...existing,
      quantity: existing.quantity - 1,
    },
  }
}

const removeCartItem = (items, productId) => {
  if (!items[productId]) return items
  const nextItems = { ...items }
  delete nextItems[productId]
  return nextItems
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: {},
      totalItems: 0,
      total: 0,
      isCartOpen: false,
      addItem: (product) =>
        set((state) => {
          const items = upsertItem(state.items, product)
          return { items, ...getTotals(items) }
        }),
      incrementItem: (productId) =>
        set((state) => {
          const items = incrementItemQty(state.items, productId)
          return { items, ...getTotals(items) }
        }),
      decrementItem: (productId) =>
        set((state) => {
          const items = decrementItemQty(state.items, productId)
          return { items, ...getTotals(items) }
        }),
      removeItem: (productId) =>
        set((state) => {
          const items = removeCartItem(state.items, productId)
          return { items, ...getTotals(items) }
        }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        total: state.total,
      }),
    },
  ),
)
