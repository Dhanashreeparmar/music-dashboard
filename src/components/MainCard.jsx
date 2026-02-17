import React from 'react'
import { Play } from 'lucide-react'

const songs = [
  {
    id: 1,
    title: 'Single Soon',
    artist: 'Selena Gomez',
    duration: '3:11',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    duration: '2:58',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Paint The Town Red',
    artist: 'Doja Cat',
    duration: '3:51',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    duration: '2:55',
    image:
      'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Nasty',
    artist: 'Tinashe',
    duration: '3:07',
    image:
      'https://images.unsplash.com/photo-1461783436728-0a9217714694?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Greedy',
    artist: 'Tate McRae',
    duration: '2:13',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
  },
]

const MainCard = () => {
  return (
    <section className="px-6 pb-6">
      <h2 className="mb-4 text-2xl font-bold text-white">Trending Songs</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <article
            key={song.id}
            className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-white"
          >
            <div className="relative">
              <img
                src={song.image}
                alt={song.title}
                className="h-44 w-full object-cover"
              />
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <span className="rounded-full bg-white p-3 text-black">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </button>
            </div>
            <div className="space-y-1 p-3">
              <h3 className="truncate text-base font-semibold">{song.title}</h3>
              <p className="truncate text-sm text-zinc-300">{song.artist}</p>
              <p className="text-xs text-zinc-400">{song.duration}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MainCard
