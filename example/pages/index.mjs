export const View = state => [
  h1(state.title),

  p(state.description),

  GitBadges('magic-libraries/db'),

  h3({ id: 'installation' }, 'installation'),
  Pre('npm install --save-exact magic-libraries/db'),

  h3({ id: 'usage' }, 'usage'),
  p('in a page/component, just use the lib.db functions, either as action or effect.'),

  p([
    'see ',
    Link(
      { to: 'https://github.com/magic-libraries/db/tree/master/example/assets/ExampleStore' },
      'ExampleStore',
    ),
    ' for a reference implementation',
  ]),

  p([
    'and ',
    Link({ to: 'https://github.com/magic-modules/gdpr' }, '@magic-modules/gdpr'),
    ' for an actual usecase.',
  ]),

  Pre(`
export const View = ({ key, state }) =>
  div({ onload: state => console.log('load') || state }, [
    div(['key: ', key]),
    div([
      h4('controls'),
      button({ onclick: [actions.examplestore.set, { key }] }, 'write'),
      button({ onclick: [actions.examplestore.get, { key }] }, 'read'),
      button({ onclick: [actions.examplestore.del, { key }] }, 'delete'),
    ]),

    div('value in local storage:'),
    state[key]
      ? ['state is accessible via state["' + key + '"]', div(state[key])]
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
          value: 'testing ' + Math.ceil(Math.random() * 100000),
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
  `),

  p('renders:'),
  ExampleStore({ state, key: 'magic-examplestore' }),

  h3({ id: 'source' }, 'source'),
  p('the source for this page is in the'),
  Link({ to: 'https://github.com/magic-libraries/db/tree/master/example' }, 'example directory'),
  p('and gets built and published to github using'),
  Link({ to: 'https://github.com/magic/core' }, '@magic/core'),

  LightSwitch(state),
]
