const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (!response.ok) {
    throw new Error('Erro na comunicação com a API')
  }

  return response.json()
}
