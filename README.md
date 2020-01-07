## @magic-libraries/db

localstorage backed client key value database for
[@magic](https://magic.github.io/core)

[html-docs](https://magic-libraries.github.io/db)

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

#### <a name="install"></a>installation
```bash
npm install --save-exact @magic-libraries/db
```

#### <a name="usage"></a>usage
in a page/component, just use the lib.db effects.

localstorage is synchronous, so we do not even have to await.

see [ExampleStore](https://github.com/magic-libraries/db/tree/master/example/assets/ExampleStore) for a reference implementation,

and [@magic-modules/gdpr](https://github.com/magic-modules/gdpr) for an actual usecase.

```javascript
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
```

#### changelog
##### 0.0.1
first release

##### 0.0.2
update readme.

##### 0.0.3
remove src/lib, libraries get imported automagically.

##### 0.0.4 - unreleased
require node 13.5.0

##### 0.0.5 - unreleased
...

[npm-image]: https://img.shields.io/npm/v/@magic-libraries/db.svg
[npm-url]: https://www.npmjs.com/package/@magic-libraries/db
[travis-image]: https://img.shields.io/travis/com/magic-libraries/db/master
[travis-url]: https://travis-ci.com/magic-libraries/db
[appveyor-image]: https://img.shields.io/appveyor/ci/magiclibraries/db/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magiclibraries/db/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic-libraries/db/badge.svg
[coveralls-url]: https://coveralls.io/github/magic-libraries/db
[greenkeeper-image]: https://badges.greenkeeper.io/magic-libraries/db.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic-libraries/db.svg
[snyk-image]: https://snyk.io/test/github/magic-libraries/db/badge.svg
[snyk-url]: https://snyk.io/test/github/magic-libraries/db
