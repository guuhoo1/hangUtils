/**
 * 返回一个常量函数，该函数总是返回指定的值。
 * @param value 常量值
 * @returns 返回一个函数
 */
const constant = <T>(value: T) => {
  return () => value
}

export default constant
