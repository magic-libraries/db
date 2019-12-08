import { is } from '@magic/test'

import db from '../src/index.mjs'

// can not test this yet,
// we are using lib.json as dependency and
// @magic/test first has to be updated to build the magic before testing.

export default [
  { fn: true, expect: true, info: 'true is true, placeholder' },
  //~ { fn: db.write(() => {}, { key: 'key', value: 'value' }), expect: console.log, info: 'db.write is a function' },
]
