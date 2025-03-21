/**
 * 限制输入框只能输入数字。
 * @param event 键盘事件
 */
export const onlyNumber = (event: KeyboardEvent) => {
  if (event.keyCode < 48 || event.keyCode > 57) {
    event.returnValue = false
  }
}

export default onlyNumber
