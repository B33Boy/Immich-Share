import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

export default function LoginScreen({ onLogin }) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <p style={{ fontSize: 22, fontWeight: 500 }}>Immich Share</p>
        <p style={{ fontSize: 14, color: '#888' }}>Sign in to upload and browse photos</p>
        <GoogleLogin
          onSuccess={(res) => onLogin(jwtDecode(res.credential))}
          onError={() => alert('Login failed')}
        />
      </div>
    </GoogleOAuthProvider>
  )
}