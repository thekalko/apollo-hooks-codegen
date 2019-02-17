/*
 * This file was generated by graphql-code-generator with the apollo-hooks-codegen plugin.
 * Any changes made to the file will be overwritten.
 */

import * as React from 'react'
import { createContext, useEffect, useState, useContext } from 'react'
import ApolloClient, {
  MutationOptions,
  ObservableQuery,
  WatchQueryOptions,
  ApolloCurrentResult,
} from 'apollo-client'
import { FetchResult } from 'apollo-link'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

/*
 * Operations from src/queries/demo.graphql
 */

export const fetchPersons = defineQuery<
  {
    /* variables */
  },
  {
    /* data */
    persons?: null | Array<{
      id: string
      name: string
      blog?: null | string
    }>
  }
>(gql`
  query fetchPersons {
    persons {
      id
      name
      blog
    }
  }
`)

export module fetchPersons {
  export interface variables {}
}

/*
 * Boilerplate
 */

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Error = any
type QueryOpts<V> = Omit<WatchQueryOptions<V>, 'query'>
type MutateOpts<D, V> = Omit<MutationOptions<D, V>, 'mutation'>

// We grab the ApolloClient from this context within our hooks
type ContextType = { apolloClient?: ApolloClient<any> }
const apolloContext = createContext<ContextType>({})

// Must be inserted at the root of all components that want to use the hook
// functions supplied by this file.
export function ApolloHooksProvider({
  children,
  apolloClient,
}: {
  children?: React.ReactNode
  apolloClient: ApolloClient<any> | undefined
}) {
  const elementType = apolloContext.Provider
  const elementProps: React.ProviderProps<ContextType> = {
    value: { apolloClient },
  }
  return React.createElement(elementType, elementProps, children)
}

// Converts a gql-snippet into a user-callable function that takes options,
// which can then be passed to useApolloQuery to execute the query.
function defineQuery<V, D>(doc: DocumentNode) {
  return function configureQuery(opts: QueryOpts<V> = {}) {
    return function executeQuery(client: ApolloClient<any>) {
      return client.watchQuery<D>({ query: doc, ...opts })
    }
  }
}

// Executes a query that has been created by calling the exported function with
// the same name as the query operation.
// The React Hooks rules apply - this function must be called unconditionally
// within a functional React Component and will rerender the component whenever
// the query result changes.
export function useApolloQuery<D, V>(
  configuredQuery: (client: ApolloClient<any>) => ObservableQuery<D, V>
): [ApolloCurrentResult<D>, ObservableQuery<D, V>] {
  const { apolloClient } = useContext(apolloContext)
  if (!apolloClient) throw 'No ApolloClient provided'

  const query = configuredQuery(apolloClient)

  const [result, setResult] = useState(query.currentResult())
  useEffect(() => {
    const subscription = query.subscribe(setResult)
    return () => subscription.unsubscribe()
  }, [])

  return [result, query]
}

// Converts a gql-snippet into a user-callable function that takes options,
// which can then be passed to useApolloMutation to provide the mutate function.
function defineMutation<V, D>(mutation: DocumentNode) {
  return function configureMutation(opts: MutateOpts<D, V> = {}) {
    return function loadMutation(client: ApolloClient<any>) {
      return function executeMutation(opts2: MutateOpts<D, V> = {}) {
        return client.mutate<D>({ mutation, ...opts, ...opts2 })
      }
    }
  }
}

// Prepares a mutate function when supplied with the exported function with
// the same name as the mutation operation.
// The React Hooks rules apply - this function must be called unconditionally
// within a functional React Component.
export function useApolloMutation<D, V>(
  configuredMutation: (
    client: ApolloClient<any>
  ) => (opts?: MutateOpts<D, V>) => Promise<FetchResult<D>>
) {
  const { apolloClient } = useContext(apolloContext)
  if (!apolloClient) throw 'No ApolloClient provided'
  const mutate = configuredMutation(apolloClient)
  return mutate
}
