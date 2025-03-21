/**
 * 移除文件名的扩展名。
 * @param filename 文件名
 * @returns 返回移除扩展名后的文件名
 */
function removeExt(filename: string): string {
  return filename.replace(/\.(\w*)$/, '')
}

export default removeExt
