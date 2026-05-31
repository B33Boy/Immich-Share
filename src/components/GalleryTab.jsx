import { useEffect, useState } from 'react'
import { getAssets, getThumbnailUrl } from '../api/immich'

export default function GalleryTab() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAssets().then(data => {
      setAssets(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 6, padding: '1.5rem' }}>
      {Array(6).fill(0).map((_, i) => (
        <div key={i} style={{ aspectRatio: '1', borderRadius: 8, background: '#f0f0f0' }} />
      ))}
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 6, padding: '1.5rem' }}>
      {assets.map(a => (
        <img key={a.id} src={getThumbnailUrl(a.id)} alt={a.originalFileName}
          style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8 }} />
      ))}
    </div>
  )
}