/**
 * 防抖函数。
 * @param func 要执行的函数
 * @param timeout 防抖时间（毫秒）
 * @returns 返回一个新的函数
 */
function debounce(func: (...args: any[]) => void, timeout: number = 300) {
  let timer: any
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => func(...args), timeout)
  }
}

export default debounce
