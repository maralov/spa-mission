export const STORAGE_KEYS = {
  name: 'spa_mission:name',
  slug: 'spa_mission:slug'
}

export const saveName = (name) => {
  if (!name) return
  localStorage.setItem(STORAGE_KEYS.name, name)
}

export const getName = () => localStorage.getItem(STORAGE_KEYS.name) || ''

export const clearName = () => localStorage.removeItem(STORAGE_KEYS.name)
