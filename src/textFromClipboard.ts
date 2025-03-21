/**
 * 从剪贴板读取文本。
 * @returns 返回剪贴板中的文本
 */
const textFromClipboard = async (): Promise<string> => {
  const str = await navigator.clipboard.readText().catch(err => {
    const msg = 'Failed to read clipboard contents: '
    console.error(msg, err)
  })
  if (!str) {
    throw Error('No text in clipboard')
  }
  return str.trim()
}

export default textFromClipboard
