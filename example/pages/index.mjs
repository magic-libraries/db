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
  div([
    div(['key: ', key]),
    div([
      h4('controls'),
      button({ onclick: [actions.examplestore.write, { key, value: 'testing' + Math.ceil(Math.random() * 100000) }] }, 'write'),
      button({ onclick: [actions.examplestore.read, { key }] }, 'read'),
      button({ onclick: [actions.examplestore.clear, { key }] }, 'clear'),
    ]),

    div('value in local storage:'),
    state.db && state.db[key]
      ? div(lib.json.stringify(state.db[key]))
      : div('no value in db'),
  ])


export const actions = {
  examplestore: {
    write: (state, props) => [lib.db.write, { ...props, state }],

    read: (state, props) => [lib.db.read, { ...props, state }],

    clear: (state, props) => [lib.db.clear, { ...props, state }],
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
