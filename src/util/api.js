import { API } from 'aws-amplify'

const __API__ = {
  Events: 'HomePageEvents'
}

export const getApiIdentifier = (name) => {
  return __API__[name]
}

export const performApi = async ({
  store,
  apiName,
  apiPath,
  apiAction,
  apiPayload = {},
  stateReducer = (store, response) => { store.setState({ ...response }) }
}) => {
  const init = {
    body: {
      env: process.env.NODE_ENV,
      action: apiAction,
      version: 'v1',
      ts: new Date().toISOString(),
      payload: apiPayload
    }
  }
  const response = await API.post(getApiIdentifier(apiName), apiPath, init)
  stateReducer(store, response)
}
