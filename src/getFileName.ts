import removeExt from './removeExt'

/**
 * 获取文件路径中的文件名。
 * @param path 文件路径
 * @param ext 是否包含扩展名，默认为 false
 * @returns 返回文件名
 */
const getFileName = (path: string, ext: boolean = false): string => {
  const getFileNameRegex = /[^\\/]+\.[^\\/]+$/
  const [file = null] = path.match(getFileNameRegex) || []
  const name = file || path
  return ext ? name : removeExt(name)
}

export default getFileName
