import { is } from '@magic/test'

import db from '../src/index.mjs'

export default [
  { fn: () => db.set, expect: is.fn, info: 'db.set is a function' },
  { fn: () => db.get, expect: is.fn, info: 'db.get is a function' },
  { fn: () => db.del, expect: is.fn, info: 'db.del is a function' },
  { fn: () => db.init, expect: is.fn, info: 'db.init is a function' },
]
