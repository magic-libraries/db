export const View = ({ key, state }) =>
  div([
    div(['key: ', key]),
    div([
      h4('controls'),
      button({ onclick: [actions.examplestore.set, { key }] }, 'write'),
      button({ onclick: [actions.examplestore.get, { key }] }, 'read'),
      button({ onclick: [actions.examplestore.del, { key }] }, 'delete'),
    ]),

    div('value in local storage:'),
    state[key]
      ? [`state is accessible via state['${key}']`, div(state[key])]
      : div('no value in db'),
  ])

export const actions = {
  examplestore: {
    get: (state, { key }) => [
      state,
      [
        lib.db.get,
        {
          key,
          action: actions.examplestore.refresh,
        },
      ],
    ],

    set: (state, { key }) => [
      state,
      [
        lib.db.set,
        {
          key,
          value: `testing ${Math.ceil(Math.random() * 100000)}`,
          action: actions.examplestore.refresh,
        },
      ],
    ],

    del: (state, { key }) => [
      state,
      [
        lib.db.del,
        {
          key,
          action: actions.examplestore.refresh,
        },
      ],
    ],

    refresh: (state, { key, value }) => {
      console.log('refresh', { key, value })

      if (key) {
        state[key] = value
      }

      return {
        ...state,
      }
    },
  },
}
