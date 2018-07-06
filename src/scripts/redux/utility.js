// @flow
// API - UTILITIES
// =============================================================================
// General purpose utilities required by the generated output files.

// FLUX STANDARD ACTIONS
// These may be brought in by something like flow-typed in the future. For the
// time being, this is a relatively faithful conversion of the TypeScript
// equivalents defined in https://github.com/redux-utilities/flux-standard-action/blob/master/src/index.d.ts

/* eslint-disable no-use-before-define */
export type ActionType = string;
export type NormalFSA<
  Payload: mixed | Error = typeof undefined,
  Meta: mixed = typeof undefined
> = {|
  type: ActionType,
  payload: Payload,
  error: boolean,
  meta: Meta
|};
export type FluxStandardAction<Payload, Meta> = NormalFSA<Payload, Meta>;
export type FSA<Payload, Meta> = NormalFSA<Payload, Meta>;

// JSON TYPES
export type PrimitiveType = null | string | boolean | number;
export type JSONObject = {
  [key: string]: PrimitiveType | JSONObject | JSONArray | void
};
export type JSONArray =
  | Array<PrimitiveType>
  | Array<JSONObject>
  | Array<JSONArray>;
export type JSONType = JSONObject | JSONArray | PrimitiveType;

// SWAGGER GEN JS UTILITY TYPES
export type ApiEndpointState = {
  success: JSONType | null,
  failure: JSONType | null,
  timeout: JSONType | null,
  mistake: JSONType | null,
  isFetching: boolean,
  lastUpdate: number | null,
  lastResult: "success" | "failure" | "timeout" | "mistake" | null
};
export type KeyedCollectionState = ApiEndpointState & {
  collection: { [string]: JSONObject }
};

export type ReducerState<Name: string> = { [string]: ApiEndpointState } & {
  [Name]: ApiEndpointState
};
export type KeyedReducerState<Name: string> = {
  [string]: KeyedCollectionState
} & { [Name]: KeyedCollectionState };

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
  action: FSA<*, *>,
  key: string
): State => ({
  ...state,
  [name]: {
    ...initialKeyedCollectionState,
    ...state[name],
    success: action.payload || null,
    isFetching: false,
    lastUpdate: Date.now(),
    lastResult: "success",
    collection: handleKeyedCollection(
      key,
      state[name].collection,
      action.payload
    )
  }
});

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
