export const getStore = () => (typeof window !== 'undefined' && window.localStorage) || {}

export const write = (dispatch, { action, key, value }) => {
  const store = lib.db.getStore()

  let res = lib.json.stringify(value)

  if (typeof res === 'Error') {
    dispatch(action, new Error(`db:write ${key} ${val}`))
    return
  }

  store[key] = res

  dispatch(action, { key, value })
}

export const read = (dispatch, { action, key }) => {
  const store = lib.db.getStore()

  let value = undefined

  if (store[key]) {
    value = lib.json.parse(store[key])

    if (typeof res === 'Error') {
      dispatch(action, new Error(`db:read ${key}`))
      return
    }
  }

  dispatch(action, { key, value })
}

export const clear = (dispatch, { action, key }) => {
  const store = lib.db.getStore()
  if (store[key]) {
    store.removeItem(key)
  }

  dispatch(action, { key, value: undefined })
}

export default {
  write,
  read,
  clear,
  getStore,
}
