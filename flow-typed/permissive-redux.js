// @flow
// PERMISSIVE REDUX TYPES
// Author: Corey Vixie
// License: ISC
// =============================================================================

/*
  I found myself writing these over and over in various projects. I like the
  idea of Flux Standard Actions, but they're not always serializable. Similarly,
  Symbols as types is cute but dumb.

  The following is a highly opinionated set of types that work for implementing
  Redux loops, keeping things serializable, and generally having a nice time.
*/

/* eslint-disable no-use-before-define */
declare type FSA<
  Type: string,
  Payload: mixed | Error = typeof undefined,
  Meta: mixed = typeof undefined
> = {|
  type: Type,
  payload?: Payload,
  error?: boolean,
  meta?: Meta
|};

// JSON TYPES
declare type PrimitiveType = null | string | boolean | number;
declare type JSONObject = {
  [key: string]: PrimitiveType | JSONObject | JSONArray | void
};
declare type JSONArray =
  | Array<PrimitiveType>
  | Array<JSONObject>
  | Array<JSONArray>;
declare type JSONType = JSONObject | JSONArray | PrimitiveType;

declare type ApiEndpointState = {
  success: JSONType | null,
  failure: JSONType | null,
  timeout: JSONType | null,
  mistake: JSONType | null,
  isFetching: boolean,
  lastUpdate: number | null,
  lastResult: "success" | "failure" | "timeout" | "mistake" | null
};
declare type KeyedCollectionState = ApiEndpointState & {
  collection: { [string]: JSONObject }
};

declare type ReducerState<Name: string> = { [string]: ApiEndpointState } & {
  [Name]: ApiEndpointState
};
declare type KeyedReducerState<Name: string> = {
  [string]: KeyedCollectionState
} & { [Name]: KeyedCollectionState };
