import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

api.interceptors.request.use(async (config) => {
  const token = await window.Clerk?.session?.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Right after a hard refresh, Clerk can report isLoaded before getToken()
// reliably returns a token yet - the first request or two can go out
// unauthenticated and get a 401 even though the user is still signed in.
// Retry once with a freshly-fetched (non-cached) token before giving up.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (response?.status === 401 && config && !config._retriedAfterAuthRace) {
      const token = await window.Clerk?.session?.getToken({ skipCache: true })
      if (token) {
        config._retriedAfterAuthRace = true
        config.headers.Authorization = `Bearer ${token}`
        return api(config)
      }
    }
    return Promise.reject(error)
  }
)
