import debounce from '@turistikrota/ui/utils/debounce'

const makeKey = (key) => `autosave-${key}`

export const createUniqueKey = () => {
  return Math.random().toString(36).substr(2, 9)
}

const useAutoSave = () => {
    const debouncedSetter = debounce((key, value) => {
        localStorage.setItem(makeKey(key), JSON.stringify(value))
      }, 300)
    
      const set = (key, value) => {
        debouncedSetter(key, value)
      }
    
      const get = (key) => {
        try {
          const item = localStorage.getItem(makeKey(key))
          if (!item) return undefined
          return JSON.parse(item)
        } catch {
          return undefined
        }
      }

      const getAll = () => {
        const prefix = 'autosave-'
        const keys = Object.keys(localStorage).filter((key) => key.startsWith(prefix))
        return keys.map((key) => {
          const value = localStorage.getItem(key)
          return {
            key: key.replace(prefix, ''),
            value: JSON.parse(value),
          }
        })
      }
    
      const remove = (key) => {
        localStorage.removeItem(makeKey(key))
      }
    
      return {
        set,
        get,
        getAll,
        remove
      }
}

export default useAutoSave