import React from 'react'
import { ChevronDown, Search, ShoppingCart, UserCircle2 } from 'lucide-react'
import primaryLogo from '../assets/primary-logo.svg'
import { useCartStore } from '../store/cartStore'

const AboveSection = () => {
  const totalItems = useCartStore((state) => state.totalItems)
  const toggleCart = useCartStore((state) => state.toggleCart)

  return (
    <header className="w-full border-b border-zinc-200 bg-white px-3 py-2 sm:px-4">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center gap-2 md:flex-nowrap md:gap-3">
        <div className="flex min-w-[150px] items-center gap-2 sm:min-w-[200px]">
          <img
            src={primaryLogo}
            alt="Zepto"
            className="h-7 w-auto object-contain sm:h-8"
          />
          <button
            type="button"
            className="hidden items-center gap-1 text-xs font-semibold text-zinc-700 sm:flex lg:text-sm"
          >
            <span>Select Location</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="order-3 w-full md:order-none md:flex-1">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder='Search for "Mens clothes"'
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-700 placeholder:text-zinc-500 outline-none transition focus:border-zinc-400"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="flex flex-col items-center justify-center text-zinc-900"
          >
            <UserCircle2 className="h-6 w-6" />
            <span className="text-xs sm:text-sm">Login</span>
          </button>
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex flex-col items-center justify-center text-zinc-900"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            ) : null}
            <span className="text-xs sm:text-sm">Cart</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AboveSection
