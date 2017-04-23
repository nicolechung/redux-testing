# redux-testing
Testing async actions in redux using:
- redux-thunks
- redux-promise
- redux-saga
- redux-observables and async/await

Work in progress (i.e. not a thing yet)

These examples are redux-only, React JS is not being used.

To run the examples

### redux-thunk

```
npm run api
npm run basic-thunk
```


### redux-promise

```
npm run api
npm run basic-promise
```

Note: redux-promise-middleware example in the works



### redux-saga

```
npm run api
npm run basic-saga
```


## async-await

used:

```
babel-plugin-transform-async-to-generator
```

.babelrc
Didn't use `preset-env`, instead went back to es2015:

```
{
  "presets": ["es2015"],
  "plugins": ["transform-object-rest-spread", "transform-async-to-generator"]
}
```

webpack config

```
module.exports = {
  entry: [
    'babel-polyfill',
   ...
    './index.js'
  ],
```

## tests

```
npm run test
```