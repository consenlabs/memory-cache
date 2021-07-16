## Memory Cache

key-value pair cache tool.

### Features

- Multiple environment support
- Stored in memory only
- Extremely small size (<1kb)
- No side effects

### Compatibility

- Browser: FF 45+, Safari 9+, Chrome 42+
- Browser (low version): Add `class` polyfill from [Babel](https://babeljs.io/) or [core-js](https://github.com/zloirock/core-js)
- NodeJS: Full support
- React Native: Full support

### Guide

#### Install

- Run `npm i @consenlabs-fe/memory-cache`
- ESM: `import MemoryCache from '@consenlabs-fe/memory-cache'`
- CJS (NodeJS): `const MemoryCache = require('@consenlabs-fe/memory-cache')`

#### Examples

**1. Get and Set**

```typescript
const cache = new MemoryCache('my-caches')

cache.setItem('name', 'witt')
cache.getItem('name') // -> 'witt'
```

**2. Remove and Clean**

```typescript
const cache = new MemoryCache('my-caches')

cache.setItem('name', 'witt')
cache.setItem('location', 'china')

cache.removeItem('name')
cache.getItem('name') // -> null
cache.getItem('location') // -> 'china'

cache.cleanAll()
cache.getItem('location') // -> null
```

**3. Expiration**

```typescript
const cache = new MemoryCache('my-caches', { maxAge: 100 })

cache.setItem('name', 'witt')
cache.getItem('name') // -> 'witt'

setTimeout(() => {
  cache.getItem('name') // -> null
}, 200)
```

### LICENSE

[MIT](./LICENSE)
