export const View = ({ key, state }) =>
  div({ onload: state => console.log('load') || state }, [
    div(['key: ', key]),
    div([
      h4('controls'),
      button(
        {
          onclick: [actions.examplestore.write, { key }],
        },
        'write',
      ),
      button({ onclick: [actions.examplestore.read, { key }] }, 'read'),
      button({ onclick: [actions.examplestore.clear, { key }] }, 'clear'),
    ]),
    div('value in local storage:'),
    state[key]
      ? [`state is accessible via state['${key}']`, div(state[key])]
      : div('no value in db'),
  ])

export const actions = {
  examplestore: {
    read: (state, { key }) => [
      state,
      [
        lib.db.read,
        {
          key,
          action: actions.examplestore.refresh,
        },
      ],
    ],

    write: (state, { key }) => [
      state,
      [
        lib.db.write,
        {
          key,
          value: `testing ${Math.ceil(Math.random() * 100000)}`,
          action: actions.examplestore.refresh,
        },
      ],
    ],

    clear: (state, { key }) => [
      state,
      [
        lib.db.clear,
        {
          key,
          action: actions.examplestore.refresh,
        }
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
