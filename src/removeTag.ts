/**
 * 移除 HTML 标签。
 * @param html HTML 字符串
 * @returns 返回移除标签后的纯文本
 */
const removeTag = (html: string): string => {
  if (html === undefined) {
    return ''
  }
  return html.replace(/(<([^>]+)>)/gi, '')
}

export default removeTag
