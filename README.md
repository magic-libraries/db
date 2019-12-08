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
in a page/component, just use the lib.db functions, either as action or effect.

see [ExampleStore](https://github.com/magic-libraries/db/tree/master/example/assets/ExampleStore) for a reference implementation,

and [@magic-modules/gdpr](https://github.com/magic-modules/gdpr) for an actual usecase.

```javascript
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
```

#### changelog
##### 0.0.1
first release

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
