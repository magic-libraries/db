export const init = () => (typeof window !== 'undefined' && window.localStorage) || {}

export const set = (dispatch, { action, key, value }) => {
  const store = lib.db.init()

  let res = lib.json.stringify(value)

  if (typeof res === 'Error') {
    dispatch(action, new Error(`db:write ${key}`))
    return
  }

  store[key] = res

  dispatch(action, { key, value })
}

export const get = (dispatch, { action, key }) => {
  const store = lib.db.init()

  let value = undefined

  if (key && store[key]) {
    value = lib.json.parse(store[key])

    if (typeof res === 'Error') {
      dispatch(action, new Error(`db:read ${key}`))
      return
    }
  }

  dispatch(action, { key, value })
}

export const del = (dispatch, { action, key }) => {
  const store = lib.db.init()
  if (key) {
    delete store[key]
  }

  dispatch(action, { key, value: undefined })
}

export default {
  set,
  get,
  del,
  init,
}
