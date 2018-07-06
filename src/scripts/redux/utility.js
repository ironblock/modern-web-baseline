// @flow
// API - UTILITIES
// =============================================================================
// General purpose utilities required by the generated output files.

// REDUCER HELPERS
export const initialEndpointState: ApiEndpointState = Object.freeze({
  success: null,
  failure: null,
  timeout: null,
  mistake: null,
  isFetching: false,
  lastUpdate: null,
  lastResult: null
});
export const initialKeyedCollectionState: ApiEndpointState &
  KeyedCollectionState = Object.freeze({
  ...initialEndpointState,
  collection: {}
});

const rekeyObject = (key: string, obj: JSONObject) => {
  if (obj && typeof obj[key] === "string") {
    return { [obj[key]]: obj };
  }

  console.trace(`Could not key response obect by key '${key}'`);
  console.error(JSON.stringify(obj, null, 2));

  return {};
};

export const handleKeyedCollection = (
  key: string,
  collection: { [string]: JSONObject } = {},
  response: JSONObject | Array<JSONObject>
) => {
  if (Array.isArray(response)) {
    return response
      .map(obj => rekeyObject(key, obj))
      .reduce((prev, next) => ({ ...prev, ...next }), collection);
  }

  return { ...collection, ...rekeyObject(key, response) };
};

export const handleRequest = <Name: string, State: ReducerState<Name>>(
  name: Name,
  state: State
): State => ({
  ...state,
  [name]: {
    ...initialEndpointState,
    ...state[name],
    isFetching: true
  }
});

export const handleSuccess = <Name: string, State: ReducerState<Name>>(
  name: Name,
  state: State,
  action: FSA<*, *>
): State => ({
  ...state,
  [name]: {
    ...initialEndpointState,
    ...state[name],
    success: action.payload || null,
    isFetching: false,
    lastUpdate: Date.now(),
    lastResult: "success"
  }
});

export const handleSuccessKeyed = <
  Name: string,
  State: KeyedReducerState<Name>
>(
  name: Name,
  state: State,
  action: FSA<*, JSONObject>,
  key: string
): State => {
  const payload = action.payload;

  if (!payload || typeof payload !== "object") {
    throw new Error("Expected action's payload to be a valid JSON object");
  }

  return {
    ...state,
    [name]: {
      ...initialKeyedCollectionState,
      ...state[name],
      success: payload || null,
      isFetching: false,
      lastUpdate: Date.now(),
      lastResult: "success",
      collection: handleKeyedCollection(key, state[name].collection, payload)
    }
  };
};

export const handleFailure = <Name: string, State: ReducerState<Name>>(
  name: Name,
  state: State,
  action: FSA<*, *>
): State => ({
  ...state,
  [name]: {
    ...initialEndpointState,
    ...state[name],
    failure: action.payload || null,
    isFetching: false,
    lastUpdate: Date.now(),
    lastResult: "failure"
  }
});

export const handleTimeout = <Name: string, State: ReducerState<Name>>(
  name: Name,
  state: State,
  action: FSA<*, *>
): State => ({
  ...state,
  [name]: {
    ...initialEndpointState,
    ...state[name],
    timeout: action.payload || null,
    isFetching: false,
    lastUpdate: Date.now(),
    lastResult: "timeout"
  }
});

export const handleMistake = <Name: string, State: ReducerState<Name>>(
  name: Name,
  state: State,
  action: FSA<*, *>
): State => ({
  ...state,
  [name]: {
    ...initialEndpointState,
    ...state[name],
    mistake: action.payload || null,
    isFetching: false,
    lastUpdate: Date.now(),
    lastResult: "mistake"
  }
});
