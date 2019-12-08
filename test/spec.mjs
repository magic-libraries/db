import { is } from '@magic/test'

import db from '../src/index.mjs'

export default [
  { fn: () => db.write, expect: is.fn, info: 'db.write is a function' },
  { fn: () => db.read, expect: is.fn, info: 'db.read is a function' },
  { fn: () => db.clear, expect: is.fn, info: 'db.clear is a function' },
  { fn: () => db.getStore, expect: is.fn, info: 'db.getStore is a function' },
]
