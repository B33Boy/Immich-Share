import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import UploadTab from './components/UploadTab'
import GalleryTab from './components/GalleryTab'
import './index.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState('upload')

  if (!user) return <LoginScreen onLogin={setUser} />

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}>
        <span style={{ fontWeight: 500 }}>Immich Share</span>
        <button onClick={() => setUser(null)} style={{ fontSize: 13, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
          {user.name} · Sign out
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '0 1.5rem' }}>
        {['upload', 'gallery'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.75rem 0', marginRight: '1.5rem', fontSize: 14,
            background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #111' : '2px solid transparent',
            fontWeight: tab === t ? 500 : 400, cursor: 'pointer', textTransform: 'capitalize'
          }}>{t}</button>
        ))}
      </div>

      {tab === 'upload' ? <UploadTab /> : <GalleryTab />}
    </div>
  )
}