import MemoryCache from '../src'

describe('Caches', () => {
  it('should work correctly', () => {
    let error = null
    try {
      const cache = new MemoryCache('hello')
      cache.setItem('test', 'value')
      expect(cache.getItem('test')).toEqual('value')
      cache.cleanAll()
    } catch (err) {
      error = err
    }
    expect(error).toBeNull()
  })

  it('should work correctly with different types', () => {
    const cache = new MemoryCache('types')
    const key = Math.random().toString(16).slice(-10)
    const stringValue = Math.random().toString(16).slice(-10)
    const numberValue = Math.random()

    cache.setItem(key, stringValue)
    expect(cache.getItem(key)).toEqual(stringValue)
    cache.setItem(key, { value: stringValue })
    expect(cache.getItem<{ value: string }>(key)?.value).toEqual(stringValue)
    cache.setItem(key, numberValue)
    expect(cache.getItem(key)).toEqual(numberValue)
    cache.setItem(key, false)
    expect(cache.getItem(key)).toEqual(false)
    cache.cleanAll()
  })

  it('should return null when the value is removed', () => {
    const cache = new MemoryCache('removed')
    const key = Math.random().toString(16).slice(-10)
    const value = Math.random().toString(16).slice(-10)

    expect(cache.getItem(key)).toBeNull()
    cache.setItem(key, value)
    expect(cache.getItem(key)).toEqual(value)
    cache.removeItem(key)
    expect(cache.getItem(key)).toBeNull()
    cache.setItem(key, value)
    expect(cache.getItem(key)).toEqual(value)
    cache.cleanAll()
    expect(cache.getItem(key)).toBeNull()
  })

  it('should return null when the value expires', () => {
    const cache = new MemoryCache('expires', { maxAge: 100 })
    const key = Math.random().toString(16).slice(-10)
    const value = Math.random().toString(16).slice(-10)

    expect(cache.getItem(key)).toBeNull()
    cache.setItem(key, value)
    expect(cache.getItem(key)).toEqual(value)

    jest.useFakeTimers()
    setTimeout(() => {
      expect(cache.getItem(key)).toBeNull()
    }, 150)
    jest.runAllTimers()
  })

  it('should work correctly with age option', () => {
    const cache = new MemoryCache('option', { maxAge: 1000 })
    const key = Math.random().toString(16).slice(-10)
    const value = Math.random().toString(16).slice(-10)

    expect(cache.getItem(key)).toBeNull()
    cache.setItem(key, value)
    expect(cache.getItem(key)).toEqual(value)

    jest.useFakeTimers()
    setTimeout(() => {
      expect(cache.getItem(key)).toEqual(value)
    }, 150)
    setTimeout(() => {
      expect(cache.getItem(key)).toEqual(value)
    }, 500)
    setTimeout(() => {
      expect(cache.getItem(key)).toEqual(value)
    }, 900)
    setTimeout(() => {
      expect(cache.getItem(key)).toBeNull()
    }, 1100)
    jest.runAllTimers()
  })
})
