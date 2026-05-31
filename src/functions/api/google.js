import { config } from '../config'

const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly'
let tokenClient = null
let accessToken = null

export function initGoogleAuth(onToken) {
  console.log('Client ID:', config.googleClientId) // remove after confirming
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: config.googleClientId,
    scope: SCOPE,
    callback: (res) => {
      accessToken = res.access_token
      onToken(res.access_token)
    },
  })
}

export function signIn() {
  if (!tokenClient) {
    console.error('Google auth not initialized yet')
    return
  }
  tokenClient.requestAccessToken()
}

export function signOut() {
  if (accessToken) {
    window.google.accounts.oauth2.revoke(accessToken)
    accessToken = null
  }
}

export async function fetchPhotos(pageToken = null) {
  const url = new URL('https://photoslibrary.googleapis.com/v1/mediaItems')
  url.searchParams.set('pageSize', '50')
  if (pageToken) url.searchParams.set('pageToken', pageToken)

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    throw new Error(`Google Photos API error: ${res.status}`)
  }

  return res.json()
}