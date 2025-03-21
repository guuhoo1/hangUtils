import last from 'ramda/src/last'
import split from 'ramda/src/split'
import go from './go'

/**
 * 获取文件后缀。
 * @param fileName 文件名
 * @returns 返回文件后缀
 */
const getFileExt = (fileName: string): string => go(fileName, split('.'), last) as string

export default getFileExt
