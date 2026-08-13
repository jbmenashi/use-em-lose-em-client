export const getStoredJSON = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return fallback
    return JSON.parse(item)
  } catch {
    return fallback
  }
}

export const setStoredJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (disabled, full, private browsing) — state stays in Redux only
  }
}

export const removeStoredJSON = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    // localStorage unavailable — nothing to clean up
  }
}
