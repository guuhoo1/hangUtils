export { default as createLogger } from 'if-logger';
export * from 'ramda';
/**
 * 组合两个谓词函数，返回一个新的谓词函数，只要其中一个谓词为真，结果就为真。
 * @param pred1 第一个谓词函数
 * @param pred2 第二个谓词函数
 * @returns 返回一个新的谓词函数
 */
export declare const OR: <T>(pred1: (value: T) => boolean, pred2: (value: T) => boolean) => (value: T) => boolean;
/**
 * 组合两个谓词函数，返回一个新的谓词函数，只有两个谓词都为真，结果才为真。
 * @param pred1 第一个谓词函数
 * @param pred2 第二个谓词函数
 * @returns 返回一个新的谓词函数
 */
export declare const AND: <T>(pred1: (value: T) => boolean, pred2: (value: T) => boolean) => (value: T) => boolean;
/**
 * 排除满足条件的元素，返回一个新数组。
 * @param predicate 谓词函数
 * @returns 返回一个新的过滤函数
 */
export declare const exclude: () => (pred: (...args: any[]) => unknown) => unknown;
/**
 * 检查值是否不为 null 或 undefined。
 * @param value 任意值
 * @returns 返回布尔值
 */
export declare const isNotNil: <T>(value: T) => value is Exclude<T, (null | undefined) & T>;
/**
 * 高亮字符串中的指定单词。
 * @param word 要高亮的单词
 * @param HIGHLIGHT_DELIMETER 单词分隔符，默认为空格
 * @returns 返回一个函数，该函数接收字符串并返回高亮后的字符串
 */
export declare const highlight: (word: string, HIGHLIGHT_DELIMETER?: string) => (str: string) => string;
/**
 * 移除 HTML 标签。
 * @param html HTML 字符串
 * @returns 返回移除标签后的纯文本
 */
export declare const removeTag: (html: string) => string;
/**
 * 打印调试信息，返回原值。
 * @param args 调试信息
 * @returns 返回原值
 */
export declare const peek: (...args: any[]) => (value: any) => any;
/**
 * 执行一系列函数，返回最终结果。
 * @param args 函数列表
 * @returns 返回最终结果
 */
export declare const go: (...args: any[]) => unknown;
/**
 * 返回一个常量函数，该函数总是返回指定的值。
 * @param value 常量值
 * @returns 返回一个函数
 */
export declare const constant: <T>(value: T) => () => T;
/**
 * 空操作函数，返回一个空对象。
 * @returns 返回空对象
 */
export declare const noop: () => {};
/**
 * 对数组进行映射操作。
 * @param args 映射函数和数组
 * @returns 返回映射后的数组
 */
export declare const indexMap: (...args: any[]) => unknown[] | ((list: any[]) => void);
/**
 * 检查对象的 _id 属性是否等于指定值。
 * @param id 要比较的 _id
 * @returns 返回一个谓词函数
 */
export declare const idEqual: {
    <K extends PropertyKey>(name: K): (obj: Record<K, string>) => boolean;
    <K extends PropertyKey>(name: K, obj: Record<K, string>): boolean;
};
/**
 * 根据 _id 查找数组中的元素。
 * @param id 要查找的 _id
 * @returns 返回找到的元素
 */
export declare const findById: <T extends {
    _id: string;
}>(id: string) => (obj: Record<string, string>) => unknown;
/**
 * 根据条件更新数组中的元素。
 * @param pred 谓词函数
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
export declare const updateBy: import("ts-toolbelt/out/Function/Curry").Curry<(pred: (value: any) => boolean, tobe: any) => (list: any[]) => any[]>;
/**
 * 根据条件移除数组中的元素。
 * @param pred 谓词函数
 * @returns 返回移除后的数组
 */
export declare const removeBy: (pred: (value: any) => boolean) => (list: any[]) => any[];
/**
 * 根据 _id 更新数组中的元素。
 * @param id 要更新的 _id
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
export declare const updateById: import("ts-toolbelt/out/Function/Curry").Curry<(id: string, tobe: any, list: any[]) => any>;
/**
 * 根据 _id 移除数组中的元素。
 * @param id 要移除的 _id
 * @returns 返回移除后的数组
 */
export declare const removeById: import("ts-toolbelt/out/Function/Curry").Curry<(id: string, list: any[]) => any[]>;
/**
 * 将 Markdown 格式的链接转换为 HTML 格式。
 * @returns 返回转换后的字符串
 */
export declare const addLink: (str: string) => string;
/**
 * 打印扁平化的调试信息。
 * @param args 调试信息
 */
export declare const flatLog: (...args: any[]) => void;
/**
 * 强制下载文件。
 * @param blob 文件数据
 * @param name 文件名
 */
export declare const forceFileDownload: (blob: Blob, name: string) => void;
/**
 * 下载文件。
 * @param uri 文件地址
 * @param name 文件名
 */
export declare const download: ({ uri, name }: {
    uri: string;
    name: string;
}) => Promise<void>;
/**
 * 获取 URL 的主机名。
 * @param url URL 字符串
 * @returns 返回主机名
 */
export declare const getHostname: (url?: string) => string;
/**
 * 获取 URL 的协议部分。
 * @param url URL 字符串
 * @returns 返回协议部分
 */
export declare const getProtocol: (url: string) => string;
/**
 * 分配查询参数到 URL。
 * @param url URL 字符串
 * @returns 返回一个函数，该函数接收参数对象并设置查询参数
 */
export declare const assignQueryParams: (url: string) => (paramObj: Record<string, any>) => void;
/**
 * 追加查询参数到当前 URL。
 * @param paramObj 参数对象
 * @returns 返回一个函数，该函数设置查询参数
 */
export declare const appendQueryParams: (paramObj: Record<string, any>) => void;
/**
 * 复制文本到剪贴板。
 * @param val 要复制的文本
 */
export declare const copyToClipboard: (val: string) => void;
/**
 * 让 DOM 元素闪烁。
 * @param dom DOM 元素
 */
export declare const blinkDomElement: (dom: HTMLElement) => void;
/**
 * 延迟执行函数。
 * @param timeout 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
export declare const timer: (timeout: number) => Promise<void>;
/**
 * 处理 ES 模块的默认导出。
 * @param _module 模块
 * @returns 返回模块的默认导出或模块本身
 */
export declare const esModule: (_module: any) => any;
/**
 * 移除文件名的扩展名。
 * @param filename 文件名
 * @returns 返回移除扩展名后的文件名
 */
export declare function removeExt(filename: string): string;
/**
 * 获取文件路径中的文件名。
 * @param path 文件路径
 * @param ext 是否包含扩展名，默认为 false
 * @returns 返回文件名
 */
export declare const getFileName: (path: string, ext?: boolean) => string;
/**
 * 将换行符转换为 <br /> 标签。
 * @param str 字符串
 * @returns 返回转换后的字符串
 */
export declare const nl2br: (str: string) => string;
/**
 * 生成随机字符串。
 * @param length 字符串长度，默认为 5
 * @returns 返回随机字符串
 */
export declare const createRandomString: (length?: number) => string;
/**
 * 获取 URL 中的查询参数。
 * @param url URL 字符串
 * @returns 返回查询参数对象
 */
export declare const getQueryParams: (url: string) => Record<string, string>;
/**
 * 设置查询参数到 URL。
 * @param paramObj 查询参数对象
 */
export declare const setQueryParams: (paramObj: Record<string, any>) => void;
/**
 * 将查询参数对象转换为字符串。
 * @param paramObj 查询参数对象
 * @returns 返回查询参数字符串
 */
export declare const queryObjToStr: (paramObj: any) => string;
/**
 * 延迟执行函数。
 * @param fn 要执行的函数
 * @param ms 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
export declare const delay: (fn: () => void, ms: number) => Promise<any>;
/**
 * 限制输入框只能输入数字。
 * @param event 键盘事件
 */
export declare const onlyNumber: (event: KeyboardEvent) => void;
/**
 * 将数字转换为带逗号的字符串。
 * @param num 数字
 * @returns 返回带逗号的字符串
 */
export declare const numberWithCommas: (num: number) => string;
/**
 * 将字符串中的 URL 转换为可点击的链接。
 * @param str 字符串
 * @param target 链接打开方式，默认为当前页面
 * @returns 返回转换后的字符串
 */
export declare const enableUrl: (str: string, target?: string) => string;
/**
 * 动态加载 JavaScript 文件。
 * @param src JavaScript 文件路径
 * @returns 返回一个 Promise
 */
export declare const loadJs: (src: string) => Promise<{
    message: string;
}>;
/**
 * 对对象的键进行排序。
 * @param obj 对象
 * @param pred 排序函数
 * @returns 返回排序后的对象
 */
export declare const sortKeys: (obj: Record<string, any>, pred?: (a: string, b: string) => number) => Record<string, any>;
/**
 * 确保函数只被调用一次。
 * @param fn 要调用的函数
 * @returns 返回一个新的函数
 */
export declare const onlyOneInvoke: (fn: (...args: any[]) => any) => (...args: any[]) => any;
/**
 * 转义正则表达式中的特殊字符。
 * @param text 字符串
 * @returns 返回转义后的字符串
 */
export declare const escapeRegExp: (text: string) => string;
/**
 * 检查对象是否包含指定的属性。
 * @param arr 属性列表
 * @returns 返回一个谓词函数
 */
export declare const hasProps: (arr: string[]) => (obj: Record<string, any>) => boolean;
type Fn<T> = () => T;
/**
 * 根据条件返回第一个匹配的值。
 * @param items 条件列表
 * @param defaultValue 默认值
 * @returns 返回匹配的值或默认值
 */
export declare function oneOf<T>(items: Array<[boolean | Fn<boolean>, T | Fn<T>]>, defaultValue?: T | Fn<T>): T | undefined;
/**
 * 从剪贴板读取文本。
 * @returns 返回剪贴板中的文本
 */
export declare const textFromClipboard: () => Promise<string>;
/**
 * 防抖函数。
 * @param func 要执行的函数
 * @param timeout 防抖时间（毫秒）
 * @returns 返回一个新的函数
 */
export declare function debounce(func: (...args: any[]) => void, timeout?: number): (...args: any[]) => void;
/**
 * 动态生成类名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
export declare const classNames: (...params: any[]) => string | undefined;
/**
 * 将驼峰命名转换为短横线命名。
 * @param value 字符串
 * @returns 返回转换后的字符串
 */
export declare const camelToKabab: (value: string) => string;
/**
 * 动态生成类名并转换为短横线命名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
export declare const clsNms: (...params: any[]) => string;
/**
 * 获取文件后缀。
 * @param fileName 文件名
 * @returns 返回文件后缀
 */
export declare const getFileExt: (fileName: string) => string;
/**
 * 过滤对象中的空值。
 * @param obj 对象
 * @returns 返回过滤后的对象
 */
export declare const filterEmpty: (obj: Record<string, any>) => Record<string, any>;
/**
 * 过滤数组中重复的数据。
 * @param list 数组
 * @param field 字段名
 * @returns 返回过滤后的数组
 */
export declare const filterRepeat: <T extends Record<string, any>>(list: T[], field: keyof T) => T[];
/**
 * 日志打印
 */
export declare const log: (...args: any[]) => void;
