export const getStore = () => (window && window.localStorage) || {}

export const write = (dispatch, { action, key, state, value }) => {
  const store = lib.db.getStore()

  let res = lib.json.stringify(value)

  if (typeof res === 'Error') {
    const { errors = {} } = state
    errors.db = errors.db || []

    const err = {
      code: 'db:write',
      msg: 'Invalid JSON, could not write to db',
    }

    errors.db.push(err)

    return {
      ...state,
      errors,
    }
  }

  store[key] = res

  const { db = {} } = state

  return {
    ...state,
    db: {
      ...db,
      [key]: value,
    },
  }
}

export const read = (dispatch, { action, key, state }) => {
  const store = lib.db.getStore()

  let res = undefined
  const value = store[key]

  if (value) {
    res = lib.json.parse(value)
    if (typeof res === 'Error') {
      const { errors = {} } = state
      errors.db = errors.db || []

      const err = {
        code: 'db:write',
        msg: 'Invalid JSON, could not read from db',
      }

      errors.db.push(err)

      return {
        ...state,
        errors,
      }
    }
  }

  const { db = {} } = state

  return {
    ...state,
    db: {
      ...db,
      [key]: res,
    },
  }
}

export const clear = (dispatch, { key, state }) => {
  const store = lib.db.getStore()
  if (store[key]) {
    store.removeItem(key)
  }

  delete state.db[key]

  return {
    ...state,
  }
}

export default {
  write,
  read,
  clear,
  getStore,
}
