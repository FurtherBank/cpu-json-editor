import { DependencyList, useCallback, useEffect, useRef } from 'react'

/**
 * [通用] useCallback，但是返回的函数在组件卸载后调用无效
 * @param callback
 * @param dependencies
 * @returns
 */
export function useSafeCallback(callback: (...args: any[]) => void, dependencies: DependencyList = []) {
  const callbackRef = useRef<((...args: any[]) => void) | null>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const safeCallback = useCallback((...args: any[]) => {
    if (callbackRef.current) {
      return callbackRef.current(...args)
    }
  }, dependencies)

  useEffect(() => {
    return () => {
      callbackRef.current = null
    }
  }, [])

  return safeCallback
}
