export const View = ({ key, state }) =>
  div([
    div(['key: ', key]),
    div([
      h4('controls'),
      button(
        {
          onclick: [
            actions.examplestore.write,
            { key, value: `testing ${Math.ceil(Math.random() * 100000)}` },
          ],
        },
        'write',
      ),
      button({ onclick: [actions.examplestore.read, { key }] }, 'read'),
      button({ onclick: [actions.examplestore.clear, { key }] }, 'clear'),
    ]),
    div('value in local storage:'),
    state.db && state.db[key] ? div(lib.json.stringify(state.db[key])) : div('no value in db'),
  ])

export const actions = {
  examplestore: {
    write: (state, props) => [lib.db.write, { ...props, state }],

    read: (state, props) => [lib.db.read, { ...props, state }],

    clear: (state, props) => [lib.db.clear, { ...props, state }],
  },
}
