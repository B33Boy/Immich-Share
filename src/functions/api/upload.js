export async function onRequestPost({ request, env }) {
  const formData = await request.formData()

  const response = await fetch(`${env.VITE_IMMICH_URL}/api/assets`, {
    method: 'POST',
    headers: {
      'x-api-key': env.VITE_IMMICH_API_KEY,
    },
    body: formData,
  })

  const data = await response.json()
  return Response.json(data)
}