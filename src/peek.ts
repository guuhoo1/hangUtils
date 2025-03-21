/**
 * 打印调试信息，返回原值。
 * @param args 调试信息
 * @returns 返回原值
 */
const peek = (...args: any[]) => {
  return (value: any) => {
    if (!args.length) {
      console.log('peek', value) // eslint-disable-line
    } else {
      console.log(...args, value) // eslint-disable-line
    }
    return value
  }
}

export default peek
