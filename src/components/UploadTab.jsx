import { useState } from 'react'
import { uploadAsset } from '../api/immich'

export default function UploadTab() {
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState({})
  const [done, setDone] = useState(false)

  function handleFiles(e) {
    setFiles(Array.from(e.target.files))
    setProgress({})
    setDone(false)
  }

  async function handleUpload() {
    const results = {}
    for (const file of files) {
      results[file.name] = 'uploading'
      setProgress({ ...results })
      try {
        await uploadAsset(file)
        results[file.name] = 'done'
      } catch {
        results[file.name] = 'error'
      }
      setProgress({ ...results })
    }
    setDone(true)
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <label style={{ display: 'block', border: '1px dashed #ccc', borderRadius: 10, padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
        <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
        <p style={{ fontSize: 14, color: '#888' }}>Tap to select photos</p>
        <p style={{ fontSize: 12, color: '#bbb', marginTop: 4 }}>Opens Google Photos on mobile</p>
      </label>

      {files.length > 0 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8, marginTop: '1rem' }}>
            {files.map(f => (
              <img key={f.name} src={URL.createObjectURL(f)} alt={f.name}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8 }} />
            ))}
          </div>

          {Object.keys(progress).length > 0 && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {files.map(f => (
                <div key={f.name} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span style={{ color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{f.name}</span>
                  <span style={{ color: progress[f.name] === 'done' ? 'green' : progress[f.name] === 'error' ? 'red' : '#888' }}>
                    {progress[f.name] === 'done' ? '✓' : progress[f.name] === 'error' ? '✗' : '...'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {!done && (
            <button onClick={handleUpload} style={{ marginTop: '1rem', width: '100%', padding: '10px', background: '#111', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
              Upload {files.length} photo{files.length > 1 ? 's' : ''}
            </button>
          )}

          {done && <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: 14, color: 'green' }}>All uploaded!</p>}
        </>
      )}
    </div>
  )
}