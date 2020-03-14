# ${state.title}

${state.description}

<GitBadges>@magic-libraries/db</GitBadges>

### installation

`npm install --save-exact magic-libraries/db`

### usage

in a page/component, just use the lib.db functions, either as action or effect.

see [ExampleStore](https://github.com/magic-libraries/db/tree/master/example/assets/ExampleStore)
for a reference implementation and
[@magic-modules/gdpr](https://github.com/magic-modules/gdpr)
for an actual usecase

```
export const View = ({ key, state }) =>
  div([
    div(["key:  key]),
    div([
      h4("controls"),
      button({ onclick: [actions.examplestore.set, { key }] }, "write"),
      button({ onclick: [actions.examplestore.get, { key }] }, "read"),
      button({ onclick: [actions.examplestore.del, { key }] }, "delete"),
    ]),

    div("value in local storage:"),
    state[key]
      ? ["state is accessible via state["" + key + ""] div(state[key])]
      : div("no value in db"),
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
          value: "testing " + Math.ceil(Math.random() * 100000),
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
      console.log("refresh { key, value })

      if (key) {
        state[key] = value
      }

      return {
        ...state,
      }
    },
  },
}
```

then use it in a page:

`<ExampleStore state key="magic-examplestore"><ExampleStore>`

renders:

<ExampleStore state key="magic-examplestore"></ExampleStore>

### source

the source for this page is in the
[example directory](https://github.com/magic-libraries/db/tree/master/example)
and gets built and published to github using
[@magic/core](https://github.com/magic/core)
