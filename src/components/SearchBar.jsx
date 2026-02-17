import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between bg-black px-6 py-4">
      <h1 className="text-2xl font-bold text-white">Musicly</h1>
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Search songs, artists..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default SearchBar
