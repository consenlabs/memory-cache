let containerStack = {}
const getContainer = (): Record<string, any> => {
  if (typeof window !== 'undefined') return window
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof global !== 'undefined') return global
  return containerStack
}

export const getDefaultCacheNamespace = (name?: string): string => {
  const suffix = name || Math.random().toString(16).slice(-10)
  return `MEMORY_CACHE_${suffix}`
}

export type CacheOptions = {
  maxAge: number
}

export type CacheItem<T = any> = {
  value: T
  expire: number
}

export const MEMORY_CACHE_DEFAULT_OPTIONS: CacheOptions = {
  maxAge: 0,
}

export class MemoryCache {
  private rootName: string
  private options: CacheOptions = MEMORY_CACHE_DEFAULT_OPTIONS

  private hasAge(): boolean {
    return this.options.maxAge !== 0
  }

  private getNamespace(): Record<string | number, CacheItem> {
    const container = getContainer()
    if (!container[this.rootName]) {
      container[this.rootName] = {}
    }
    return container[this.rootName]
  }

  constructor(cacheNamespace: string, options?: CacheOptions) {
    this.rootName = getDefaultCacheNamespace(cacheNamespace)
    if (options) {
      this.options = {
        ...MEMORY_CACHE_DEFAULT_OPTIONS,
        ...options,
      }
    }
  }

  hasItem(key: string | number): boolean {
    const stack = this.getNamespace()
    const hasKeyValue = typeof stack[key] !== 'undefined'
    if (!hasKeyValue) return false

    const cacheItem = stack[key]
    if (!this.hasAge()) return true
    if (Date.now() < cacheItem.expire) return true
    this.removeItem(key)
    return false
  }

  getItem<T>(key: string | number): T | null {
    const stack = this.getNamespace()
    if (!this.hasItem(key)) return null
    return stack[key].value
  }

  setItem(key: string | number, value: any): void {
    const stack = this.getNamespace()
    stack[key] = {
      expire: this.hasAge() ? Date.now() + this.options.maxAge : 0,
      value,
    }
  }

  removeItem(key: string | number): void {
    const stack = this.getNamespace()
    delete stack[key]
  }

  cleanAll(): void {
    const container = getContainer()
    container[this.rootName] = {}
  }
}
