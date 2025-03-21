/**
 * 强制下载文件。
 * @param blob 文件数据
 * @param name 文件名
 */
const forceFileDownload = (blob: Blob, name: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', name)
  link.click()
}

export default forceFileDownload
