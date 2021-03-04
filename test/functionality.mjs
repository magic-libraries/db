import { is } from '@magic/test'

import db from '../src/index.mjs'
import json from '@magic-libraries/json'
import tryCatch from '@magic-libraries/try-catch'

// can not test this yet,
// we are using lib.json as dependency and
// @magic/test first has to be updated to build the magic before testing.

const dispatch = name => (fn, args) => {
  global[name] = fn(args)
}

const beforeAll = () => {
  global.lib.db = db
  global.lib.json = json
  global.lib.tryCatch = tryCatch

  global.window = {
    localStorage: {},
  }
}

const dispatchedTest = (fn, args) => {
  const name = Math.random() * 10000

  fn(dispatch(name), args)

  const val = global[name]
  delete global[name]
  return val
}

const action = s => s

const beforeGet = key => () => {
  dispatchedTest(lib.db.set, { key, value: 'testing', action })
}

export default {
  beforeAll,
  tests: {
    set: [
      {
        fn: () => dispatchedTest(lib.db.set, { key: 'key1', value: { testing: 'value' }, action }),
        expect: is.deep.equal({ key: 'key1', value: { testing: 'value' } }),
        info: 'db.set returns keys',
      },
      {
        fn: () => dispatchedTest(lib.db.set, { key: 'key2', value: { testing: null }, action }),
        expect: is.deep.equal({ key: 'key2', value: { testing: null } }),
        info: 'db.set can set null',
      },
      {
        fn: () => dispatchedTest(lib.db.set, { key: 'key3', value: { testing: false }, action }),
        expect: is.deep.equal({ key: 'key3', value: { testing: false } }),
        info: 'db.set can set false',
      },
      {
        fn: () => dispatchedTest(lib.db.set, { key: 'key', value: undefined, action }),
        expect: is.deep.equal({ key: 'key', value: undefined }),
        info: 'db.set can set undefined',
      },
    ],

    get: [
      {
        before: beforeGet('getValue1'),
        fn: () => {
          const result = dispatchedTest(lib.db.get, { key: 'getValue1', action })
          return result
        },
        // before: beforeGet('getValue'),
        expect: is.deep.equal({ key: 'getValue1', value: 'testing' }),
        info: 'lib.db.get can read values',
      },
    ],

    del: [
      {
        before: beforeGet('delValue1'),
        fn: () => {
          dispatchedTest(lib.db.set, { key: 'delValue1', value: 'testing', action })

          if (!global.window.localStorage.delValue1) {
            throw new Error('test/set.mjs#del: could not set db value before deleting it')
          }

          dispatchedTest(lib.db.del, { key: 'delValue1', action })

          const result = dispatchedTest(lib.db.get, { key: 'delValue1', action })
          return result.value
        },
        expect: undefined,
        info: 'db.del can delete values',
      },
    ],
  },
}
