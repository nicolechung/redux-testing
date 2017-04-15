# redux-testing
Testing redux using thunks, promises, generators and async/await

Work in progress (i.e. not a thing yet)


# Redux thunk - testing libraries
When testing with actions that use `fetch`, you can use `nock` to mock the request/response.

However when testing with actions that use `axios` you should use `moxios` to mock the request/reponse.

# Redux thunk
- can dispatch many actions from a single action

## Testing and Mocking
- Have to mock the request and the response object
- In your action creator, you have more control of your payload, so mocking it is easier

# redux-promise middleware
- single action returns either the response or the error object from a Promise resolve or reject

## Testing and Mocking
- redux-promise, on success, returns the response object (not the request promise object).
- Have to mock the request and reponse object
- because redux-promise just returns the response or error object, hard to mock discrete stages of the api call (loading, then success/error)
- because middleware returns the ACTUAL response, not just the part you want, testing can be a bit tricker (in jest you have to use toMatchObject which takes your mock object and compares it to the mock response, which might contain more key/value pairs than you need)