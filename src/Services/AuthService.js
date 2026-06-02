import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://keril-inves.runasp.net').replace(/\/$/, '')

export const client = axios.create({
  baseURL: API_BASE_URL,
})

export async function login({ email, password }) {
  const { data } = await client.post('/login', { email, password })
  return data.token
}

export function decodeToken(token) {
  return jwtDecode(token)
}
