import forceFileDownload from './forceFileDownload'

/**
 * 下载文件。
 * @param uri 文件地址
 * @param name 文件名
 */
const download = async ({ uri, name }: { uri: string; name: string }) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  forceFileDownload(blob, name)
}

export default download
