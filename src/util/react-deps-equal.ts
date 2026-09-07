import { type DependencyList } from 'react';

/**
 * Sometimes, we need to know if a hook's dependency list has changed. The example case in this app is useAsync,
 * which wraps loading/error throwing for async requests. The return value of the hook depends on the data retreived by
 * the fetcher plus its dependencies and its own isLoading state. Without a comparison to the previous dependencies, 
 * when new ones come in, the effect will run, call setIsLoading. This will trigger a second rerender, but we don't 
 * need to evaluate whether the new depencies have changed in the effect, because we can already calculate that 
 * outside the effect context. So we use this function to compare the dependencies and update state in the top-level 
 * hook context. This will immediately cause React to throw away any re-render in progress and start again with
 * the fresh dependencies it needs.
 * 
 * @param a Previous dependencies
 * @param b Current dependencies 
 * @returns Boolean result of a shallow compare
 */
export function reactDepsEqual(a: DependencyList, b: DependencyList) {
  return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
}