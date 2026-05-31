const BASE = import.meta.env.VITE_IMMICH_URL
const KEY  = import.meta.env.VITE_IMMICH_API_KEY

export async function uploadAsset(file) {
  const form = new FormData()
  form.append('assetData', file)
  form.append('deviceAssetId', `${file.name}-${file.lastModified}`)
  form.append('deviceId', 'immich-share-web')
  form.append('fileCreatedAt', new Date(file.lastModified).toISOString())
  form.append('fileModifiedAt', new Date(file.lastModified).toISOString())

  const res = await fetch(`${BASE}/api/assets`, {
    method: 'POST',
    headers: { 'x-api-key': KEY },
    body: form
  })
  return res.json()
}

export async function getAssets() {
  const res = await fetch(`${BASE}/api/assets`, {
    headers: { 'x-api-key': KEY }
  })
  return res.json()
}

export function getThumbnailUrl(assetId) {
  return `${BASE}/api/assets/${assetId}/thumbnail?key=${KEY}`
}