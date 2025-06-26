# 个人开发常用工具类库 基于 Ramda 的工具库

### 下载&安装

```
npm i @wuguohang/hangutils
yarn add @wuguohang/hangutils
pnpm add @wuguohang/hangutils
```

ES6

Install

### 新增功能文档

### appendOrRemove

根据目标值是否存在，将其添加到列表或从列表中移除

```javascript
const state = ['one', 'two', 'three']
appendOrRemove('four', state) // 返回: ['one', 'two', 'three', 'four']
appendOrRemove('two', state) // 返回: ['one', 'three']
```

### appendQueryParams

追加查询参数到当前 URL

```javascript
// 当前URL: https://example.com?page=1
appendQueryParams({ sort: 'desc' })
// 结果URL: https://example.com?page=1&sort=desc
```

### assignQueryParams

分配查询参数到 URL

```javascript
const url = 'https://example.com?page=1'
const setParams = assignQueryParams(url)
setParams({ sort: 'desc' })
// 结果URL: https://example.com?page=1&sort=desc
```

### blinkDomElement

让 DOM 元素闪烁（边框红色闪烁效果）

```javascript
const element = document.getElementById('myElement')
blinkDomElement(element)
// 元素边框会红色闪烁3秒
```

### copyToClipboard

复制文本到剪贴板

**参数说明:**

- `val` (String): 要复制的文本内容

**返回值:**

- 无返回值

**使用场景:**

- 复制用户生成的链接或代码
- 实现"点击复制"功能
- 复制表单数据或配置信息

**注意事项:**

- 需要用户交互触发(如点击事件)
- 某些浏览器可能限制非用户触发的剪贴板访问
- 不支持复制富文本格式

**示例:**

```javascript
// 基本使用
copyToClipboard('要复制的文本')

// 结合点击事件
document.getElementById('copyBtn').addEventListener('click', () => {
  copyToClipboard(document.getElementById('textToCopy').value)
  alert('已复制到剪贴板')
})

// 复制动态生成的内容
const generateLink = () => `https://example.com/invite/${Math.random().toString(36).substr(2, 8)}`
copyToClipboard(generateLink())
```

### debounce

防抖函数，延迟执行直到停止调用后指定时间

```javascript
const handleInput = debounce(value => {
  console.log('Search for:', value)
}, 500)

// 快速连续输入时，只会在停止输入500ms后执行一次
inputElement.addEventListener('input', e => handleInput(e.target.value))
```

### download

下载文件到本地

**参数说明:**

- `uri` (String): 要下载的文件 URL
- `name` (String): 下载后保存的文件名

**返回值:**

- Promise: 下载完成后 resolve，失败时 reject

**使用场景:**

- 导出数据为 CSV/Excel 文件
- 下载用户生成的文档
- 保存服务器返回的文件

**注意事项:**

- 需要有效的 CORS 配置
- 文件名应包含正确扩展名
- 大文件下载可能需要进度提示

**示例:**

```javascript
// 基本使用
download({
  uri: 'https://example.com/report.pdf',
  name: 'monthly-report.pdf'
})

// 处理下载结果
download({ uri: '...', name: '...' })
  .then(() => console.log('下载成功'))
  .catch(err => console.error('下载失败:', err))

// 动态生成文件名
const now = new Date().toISOString().slice(0, 10)
download({
  uri: '/api/export',
  name: `sales-report-${now}.xlsx`
})

// 带认证的下载
download({
  uri: '/api/secure-file',
  name: 'document.pdf',
  headers: { Authorization: 'Bearer xxx' }
})
```

### forceFileDownload

强制浏览器下载 Blob 数据为文件

**参数说明:**

- `blob` (Blob): 要下载的文件数据，可以是 Blob 或 File 对象
- `name` (String): 下载后保存的文件名

**返回值:**

- 无返回值

**使用场景:**

- 下载前端生成的 Blob 数据
- 导出画布内容为图片
- 保存前端处理后的文件

**注意事项:**

- 需要用户交互触发(如点击事件)
- 文件名应包含正确扩展名
- 大文件可能导致内存问题
- 下载后需要释放 URL 对象

**示例:**

```javascript
// 下载画布内容
canvas.toBlob(blob => {
  forceFileDownload(blob, 'drawing.png')
})

// 下载JSON数据
const data = { key: 'value' }
const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
forceFileDownload(blob, 'data.json')

// 释放URL对象(推荐)
const blob = /*...*/
const url = URL.createObjectURL(blob)
const link = document.createElement('a')
link.href = url
link.download = 'file.pdf'
link.click()
setTimeout(() => URL.revokeObjectURL(url), 100)
```

### flatLog

打印扁平化的调试信息，自动将对象转为 JSON 字符串

**参数说明:**

- `...args` (any): 要打印的任意类型参数，可以是多个

**返回值:**

- 无返回值

**使用场景:**

- 调试复杂对象结构
- 查看函数定义
- 同时输出多个不同类型值

**注意事项:**

- 对象会被序列化为 JSON 字符串
- 函数会输出其源代码
- 保持原始值的输出格式

**示例:**

```javascript
// 调试对象
const user = { id: 1, profile: { name: 'Alice' } }
flatLog('User:', user)
// 控制台输出: User: {"id":1,"profile":{"name":"Alice"}}

// 调试函数
function example() {
  return 'test'
}
flatLog('Function:', example)
// 控制台输出: Function: function example() { return 'test' }

// 混合类型调试
flatLog('Status:', true, 'Count:', 5, 'Data:', { items: [] })
// 控制台输出: Status: true Count: 5 Data: {"items":[]}
```

### idEqual

检查对象的指定属性是否等于目标值

**参数说明:**

- `propName` (String): 要比较的属性名，默认为'\_id'
- `targetValue` (any): 要匹配的目标值

**返回值:**

- (Function): 返回一个谓词函数，可用于数组的 find/filter 等方法

**使用场景:**

- 在对象数组中查找特定 ID 的对象
- 过滤对象数组
- 与 Ramda 的 find/filter 等方法配合使用

**注意事项:**

- 使用严格相等(===)比较
- 支持柯里化调用
- 默认比较'\_id'属性

**示例:**

```javascript
// 基本使用
const users = [
  { _id: 1, name: 'Alice' },
  { _id: 2, name: 'Bob' }
]
users.find(idEqual(1)) // {_id: 1, name: 'Alice'}

// 指定属性名
const products = [
  { id: 1, name: 'Phone' },
  { id: 2, name: 'Laptop' }
]
products.find(idEqual('id', 2)) // {id: 2, name: 'Laptop'}

// 柯里化调用
const findById = idEqual('id')
products.find(findById(1)) // {id: 1, name: 'Phone'}

// 与Ramda配合使用
R.filter(idEqual(2), users) // [{_id: 2, name: 'Bob'}]
```

### indexMap

对数组进行映射操作，支持柯里化调用

**参数说明:**

- `mapper` (Function): 映射函数，接收当前元素、索引和原数组作为参数
- `array` (Array): 要映射的数组

**返回值:**

- (Array): 映射后的新数组
- (Function): 当只提供 mapper 参数时，返回柯里化函数

**使用场景:**

- 需要索引参与计算的数组映射
- 函数式编程中的组合操作
- 与 Ramda 的 pipe/compose 配合使用

**注意事项:**

- 映射函数接收三个参数：(value, index, array)
- 保持原数组不变
- 支持部分应用(柯里化)

**示例:**

```javascript
// 基本使用
const numbers = [1, 2, 3]
indexMap((n, i) => n * i, numbers) // [0, 2, 6]

// 柯里化使用
const addIndex = indexMap((n, i) => n + i)
addIndex([10, 20, 30]) // [10, 21, 32]

// 与Ramda配合
R.pipe(
  R.filter(n => n > 0),
  indexMap((n, i) => n * i)
)([-1, 2, 3]) // [0, 3]

// 索引相关计算
const items = ['a', 'b', 'c']
indexMap((item, i) => `${i + 1}. ${item}`, items)
// ['1. a', '2. b', '3. c']
```

### peek

打印调试信息并返回原值，便于调试链式调用

**参数说明:**

- `label` (String): 调试标签，用于标识输出
- `value` (any): 要调试的值

**返回值:**

- (any): 原封不动返回输入值

**使用场景:**

- 调试函数式编程中的管道操作
- 检查中间值而不中断流程
- 快速查看数据转换过程

**注意事项:**

- 不影响原有数据流
- 支持管道操作符(|>)
- 标签可选，不加标签时只输出值

**示例:**

```javascript
// 基本使用
const result =
  [1, 2, 3].map(x => x * 2)
  |> peek('After map:') // 打印: After map: [2, 4, 6]
    .reduce((a, b) => a + b, 0)

// 无标签调试
const users =
  fetchUsers()
  |> peek() // 打印获取的用户数据
    .filter(u => u.active)

// 调试异步流程
const data = await fetch('/api')
  .then(res => res.json())
  .then(peek('API响应:')) // 打印API响应
  .then(processData)
```

### removeBy

根据条件移除数组中的元素

**参数说明:**

- `predicate` (Function): 判断函数，返回 true 表示要移除该元素
- `array` (Array): 要操作的数组

**返回值:**

- (Array): 返回一个新数组，不会修改原数组

**使用场景:**

- 根据复杂条件移除元素
- 函数式编程中的过滤操作
- 与 Ramda 的 filter/reject 配合使用

**注意事项:**

- 使用严格相等(===)比较
- 支持柯里化调用
- 保持原数组不变

**示例:**

```javascript
// 基本使用
const users = [
  { id: 1, name: 'Alice', active: false },
  { id: 2, name: 'Bob', active: true }
]
removeBy(user => !user.active, users)
// 返回 [{ id: 2, name: 'Bob', active: true }]

// 柯里化调用
const removeInactive = removeBy(user => !user.active)
removeInactive(users)
// 返回 [{ id: 2, name: 'Bob', active: true }]

// 与Ramda配合
R.pipe(
  R.map(user => ({ ...user, name: user.name.toUpperCase() })),
  removeBy(user => user.id === 1)
)(users)
// 返回 [{ id: 2, name: 'BOB', active: true }]
```

### removeById

根据指定属性移除数组中匹配的元素

**参数说明:**

- `targetValue` (any): 要匹配的目标值
- `propName` (String): 要比较的属性名，默认为'\_id'
- `array` (Array): 要操作的数组

**返回值:**

- (Array): 返回一个新数组，不会修改原数组

**使用场景:**

- 根据 ID 移除对象数组中的元素
- 与 Ramda 的 reject 配合使用
- 支持柯里化调用

**注意事项:**

- 使用严格相等(===)比较
- 默认比较'\_id'属性
- 保持原数组不变

**示例:**

```javascript
// 基本使用
const users = [
  { _id: '1', name: 'Alice' },
  { _id: '2', name: 'Bob' }
]
removeById('1', '_id', users)
// 返回 [{ _id: '2', name: 'Bob' }]

// 柯里化调用
const removeUser = removeById('1')
removeUser('_id', users)
// 返回 [{ _id: '2', name: 'Bob' }]

// 默认使用'_id'属性
const items = [
  { _id: 1, value: 'A' },
  { _id: 2, value: 'B' }
]
removeById(1)(items)
// 返回 [{ _id: 2, value: 'B' }]

// 与Ramda配合
R.pipe(
  R.map(user => ({ ...user, active: true })),
  removeById('2')
)(users)
// 返回 [{ _id: '1', name: 'Alice', active: true }]
```

### textFromClipboard

从剪贴板读取文本内容

**参数说明:**

- 无参数

**返回值:**

- Promise<String>: 解析为剪贴板文本内容的 Promise

**使用场景:**

- 实现"粘贴"功能
- 获取用户复制的文本
- 与复制功能配合实现数据传递

**注意事项:**

- 需要用户授权剪贴板访问权限
- 只能在安全上下文(HTTPS)中使用
- 部分浏览器可能限制使用

**示例:**

```javascript
// 基本使用
document.getElementById('pasteBtn').addEventListener('click', async () => {
  try {
    const text = await textFromClipboard()
    console.log('剪贴板内容:', text)
  } catch (err) {
    console.error('读取剪贴板失败:', err)
  }
})

// 处理粘贴的URL
const pasteUrl = async () => {
  const text = await textFromClipboard()
  if (text.startsWith('http')) {
    window.open(text)
  }
}

// 与复制功能配合
const copyAndPaste = async () => {
  await copyToClipboard('测试文本')
  const pasted = await textFromClipboard()
  console.assert(pasted === '测试文本')
}
```

### updateBy

根据条件更新数组中的元素

**参数说明:**

- `predicate` (Function): 判断函数，返回 true 表示要更新该元素
- `newValue` (Object|Function): 新值或更新函数
- `array` (Array): 要操作的数组

**返回值:**

- (Array): 返回一个新数组，不会修改原数组

**使用场景:**

- 根据复杂条件更新元素
- 函数式编程中的不可变更新
- 与 Ramda 的 map/when 配合使用

**注意事项:**

- 支持直接提供新对象或更新函数
- 保持原数组不变
- 支持柯里化调用

**示例:**

```javascript
// 基本使用
const users = [
  { id: 1, name: 'Alice', role: 'user' },
  { id: 2, name: 'Bob', role: 'user' }
]
updateBy(user => user.id === 1, { ...user, role: 'admin' }, users)
// 返回 [{ id: 1, name: 'Alice', role: 'admin' }, { id: 2, name: 'Bob', role: 'user' }]

// 使用更新函数
updateBy(
  user => user.role === 'user',
  user => ({ ...user, active: true }),
  users
)

// 柯里化调用
const makeAdmin = updateBy(user => user.id === 1)
makeAdmin({ ...user, role: 'admin' }, users)

// 与Ramda配合
R.pipe(
  R.filter(user => user.active),
  updateBy(user => user.role === 'user', { ...user, priority: 1 })
)(users)
```

### updateById

根据指定属性更新数组中匹配的元素

**参数说明:**

- `targetValue` (any): 要匹配的目标值
- `propName` (String): 要比较的属性名，默认为'\_id'
- `newValue` (Object|Function): 新值或更新函数
- `array` (Array): 要操作的数组

**返回值:**

- (Array): 返回一个新数组，不会修改原数组

**使用场景:**

- 根据 ID 更新对象数组中的元素
- 函数式编程中的不可变更新
- 支持柯里化调用

**注意事项:**

- 使用严格相等(===)比较
- 默认比较'\_id'属性
- 保持原数组不变

**示例:**

```javascript
// 基本使用
const users = [
  { _id: '1', name: 'Alice' },
  { _id: '2', name: 'Bob' }
]
updateById('2', '_id', { _id: '2', name: 'Robert' }, users)
// 返回 [{ _id: '1', name: 'Alice' }, { _id: '2', name: 'Robert' }]

// 使用更新函数
updateById('1', '_id', user => ({ ...user, active: true }), users)

// 柯里化调用
const updateUser = updateById('1')
updateUser('_id', { _id: '1', name: 'Alice Smith' }, users)

// 默认使用'_id'属性
const items = [
  { _id: 1, value: 'A' },
  { _id: 2, value: 'B' }
]
updateById(1, null, { _id: 1, value: 'AA' }, items)
// 返回 [{ _id: 1, value: 'AA' }, { _id: 2, value: 'B' }]
```

<br>

```js
import {getHostName, ...} from '@wuguohang/hangutils'
```

NodeJS

```js
const {getHostName, ...} = require('@wuguohang/hangutils')
```

<br>

### getQueryParams

解析 URL 查询参数为对象

**参数说明:**

- `url` (String): 要解析的 URL 字符串，默认为当前页面 URL

**返回值:**

- (Object): 包含所有查询参数键值对的对象

**使用场景:**

- 获取页面 URL 中的查询参数
- 解析 API 返回的带查询参数的 URL
- 与路由系统配合使用

**注意事项:**

- 参数值会自动解码
- 同名参数会覆盖，不保留多个值
- 空值参数会转为空字符串

**示例:**

```javascript
// 基本使用
// URL: https://example.com?name=John&age=30
getQueryParams() // { name: 'John', age: '30' }

// 解析特定URL
const url = 'https://api.com/search?q=hello&page=2'
getQueryParams(url) // { q: 'hello', page: '2' }

// 处理特殊字符
const encodedUrl = 'https://example.com?query=hello%20world'
getQueryParams(encodedUrl) // { query: 'hello world' }

// 与路由配合
const params = getQueryParams()
if (params.id) {
  fetch(`/api/items/${params.id}`)
}

// 空值处理
getQueryParams('https://example.com?empty=') // { empty: '' }
```

<br>

### queryObjToStr

将对象转换为 URL 查询字符串

**参数说明:**

- `obj` (Object): 包含键值对的对象
- `options` (Object, 可选): 配置选项
  - `encode` (Boolean): 是否对值进行编码，默认为 true
  - `sort` (Boolean): 是否按键名排序，默认为 false

**返回值:**

- (String): URL 查询字符串，不带前导问号

**使用场景:**

- 构建 API 请求 URL
- 生成可分享的带参数链接
- 与路由系统配合使用

**注意事项:**

- 空值会被忽略
- 数组值会转换为多个同名参数
- 支持嵌套对象转换

**示例:**

```javascript
// 基本使用
queryObjToStr({ a: 1, b: 2 }) // 'a=1&b=2'

// 处理特殊字符
queryObjToStr({ q: 'hello world' }) // 'q=hello%20world'

// 数组参数
queryObjToStr({ ids: [1, 2, 3] }) // 'ids=1&ids=2&ids=3'

// 配置选项
queryObjToStr({ b: 2, a: 1 }, { sort: true }) // 'a=1&b=2'
queryObjToStr({ q: '测试' }, { encode: false }) // 'q=测试'

// 构建API URL
const params = { page: 1, limit: 10 }
fetch(`/api/data?${queryObjToStr(params)}`)

// 嵌套对象
queryObjToStr({ filter: { name: 'John', age: 30 } })
// 'filter[name]=John&filter[age]=30'
```

<br>

### setQueryParams

设置当前 URL 的查询参数并更新浏览器地址栏

**参数说明:**

- `params` (Object): 要设置的查询参数对象
- `options` (Object, 可选): 配置选项
  - `replace` (Boolean): 是否替换历史记录而不是新增，默认为 false
  - `merge` (Boolean): 是否合并现有参数，默认为 true

**返回值:**

- 无返回值

**使用场景:**

- 实现无刷新页面状态更新
- 构建可分享的 URL 状态
- 与路由系统配合使用

**注意事项:**

- 会触发浏览器历史记录变更
- 参数值会自动编码
- 空值参数会被移除

**示例:**

```javascript
// 基本使用
setQueryParams({ page: 2, sort: 'desc' })
// URL变为: https://example.com?page=2&sort=desc

// 合并参数
// 当前URL: https://example.com?page=1
setQueryParams({ sort: 'asc' }, { merge: true })
// URL变为: https://example.com?page=1&sort=asc

// 替换参数
setQueryParams({ page: 3 }, { merge: false })
// URL变为: https://example.com?page=3

// 替换历史记录
setQueryParams({ filter: 'active' }, { replace: true })

// 移除参数
setQueryParams({ page: null }) // 移除page参数

// 与路由配合
const updatePage = page => {
  setQueryParams({ page })
  loadData(page)
}
```

<br>

### getHostName

从 URL 中提取主机名

**参数说明:**

- `url` (String): 要解析的 URL 字符串，默认为当前页面 URL

**返回值:**

- (String): 提取的主机名，不带协议和路径

**使用场景:**

- 分析页面来源
- 跨域请求验证
- 日志记录和统计

**注意事项:**

- 自动处理带端口号的情况
- 支持国际化域名
- 返回结果不包含子域名前的 www

**示例:**

```javascript
// 基本使用
getHostName('https://news.example.com/path') // 'news.example.com'

// 处理不同协议
getHostName('http://test.example.com') // 'test.example.com'
getHostName('//cdn.example.com') // 'cdn.example.com'

// 处理端口号
getHostName('https://localhost:8080') // 'localhost'

// 默认使用当前URL
// 当前URL: https://www.example.com
getHostName() // 'example.com'

// 国际化域名
getHostName('https://中文.域名') // 'xn--fiq228c.xn--e1a4c'

// 与安全策略配合
const host = getHostName()
if (['trusted.com', 'partner.com'].includes(host)) {
  loadExternalContent()
}
```

<br>

### numberWithCommas

为数字添加千位分隔符

**参数说明:**

- `number` (Number|String): 要格式化的数字或数字字符串
- `options` (Object, 可选): 配置选项
  - `decimalPlaces` (Number): 保留小数位数，默认为原数字的小数位数
  - `locale` (String): 地区代码，默认为'en-US'

**返回值:**

- (String): 格式化后的数字字符串

**使用场景:**

- 金额、数量等数字的显示格式化
- 数据报表展示
- 国际化数字显示

**注意事项:**

- 自动处理小数部分
- 支持字符串数字输入
- 无效输入返回原值

**示例:**

```javascript
// 基本使用
numberWithCommas(1234567) // '1,234,567'
numberWithCommas(1234.567) // '1,234.567'

// 保留小数位
numberWithCommas(1234.567, { decimalPlaces: 2 }) // '1,234.57'

// 国际化格式
numberWithCommas(1234567.89, { locale: 'de-DE' }) // '1.234.567,89'

// 字符串输入
numberWithCommas('1234567') // '1,234,567'

// 无效输入处理
numberWithCommas('abc123') // 'abc123'
numberWithCommas(null) // null

// 表格数据格式化
const data = [{ value: 1000000 }, { value: 2500.5 }]
data.map(item => ({
  ...item,
  formatted: numberWithCommas(item.value)
}))
```

<br>

### enableUrl

将文本中的 URL 转换为可点击的链接

**参数说明:**

- `text` (String): 要处理的文本
- `target` (String, 可选): 链接打开方式，如'\_blank'，默认为当前窗口打开
- `options` (Object, 可选): 配置选项
  - `protocols` (Array): 允许的协议，默认为['http','https','mailto']
  - `attributes` (Object): 要添加的额外 HTML 属性

**返回值:**

- (String): 处理后的 HTML 字符串

**使用场景:**

- 用户生成内容的链接自动识别
- 聊天消息中的 URL 转换
- 富文本编辑器功能增强

**注意事项:**

- 自动识别 http/https/mailto 链接
- 会转义原文本中的 HTML 标签
- 支持自定义链接属性

**示例:**

```javascript
// 基本使用
enableUrl('Visit https://example.com')
// 'Visit <a href="https://example.com">https://example.com</a>'

// 新窗口打开
enableUrl('Contact us: info@example.com', '_blank')
// 'Contact us: <a href="mailto:info@example.com" target="_blank">info@example.com</a>'

// 自定义属性
enableUrl('See our site', null, {
  attributes: { class: 'external-link', rel: 'nofollow' }
})

// 处理复杂文本
const message = `Check these:
1. https://site1.com
2. http://site2.org/path?q=test`
enableUrl(message)

// 安全限制
enableUrl('Dangerous: javascript:alert(1)', null, {
  protocols: ['http', 'https'] // 阻止XSS
})
```

<br>

### onlyNumber

限制输入框只能输入数字

**参数说明:**

- `event` (Event): 输入事件对象
- `options` (Object, 可选): 配置选项
  - `allowDecimal` (Boolean): 是否允许小数点，默认为 false
  - `allowNegative` (Boolean): 是否允许负号，默认为 false
  - `maxLength` (Number): 最大输入长度

**返回值:**

- 无返回值，直接修改输入值

**使用场景:**

- 金额、数量等数字输入框
- 表单验证
- 与输入限制相关的 UI 控制

**注意事项:**

- 需绑定到 input 或 keydown 事件
- 会阻止非数字字符的输入
- 支持移动端输入

**示例:**

```javascript
// 基本使用
<input onkeydown="onlyNumber(event)">

// 允许小数
<input onkeydown="onlyNumber(event, { allowDecimal: true })">

// 允许负数
<input onkeydown="onlyNumber(event, {
  allowDecimal: true,
  allowNegative: true
})">

// 限制长度
<input onkeydown="onlyNumber(event, { maxLength: 10 })">

// React/Vue中使用
const handleInput = (e) => {
  onlyNumber(e, { allowDecimal: true });
  // 其他处理逻辑
}
```

<br>

### removeTag

移除字符串中的 HTML 标签

**参数说明:**

- `html` (String): 包含 HTML 标签的字符串
- `options` (Object, 可选): 配置选项
  - `allowedTags` (Array): 允许保留的标签，如['b','i']
  - `replaceWith` (String): 替换内容，默认为空字符串

**返回值:**

- (String): 处理后的纯文本

**使用场景:**

- 富文本内容摘要生成
- 防止 XSS 攻击
- 纯文本预览

**注意事项:**

- 会保留标签内的文本内容
- 自动处理自闭合标签
- 支持嵌套标签移除

**示例:**

```javascript
// 基本使用
removeTag('<p>Hello <b>World</b></p>') // 'Hello World'

// 保留特定标签
removeTag('<div>Text <span>with</span> <b>tags</b></div>', {
  allowedTags: ['b']
}) // 'Text with <b>tags</b>'

// 替换为空格
removeTag('Line<br>Break', { replaceWith: ' ' }) // 'Line Break'

// 防止XSS
const userInput = '<script>alert(1)</script> Safe text'
removeTag(userInput) // ' Safe text'

// 处理复杂HTML
const html = `
  <article>
    <h1>Title</h1>
    <p>Content with <a href="#">link</a></p>
  </article>
`
removeTag(html) // '\n    Title\n    Content with link\n  '
```

<br>

### highlight

高亮文本中的匹配内容

**参数说明:**

- `searchText` (String|RegExp): 要匹配的文本或正则表达式
- `text` (String): 要处理的文本
- `options` (Object, 可选): 配置选项
  - `tag` (String): 高亮标签，默认为'mark'
  - `className` (String): 高亮元素的类名
  - `caseSensitive` (Boolean): 是否区分大小写，默认为 false

**返回值:**

- (String): 包含高亮标记的 HTML 字符串

**使用场景:**

- 搜索结果显示高亮
- 文档内容重点标记
- 代码片段突出显示

**注意事项:**

- 会转义原文本中的 HTML 标签
- 支持正则表达式匹配
- 可以自定义高亮样式

**示例:**

```javascript
// 基本使用
highlight('hello', 'Hello world')
// '<mark>Hello</mark> world'

// 正则表达式匹配
highlight(/\d+/g, 'Page 123 of 456')
// 'Page <mark>123</mark> of <mark>456</mark>'

// 自定义高亮标签
highlight('world', 'Hello world', { tag: 'span' })
// 'Hello <span>world</span>'

// 区分大小写
highlight('hello', 'Hello world', { caseSensitive: true })
// 'Hello world'

// 搜索结果高亮
const results = [
  { title: 'First document', content: '...' },
  { title: 'Second doc', content: '...' }
]
results.map(item => ({
  ...item,
  highlightedTitle: highlight('doc', item.title)
}))

// 自定义样式
highlight('important', 'This is important', {
  tag: 'span',
  className: 'highlight-red'
})
// 'This is <span class="highlight-red">important</span>'
```

<br>

### OR

逻辑或组合器，组合多个谓词函数

**参数说明:**

- `...predicates` (Function): 要组合的谓词函数，可接受多个

**返回值:**

- (Function): 返回一个新的谓词函数

**使用场景:**

- 组合多个验证条件
- 函数式编程中的逻辑运算
- 与 Ramda 的 filter/reject 配合使用

**注意事项:**

- 短路求值，遇到第一个 true 即返回
- 支持柯里化调用
- 所有谓词函数接收相同参数

**示例:**

```javascript
// 基本使用
const isEven = n => n % 2 === 0
const isPositive = n => n > 0
const isEvenOrPositive = OR(isEven, isPositive)

isEvenOrPositive(3) // true (positive)
isEvenOrPositive(-2) // true (even)
isEvenOrPositive(-1) // false

// 表单验证
const isValidEmail = email => /@/.test(email)
const isValidPhone = phone => /^\d{10}$/.test(phone)
const isValidContact = OR(isValidEmail, isValidPhone)

// 与Ramda配合
R.filter(
  OR(
    user => user.role === 'admin',
    user => user.age >= 18
  ),
  users
)

// 柯里化调用
const isAdminOrEditor = OR(
  user => user.role === 'admin',
  user => user.role === 'editor'
)
users.filter(isAdminOrEditor)
```

<br>

### AND

逻辑与组合器，组合多个谓词函数

**参数说明:**

- `...predicates` (Function): 要组合的谓词函数，可接受多个

**返回值:**

- (Function): 返回一个新的谓词函数

**使用场景:**

- 组合多个验证条件
- 复杂业务规则判断
- 与 Ramda 的 filter/reject 配合使用

**注意事项:**

- 短路求值，遇到第一个 false 即返回
- 支持柯里化调用
- 所有谓词函数接收相同参数

**示例:**

```javascript
// 基本使用
const isEven = n => n % 2 === 0
const isPositive = n => n > 0
const isEvenAndPositive = AND(isEven, isPositive)

isEvenAndPositive(4) // true
isEvenAndPositive(3) // false (not even)
isEvenAndPositive(-2) // false (not positive)

// 表单验证
const hasMinLength = str => str.length >= 8
const hasSpecialChar = str => /[!@#$%^&*]/.test(str)
const isValidPassword = AND(hasMinLength, hasSpecialChar)

// 权限检查
const isAdmin = user => user.role === 'admin'
const isActive = user => user.status === 'active'
const canEdit = AND(isAdmin, isActive)

// 与Ramda配合
R.filter(
  AND(
    product => product.stock > 0,
    product => product.price < 100
  ),
  products
)

// 柯里化调用
const isFeaturedProduct = AND(
  product => product.featured,
  product => product.rating >= 4
)
products.filter(isFeaturedProduct)
```

<br>

### exclude

排除数组中满足条件的元素

**参数说明:**

- `predicate` (Function): 判断函数，返回 true 表示要排除该元素
- `array` (Array): 要操作的数组

**返回值:**

- (Array): 返回一个新数组，不会修改原数组

**使用场景:**

- 反选过滤
- 黑名单过滤
- 与 Ramda 的 filter/reject 配合使用

**注意事项:**

- 与 filter 逻辑相反
- 支持柯里化调用
- 保持原数组不变

**示例:**

```javascript
// 基本使用
const numbers = [1, 2, 3, 4, 5]
exclude(n => n % 2 === 0, numbers) // [1, 3, 5]

// 对象数组
const users = [
  { id: 1, active: true },
  { id: 2, active: false }
]
exclude(user => !user.active, users) // [{ id: 1, active: true }]

// 柯里化调用
const excludeInactive = exclude(user => !user.active)
excludeInactive(users) // [{ id: 1, active: true }]

// 与Ramda配合
R.pipe(
  R.map(user => ({ ...user, name: user.name.toUpperCase() })),
  exclude(user => user.age < 18)
)(users)

// 黑名单过滤
const blacklist = ['admin', 'root']
const usernames = ['alice', 'admin', 'bob', 'root']
exclude(name => blacklist.includes(name), usernames) // ['alice', 'bob']
```

<br>

### isNotNil

检查值是否不为 null 或 undefined

**参数说明:**

- `value` (any): 要检查的值

**返回值:**

- (Boolean): 如果值不是 null 或 undefined 则返回 true

**使用场景:**

- 空值检查
- 数据验证
- 与 Ramda 的 filter/reject 配合使用

**注意事项:**

- 与 Ramda 的 isNil 结果相反
- 0、空字符串等"假值"会返回 true
- 适用于严格空值检查

**示例:**

```javascript
// 基本使用
isNotNil(null) // false
isNotNil(undefined) // false
isNotNil(0) // true
isNotNil('') // true
isNotNil(false) // true

// 数据过滤
const data = [1, null, 'a', undefined, 0]
data.filter(isNotNil) // [1, 'a', 0]

// 对象属性检查
const user = { name: 'Alice', age: null }
isNotNil(user.name) // true
isNotNil(user.age) // false

// 与Ramda配合
R.filter(isNotNil, [null, 1, undefined, 2]) // [1, 2]

// 默认值处理
const config = isNotNil(userConfig) ? userConfig : defaultConfig

// React props检查
const Component = ({ value }) => (isNotNil(value) ? <div>{value}</div> : <div>Loading...</div>)
```

<br>

### go

函数管道，从左到右依次执行函数

**参数说明:**

- `initialValue` (any): 初始值
- `...functions` (Function): 要依次执行的函数

**返回值:**

- (any): 最后一个函数的执行结果

**使用场景:**

- 函数式编程中的组合操作
- 数据处理流水线
- 避免嵌套函数调用

**注意事项:**

- 每个函数接收前一个函数的返回值
- 支持异步函数
- 与 Ramda 的 pipe 类似

**示例:**

```javascript
// 基本使用
const double = n => n * 2
const increment = n => n + 1
go(5, double, increment) // 11

// 对象处理
const user = { name: 'alice', age: 25 }
go(
  user,
  user => ({ ...user, name: user.name.toUpperCase() }),
  user => ({ ...user, age: user.age + 1 })
) // { name: 'ALICE', age: 26 }

// 异步处理
const fetchData = async () => ({ data: [1, 2, 3] })
const process = async data => data.map(n => n * 2)
go(fetchData(), res => res.data, process) // Promise<[2, 4, 6]>

// 与Ramda配合
go(
  [1, 2, 3],
  R.map(n => n * 2),
  R.filter(n => n > 3)
) // [4, 6]

// 数据处理流水线
const cleanInput = str => str.trim()
const parseInput = str => parseInt(str, 10)
const validateInput = num => (num > 0 ? num : 0)
go(' 42 ', cleanInput, parseInput, validateInput) // 42
```

<br>

### nl2br

将换行符(\n)转换为 HTML 换行标签(<br />)

**参数说明:**

- `text` (String): 要处理的文本
- `options` (Object, 可选): 配置选项
  - `isXhtml` (Boolean): 是否生成 XHTML 兼容标签，默认为 true
  - `replaceWith` (String): 自定义替换标签，如'<br>'

**返回值:**

- (String): 处理后的 HTML 字符串

**使用场景:**

- 用户输入的换行处理
- 纯文本转 HTML 显示
- 邮件内容格式化

**注意事项:**

- 会转义原文本中的 HTML 标签
- 支持多种换行符(\r\n, \n, \r)
- 可以自定义换行标签

**示例:**

```javascript
// 基本使用
nl2br('Line1\nLine2') // 'Line1<br />Line2'

// 处理多种换行符
nl2br('Line1\r\nLine2\rLine3') // 'Line1<br />Line2<br />Line3'

// 自定义标签
nl2br('Line1\nLine2', { replaceWith: '<br>' }) // 'Line1<br>Line2'

// 用户输入处理
const userInput = 'Hello\nWorld'
document.getElementById('content').innerHTML = nl2br(userInput)

// 邮件模板
const message = `Dear User,\n\nThank you for your purchase.\n\nBest regards`
nl2br(message)
// 'Dear User,<br /><br />Thank you for your purchase.<br /><br />Best regards'

// 与React配合
const TextWithBreaks = ({ text }) => <div dangerouslySetInnerHTML={{ __html: nl2br(text) }} />
```

<br>

### timer

创建一个延迟指定时间的 Promise

**参数说明:**

- `ms` (Number): 延迟的毫秒数
- `value` (any, 可选): Promise 解析的值

**返回值:**

- Promise: 在指定时间后解析的 Promise

**使用场景:**

- 简单的异步延迟
- 模拟异步操作
- 节流/防抖实现

**注意事项:**

- 返回的 Promise 不会拒绝
- 可以传递解析值
- 适用于 async/await

**示例:**

```javascript
// 基本使用
await timer(2000) // 等待2秒

// 带返回值
const result = await timer(1000, 'Done') // 1秒后返回'Done'

// 模拟API请求
const mockFetch = async () => {
  await timer(500)
  return { data: [] }
}

// 实现简单节流
const throttledInput = async input => {
  await timer(300)
  processInput(input)
}

// 组合使用
async function processWithDelay() {
  console.log('Starting...')
  await timer(1000)
  console.log('Processing...')
  await timer(1000)
  console.log('Done!')
}

// 测试用例中的使用
test('async test', async () => {
  await timer(100)
  expect(something).toBe(true)
})
```

<br>

### delay

延迟执行函数

**参数说明:**

- `fn` (Function): 要延迟执行的函数
- `ms` (Number): 延迟的毫秒数
- `...args` (any): 传递给函数的参数

**返回值:**

- Promise: 在延迟后执行函数并返回结果的 Promise

**使用场景:**

- 延迟函数执行
- 实现动画序列
- 创建定时任务

**注意事项:**

- 支持传递参数
- 返回 Promise 便于链式调用
- 可以取消延迟

**示例:**

```javascript
// 基本使用
delay(() => console.log('Hello'), 1000) // 1秒后打印'Hello'

// 带参数
delay((a, b) => a + b, 500, 1, 2) // 0.5秒后返回3

// 动画序列
delay(() => fadeIn(element1), 0)
  .then(() => delay(() => fadeIn(element2), 300))
  .then(() => delay(() => fadeOut(element1), 300))

// 取消延迟
const timer = delay(() => {}, 1000)
clearTimeout(timer)

// 与async/await配合
async function delayedProcess() {
  await delay(() => fetchData(), 500)
  await delay(() => processData(), 500)
}

// 实现轮询
async function poll() {
  while (true) {
    await delay(() => checkStatus(), 5000)
  }
}
```

<br>

### removeExt

移除文件名的扩展名

**参数说明:**

- `filename` (String): 要处理的文件名
- `options` (Object, 可选): 配置选项
  - `keepPath` (Boolean): 是否保留路径部分，默认为 true
  - `removeAll` (Boolean): 是否移除所有扩展名，默认为 false

**返回值:**

- (String): 处理后的文件名

**使用场景:**

- 文件处理工作流
- 路径操作
- 构建工具配置

**注意事项:**

- 正确处理多扩展名文件(如.tar.gz)
- 支持带路径的文件名
- 自动处理各种分隔符(./, ../)

**示例:**

```javascript
// 基本使用
removeExt('document.pdf') // 'document'
removeExt('archive.tar.gz') // 'archive.tar'

// 移除所有扩展名
removeExt('archive.tar.gz', { removeAll: true }) // 'archive'

// 处理路径
removeExt('./src/utils/index.ts') // './src/utils/index'
removeExt('/path/to/file.min.js', { removeAll: true }) // '/path/to/file'

// 不保留路径
removeExt('src/styles/main.css', { keepPath: false }) // 'main'

// 构建工具中使用
const entryFiles = ['app.js', 'admin.js']
entryFiles.map(file => removeExt(file)) // ['app', 'admin']

// 与路径处理库配合
const baseName = removeExt(path.basename(filePath))
```

<br>

### getFileName

从文件路径中提取文件名（带或不带扩展名）

**参数说明:**

- `filepath` (String): 文件路径
- `withExtension` (Boolean): 是否包含扩展名，默认为 false

**返回值:**

- (String): 提取的文件名

**使用场景:**

- 文件路径解析
- 日志记录
- 文件上传处理

**注意事项:**

- 正确处理各种路径分隔符(/, \)
- 自动处理相对路径(./, ../)
- 支持 URL 路径

**示例:**

```javascript
// 基本使用
getFileName('/path/to/file.txt') // 'file'
getFileName('/path/to/file.txt', true) // 'file.txt'

// 处理不同操作系统路径
getFileName('C:\\Documents\\report.pdf') // 'report'
getFileName('C:\\Documents\\report.pdf', true) // 'report.pdf'

// 处理URL
getFileName('https://example.com/images/photo.jpg') // 'photo'
getFileName('https://example.com/images/photo.jpg', true) // 'photo.jpg'

// 文件上传处理
const uploadedFile = {
  path: '/tmp/uploads/avatar.png',
  name: getFileName('/tmp/uploads/avatar.png', true)
}

// 日志记录
const logFile = '/var/log/app/error.log'
console.log(`Error occurred, see ${getFileName(logFile, true)} for details`)

// 与路径处理库配合
const fullPath = path.join(__dirname, 'config.json')
const configName = getFileName(fullPath) // 'config'
```

<br>

### loadJs

动态加载 JavaScript 文件

**参数说明:**

- `url` (String): 要加载的 JS 文件 URL
- `options` (Object, 可选): 配置选项
  - `async` (Boolean): 是否异步加载，默认为 true
  - `defer` (Boolean): 是否延迟执行，默认为 false
  - `attributes` (Object): 要添加的额外属性

**返回值:**

- Promise: 加载成功时 resolve，失败时 reject

**使用场景:**

- 按需加载第三方库
- 代码分割
- 性能优化

**注意事项:**

- 避免重复加载
- 支持跨域脚本
- 自动处理缓存

**示例:**

```javascript
// 基本使用
await loadJs('https://code.jquery.com/jquery-3.6.0.min.js')

// 带配置项
loadJs('/path/to/plugin.js', {
  async: false,
  attributes: {
    'data-version': '1.0'
  }
})

// 加载多个脚本
async function loadDependencies() {
  await Promise.all([loadJs('https://cdn.jsdelivr.net/npm/vue@3.2.31'), loadJs('https://cdn.jsdelivr.net/npm/axios@0.27.2')])
}

// 错误处理
loadJs('invalid.js').catch(err => console.error('Failed to load script:', err))

// 与模块系统配合
if (!window.jQuery) {
  await loadJs('jquery.js')
  // 使用jQuery...
}

// 添加自定义属性
loadJs('analytics.js', {
  attributes: {
    'data-track': 'true'
  }
})
```

<br>

### sortKeys

对对象的键进行排序

**参数说明:**

- `obj` (Object): 要排序的对象
- `compareFn` (Function, 可选): 自定义排序函数，默认为按字母升序

**返回值:**

- (Object): 新对象，包含排序后的键

**使用场景:**

- 对象序列化前的键排序
- 生成一致的哈希值
- 数据比较和测试

**注意事项:**

- 保持原对象不变
- 支持嵌套对象排序
- 排序结果稳定

**示例:**

```javascript
// 基本使用
sortKeys({ b: 2, a: 1, c: 3 }) // { a: 1, b: 2, c: 3 }

// 自定义排序
sortKeys({ apple: 1, banana: 2 }, (a, b) => b.localeCompare(a))
// { banana: 2, apple: 1 }

// 嵌套对象
const nested = {
  z: 1,
  a: {
    c: 3,
    b: 2
  }
}
sortKeys(nested)
// {
//   a: { b: 2, c: 3 },
//   z: 1
// }

// 生成稳定哈希
const obj1 = { a: 1, b: 2 }
const obj2 = { b: 2, a: 1 }
JSON.stringify(sortKeys(obj1)) === JSON.stringify(sortKeys(obj2)) // true

// 与Ramda配合
R.pipe(
  sortKeys,
  R.map(val => (typeof val === 'number' ? val * 2 : val))
)({ b: 1, a: 2 })

// 测试用例
const unsorted = { name: 'Alice', age: 25 }
expect(sortKeys(unsorted)).toEqual({ age: 25, name: 'Alice' })
```

<br>

### onlyOneInvoke

确保函数只被执行一次

**参数说明:**

- `fn` (Function): 要包装的函数
- `context` (Object, 可选): 执行上下文(this)

**返回值:**

- (Function): 包装后的函数

**使用场景:**

- 防止重复初始化
- 单次事件绑定
- 资源加载控制

**注意事项:**

- 后续调用返回第一次的结果
- 保持原函数的 this 绑定
- 支持传递参数

**示例:**

```javascript
// 基本使用
const init = onlyOneInvoke(() => console.log('Initialized'))
init() // 'Initialized'
init() // 无输出

// 带返回值
const getData = onlyOneInvoke(() => {
  console.log('Fetching data...')
  return { data: [] }
})
getData() // 'Fetching data...' 并返回 { data: [] }
getData() // 直接返回 { data: [] }

// 保持this绑定
const obj = {
  name: 'obj',
  init: onlyOneInvoke(function () {
    console.log(this.name)
  })
}
obj.init() // 'obj'
obj.init() // 无输出

// 带参数
const logOnce = onlyOneInvoke(msg => console.log(msg))
logOnce('first') // 'first'
logOnce('second') // 无输出

// 防止重复加载
const loadLib = onlyOneInvoke(() => {
  return loadJs('https://cdn.example.com/lib.js')
})
button.addEventListener('click', loadLib) // 只会加载一次
```

<br>

### createRandomString

生成指定长度的随机字符串

**参数说明:**

- `length` (Number): 字符串长度，默认为 10
- `options` (Object, 可选): 配置选项
  - `charset` (String): 字符集，默认为大小写字母和数字
  - `prefix` (String): 添加前缀
  - `suffix` (String): 添加后缀

**返回值:**

- (String): 生成的随机字符串

**使用场景:**

- 生成唯一 ID
- 创建临时密码
- 测试数据生成

**注意事项:**

- 不保证绝对唯一性
- 字符集默认包含大小写字母和数字
- 可以自定义字符集

**示例:**

```javascript
// 基本使用
createRandomString() // 'aB3dE5fG7h'
createRandomString(8) // 'kL9mN2oP'

// 自定义字符集
createRandomString(6, { charset: '0123456789' }) // '384927'
createRandomString(5, { charset: 'abcde' }) // 'aebdc'

// 添加前后缀
createRandomString(4, {
  prefix: 'user_',
  suffix: '_temp'
}) // 'user_Xy9Z_temp'

// 生成密码
const tempPassword = createRandomString(12)

// 测试数据
const testUsers = Array(5)
  .fill()
  .map(() => ({
    id: `user_${createRandomString(8)}`,
    name: `Test${createRandomString(4)}`
  }))

// 自定义字符集
const hexChars = '0123456789abcdef'
createRandomString(16, { charset: hexChars }) // 'a1b2c3d4e5f67890'
```

<br>

### escapeRegExp

转义字符串中的正则表达式特殊字符

**参数说明:**

- `str` (String): 要转义的字符串

**返回值:**

- (String): 转义后的字符串

**使用场景:**

- 动态构建正则表达式
- 用户输入处理
- 搜索功能实现

**注意事项:**

- 转义以下字符: .\*+?^${}()|[]\
- 不改变原字符串
- 支持 Unicode 字符

**示例:**

```javascript
// 基本使用
escapeRegExp('(test)') // '\\(test\\)'
escapeRegExp('file.*') // 'file\\.\\*'

// 动态构建正则
const search = 'file.*'
new RegExp(escapeRegExp(search)) // 匹配字面量'file.*'

// 用户输入处理
const userInput = '[a-z]+'
const regex = new RegExp(`^${escapeRegExp(userInput)}$`)

// 高亮搜索词
function highlightSearch(text, query) {
  const pattern = new RegExp(escapeRegExp(query), 'gi')
  return text.replace(pattern, '<mark>$&</mark>')
}

// 路径匹配
const filePath = 'src/utils/index.js'
const escaped = escapeRegExp(filePath)
const regex = new RegExp(escaped) // 精确匹配路径

// 特殊字符处理
escapeRegExp('Cost: $5.99') // 'Cost: \\$5\\.99'
```

<br>

### hasProps

检查对象是否包含指定的所有属性

**参数说明:**

- `props` (Array|String): 要检查的属性名或属性名数组
- `obj` (Object): 要检查的对象

**返回值:**

- (Boolean): 如果对象包含所有指定属性则返回 true

**使用场景:**

- 对象属性验证
- API 响应检查
- 表单数据验证

**注意事项:**

- 检查属性存在性而非值真实性
- 支持单个属性名或数组
- 空数组始终返回 true

**示例:**

```javascript
// 基本使用
hasProps(['name', 'age'], { name: 'Alice', age: 25 }) // true
hasProps('email', { name: 'Bob' }) // false

// 表单验证
const formData = { username: 'alice', password: 'secret' }
if (!hasProps(['username', 'password'], formData)) {
  showError('Missing required fields')
}

// API响应检查
const response = await fetch('/api/user/1')
if (hasProps(['id', 'name'], response.data)) {
  renderUser(response.data)
}

// 单个属性检查
hasProps('id', { id: 1 }) // true

// 空数组情况
hasProps([], {}) // true

// 与Ramda配合
R.filter(hasProps(['active', 'verified']), users)

// 嵌套属性检查
const deepHasProps = (props, obj) => props.every(prop => hasProps(prop.split('.'), obj))
deepHasProps(['address.city'], { address: { city: 'NY' } }) // true
```

<br/>

### oneOf

条件匹配器，返回第一个匹配条件的值

**参数说明:**

- `conditions` (Array): 条件数组，每个元素是[条件, 值]数组
- `defaultValue` (any, 可选): 默认值，当无匹配时返回

**返回值:**

- (any): 第一个匹配条件的值或默认值

**使用场景:**

- 多条件分支处理
- 配置项匹配
- 状态机实现

**注意事项:**

- 条件可以是值或函数
- 惰性求值，遇到第一个匹配即返回
- 支持嵌套条件

**示例:**

```javascript
// 基本使用
oneOf([
  [false, 1],
  [true, 2]
]) // 2

// 带默认值
oneOf(
  [
    [false, 'a'],
    [false, 'b']
  ],
  'default'
) // 'default'

// 函数条件
oneOf([
  [() => false, 'a'],
  [() => true, 'b']
]) // 'b'

// 配置匹配
const env = process.env.NODE_ENV
const config = oneOf(
  [
    [env === 'development', devConfig],
    [env === 'production', prodConfig],
    [env === 'test', testConfig]
  ],
  defaultConfig
)

// 状态处理
const state = 'loading'
const action = oneOf([
  [state === 'loading', showSpinner],
  [state === 'error', showError],
  [state === 'success', showData]
])

// 惰性求值
oneOf([
  [false, expensiveOperation()],
  [true, 'fallback']
]) // 不会执行expensiveOperation
```

<br/>

### camelToKabab

将驼峰命名转换为短横线命名(kebab-case)

**参数说明:**

- `str` (String): 要转换的驼峰命名字符串
- `options` (Object, 可选): 配置选项
  - `preserveCase` (Boolean): 是否保留原大小写，默认为 false

**返回值:**

- (String): 转换后的短横线命名字符串

**使用场景:**

- CSS 属性名转换
- HTML 属性名处理
- API 参数格式转换

**注意事项:**

- 连续大写字母会转换为多个短横线
- 数字前会自动加短横线
- 保留原字符串中的短横线

**示例:**

```javascript
// 基本使用
camelToKabab('helloWorld') // 'hello-world'
camelToKabab('camel2Kabab') // 'camel2-kabab'

// 保留原大小写
camelToKabab('HelloWorld', { preserveCase: true }) // 'Hello-World'

// 处理连续大写
camelToKabab('koreaArmyTrainingCenterK2') // 'korea-army-training-center-k2'

// 已包含短横线
camelToKabab('hello-world') // 'hello-world'
camelToKabab('hello_world') // 'hello_world'

// 与CSS属性配合
const styleName = camelToKabab('backgroundColor') // 'background-color'
document.body.style[styleName] = 'red'

// 处理数字
camelToKabab('version2Update') // 'version-2-update'

// API参数转换
const apiParams = { userName: 'Alice', userId: 123 }
const converted = Object.keys(apiParams).reduce((acc, key) => {
  acc[camelToKabab(key)] = apiParams[key]
  return acc
}, {})
// { 'user-name': 'Alice', 'user-id': 123 }
```

<br/>

### classNames

根据条件动态生成 CSS 类名字符串

**参数说明:**

- `...args` (Object|String): 类名条件对象或字符串，可接受多个

**返回值:**

- (String): 生成的类名字符串

**使用场景:**

- React/Vue 类名动态绑定
- 条件样式应用
- 组件状态样式管理

**注意事项:**

- 对象中值为 true 的键会被包含
- 忽略 falsy 值
- 支持字符串和对象混合参数

**示例:**

```javascript
// 基本使用
classNames({ active: true, disabled: false }) // 'active'
classNames('btn', { active: true }) // 'btn active'

// 多参数混合
classNames(
  'btn',
  {
    'btn-primary': true,
    'btn-loading': isLoading
  },
  className // 外部传入的类名
)

// React中使用
const Button = ({ primary, size }) => (
  <button
    className={classNames({
      btn: true,
      'btn-primary': primary,
      [`btn-${size}`]: size
    })}
  />
)

// 数组参数
const classes = ['base-class', isActive && 'active', isError && 'error']
classNames(...classes) // 自动过滤false值

// Vue中使用
const computedClasses = computed(() =>
  classNames({
    'menu-item': true,
    'is-active': isActive.value,
    'has-children': hasChildren.value
  })
)

// 忽略空值
classNames(null, undefined, false, '', 'valid') // 'valid'
```

````

<br/>

### clsNms

```js
clsNms({ a: true, b: false }) // 'a'
clsNms({ a: true, b: false }, { c: true, d: true }) // 'a c d'
clsNms('aa', 'bb') // 'aa bb'
clsNms('aa', undefined, 'cc') // 'aa cc'
clsNms('aa', null, 'cc') // 'aa cc'

clsNms('cc', { a: true, b: false }) // 'cc a'
clsNms('xx', { a: true, b: false }, 'vv') // 'xx a vv'
clsNms({ a: false, b: false }) // undefined
clsNms('visible', { hasContent: true }) // 'visible has-content'
clsNms('hasContent', { visible: true }) // 'has-content visible'
````

### getFileExt

```js
getFileExt('cat.png') // 'png'
getFileExt('cat.231.txt') // 'txt'
getFileExt('pig.bar') // 'bar'
```

### filterEmpty

```js
filterEmpty({
  a: '',
  b: 'b',
  c: 'c',
  d: undefined,
  e: null
}) // {b: 'b', c: 'c'}
```
