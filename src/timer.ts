/**
 * 延迟执行函数。
 * @param timeout 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
const timer = (timeout: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default timer
