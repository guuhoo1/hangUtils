/**
 * 延迟执行函数。
 * @param fn 要执行的函数
 * @param ms 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
const delay = (fn: () => void, ms: number): Promise<any> => {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      fn()
      resolve(timeout)
    }, ms)
  })
}

export default delay
