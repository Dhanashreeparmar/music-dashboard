const SONGS_ENDPOINT =
  'https://rss.applemarketingtools.com/api/v2/us/music/most-played/100/songs.json'
const ALBUMS_ENDPOINT =
  'https://rss.applemarketingtools.com/api/v2/us/music/most-played/100/albums.json'

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return items.slice(start, end)
}

function formatDuration(trackTimeMillis) {
  if (!trackTimeMillis) return '--:--'
  const totalSeconds = Math.floor(trackTimeMillis / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function upscaleArtwork(artworkUrl100) {
  return artworkUrl100?.replace('100x100bb.jpg', '600x600bb.jpg') ?? ''
}

export async function fetchTrendingSongs(page = 1, pageSize = 8) {
  const songsPayload = await fetchJson(SONGS_ENDPOINT)
  const songs = songsPayload.feed?.results ?? []

  const pageItems = paginate(songs, page, pageSize)
  const ids = pageItems.map((song) => song.id).join(',')

  let detailsById = {}
  if (ids) {
    const lookupPayload = await fetchJson(`https://itunes.apple.com/lookup?id=${ids}`)
    detailsById = Object.fromEntries(
      (lookupPayload.results ?? []).map((item) => [String(item.trackId), item]),
    )
  }

  return {
    items: pageItems.map((song) => {
      const details = detailsById[String(song.id)]
      return {
        id: song.id,
        title: song.name,
        artist: song.artistName,
        artwork: upscaleArtwork(song.artworkUrl100),
        duration: formatDuration(details?.trackTimeMillis),
        previewUrl: details?.previewUrl ?? null,
      }
    }),
    total: songs.length,
  }
}

export async function fetchPopularArtists(limit = 8) {
  const songsPayload = await fetchJson(SONGS_ENDPOINT)
  const songs = songsPayload.feed?.results ?? []

  const grouped = new Map()
  songs.forEach((song) => {
    const key = song.artistId || song.artistName
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: String(key),
        name: song.artistName,
        artwork: upscaleArtwork(song.artworkUrl100),
        tracks: 0,
      })
    }
    grouped.get(key).tracks += 1
  })

  return Array.from(grouped.values())
    .sort((a, b) => b.tracks - a.tracks)
    .slice(0, limit)
}

export async function fetchNewReleases(page = 1, pageSize = 8) {
  const albumsPayload = await fetchJson(ALBUMS_ENDPOINT)
  const albums = (albumsPayload.feed?.results ?? [])
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))

  const pageItems = paginate(albums, page, pageSize)
  return {
    items: pageItems.map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.artistName,
      artwork: upscaleArtwork(album.artworkUrl100),
      releaseDate: album.releaseDate,
    })),
    total: albums.length,
  }
}
