import React from 'react'
import { Compass, Disc3, Library, UserRound } from 'lucide-react'

const navItems = [
  { label: 'Trending Songs', icon: Compass },
  
  { label: 'New Releases', icon: Disc3 },
  { label: 'Popular Artists', icon: UserRound },
]

const Sidebar = () => {
  return (
    <aside className="text-white md:w-56 md:shrink-0">
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black px-3 py-2 backdrop-blur md:static md:h-screen md:w-56 md:px-4 md:py-6">
        <ul className="flex items-center justify-between gap-2 md:flex-col md:items-stretch md:justify-start md:gap-1">
          {navItems.map(({ label, icon: Icon }, index) => (
            <li key={label}>
              <button
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition md:justify-start ${
                  index === 0
                    ? 'text-pink-500'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
