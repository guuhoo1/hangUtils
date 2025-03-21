/**
 * 确保函数只被调用一次。
 * @param fn 要调用的函数
 * @returns 返回一个新的函数
 */
const onlyOneInvoke = (fn: (...args: any[]) => any) => {
  let invoked = false
  return (...args: any[]) => {
    if (invoked) {
      return
    }
    invoked = true
    return fn(...args)
  }
}

export default onlyOneInvoke
