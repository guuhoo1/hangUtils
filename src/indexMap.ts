/**
 * 对数组进行映射操作。
 * @param args 映射函数和数组
 * @returns 返回映射后的数组
 */
const indexMap = (...args: any[]) => {
  if (args.length === 1) {
    return (list: any[]) => {
      Array.prototype.map.call(list, args[0])
    }
  }
  return Array.prototype.map.call(args[1], args[0])
}

export default indexMap
