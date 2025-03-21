/**
 * 打印扁平化的调试信息。
 * @param args 调试信息
 */
const flatLog = (...args: any[]) => {
  const serialized = args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, 2)
    } else if (typeof arg === 'function') {
      return arg.toString()
    }
    return arg
  })
  console.log(...serialized) // eslint-disable-line
}

export default flatLog
