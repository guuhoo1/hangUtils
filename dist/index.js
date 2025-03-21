"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExt = exports.clsNms = exports.camelToKabab = exports.classNames = exports.textFromClipboard = exports.hasProps = exports.escapeRegExp = exports.onlyOneInvoke = exports.sortKeys = exports.loadJs = exports.enableUrl = exports.numberWithCommas = exports.onlyNumber = exports.delay = exports.queryObjToStr = exports.setQueryParams = exports.getQueryParams = exports.createRandomString = exports.nl2br = exports.getFileName = exports.esModule = exports.timer = exports.blinkDomElement = exports.copyToClipboard = exports.appendQueryParams = exports.assignQueryParams = exports.getProtocol = exports.getHostname = exports.download = exports.forceFileDownload = exports.flatLog = exports.addLink = exports.removeById = exports.updateById = exports.removeBy = exports.updateBy = exports.findById = exports.idEqual = exports.indexMap = exports.noop = exports.constant = exports.go = exports.peek = exports.removeTag = exports.highlight = exports.isNotNil = exports.exclude = exports.AND = exports.OR = exports.createLogger = void 0;
exports.log = exports.filterRepeat = exports.filterEmpty = void 0;
exports.removeExt = removeExt;
exports.oneOf = oneOf;
exports.debounce = debounce;
// 引入 Ramda 的所有函数
const R = __importStar(require("ramda"));
// 引入 if-logger 日志库
var if_logger_1 = require("if-logger");
Object.defineProperty(exports, "createLogger", { enumerable: true, get: function () { return __importDefault(if_logger_1).default; } });
// 导出 Ramda 的所有函数
__exportStar(require("ramda"), exports);
// 自定义工具函数
/**
 * 组合两个谓词函数，返回一个新的谓词函数，只要其中一个谓词为真，结果就为真。
 * @param pred1 第一个谓词函数
 * @param pred2 第二个谓词函数
 * @returns 返回一个新的谓词函数
 */
const OR = (pred1, pred2) => {
    return (value) => R.or(pred1(value), pred2(value));
};
exports.OR = OR;
/**
 * 组合两个谓词函数，返回一个新的谓词函数，只有两个谓词都为真，结果才为真。
 * @param pred1 第一个谓词函数
 * @param pred2 第二个谓词函数
 * @returns 返回一个新的谓词函数
 */
const AND = (pred1, pred2) => {
    return (value) => R.and(pred1(value), pred2(value));
};
exports.AND = AND;
/**
 * 排除满足条件的元素，返回一个新数组。
 * @param predicate 谓词函数
 * @returns 返回一个新的过滤函数
 */
const exclude = () => {
    // @ts-ignore
    return R.pipe(R.complement, R.filter);
};
exports.exclude = exclude;
/**
 * 检查值是否不为 null 或 undefined。
 * @param value 任意值
 * @returns 返回布尔值
 */
exports.isNotNil = R.complement(R.isNil);
/**
 * 高亮字符串中的指定单词。
 * @param word 要高亮的单词
 * @param HIGHLIGHT_DELIMETER 单词分隔符，默认为空格
 * @returns 返回一个函数，该函数接收字符串并返回高亮后的字符串
 */
const highlight = (word, HIGHLIGHT_DELIMETER = ' ') => {
    return (str) => {
        if (!word) {
            return str;
        }
        const regStr = word
            .split(HIGHLIGHT_DELIMETER)
            .filter(word => word !== '')
            .map(exports.escapeRegExp)
            .join('|');
        const reg = new RegExp(`(${regStr})`, 'gi');
        return str.replace(reg, '<mark>$1</mark>');
    };
};
exports.highlight = highlight;
/**
 * 移除 HTML 标签。
 * @param html HTML 字符串
 * @returns 返回移除标签后的纯文本
 */
const removeTag = (html) => {
    if (html === undefined) {
        return '';
    }
    return html.replace(/(<([^>]+)>)/gi, '');
};
exports.removeTag = removeTag;
/**
 * 打印调试信息，返回原值。
 * @param args 调试信息
 * @returns 返回原值
 */
const peek = (...args) => {
    return (value) => {
        if (!args.length) {
            console.log('peek', value); // eslint-disable-line
        }
        else {
            console.log(...args, value); // eslint-disable-line
        }
        return value;
    };
};
exports.peek = peek;
/**
 * 执行一系列函数，返回最终结果。
 * @param args 函数列表
 * @returns 返回最终结果
 */
const go = (...args) => {
    // @ts-ignore
    return R.pipe(...args.slice(1))(args[0]);
};
exports.go = go;
/**
 * 返回一个常量函数，该函数总是返回指定的值。
 * @param value 常量值
 * @returns 返回一个函数
 */
const constant = (value) => {
    return () => value;
};
exports.constant = constant;
/**
 * 空操作函数，返回一个空对象。
 * @returns 返回空对象
 */
const noop = () => ({});
exports.noop = noop;
/**
 * 对数组进行映射操作。
 * @param args 映射函数和数组
 * @returns 返回映射后的数组
 */
const indexMap = (...args) => {
    if (args.length === 1) {
        return (list) => {
            Array.prototype.map.call(list, args[0]);
        };
    }
    return Array.prototype.map.call(args[1], args[0]);
};
exports.indexMap = indexMap;
/**
 * 检查对象的 _id 属性是否等于指定值。
 * @param id 要比较的 _id
 * @returns 返回一个谓词函数
 */
exports.idEqual = R.propEq('_id');
/**
 * 根据 _id 查找数组中的元素。
 * @param id 要查找的 _id
 * @returns 返回找到的元素
 */
const findById = (id) => 
// @ts-ignore
R.pipe(R.propEq('_id', id), R.find);
exports.findById = findById;
/**
 * 根据条件更新数组中的元素。
 * @param pred 谓词函数
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
exports.updateBy = R.curry((pred, tobe) => {
    return (list) => {
        const index = R.findIndex(pred)(list);
        return R.update(index, tobe)(list);
    };
});
/**
 * 根据条件移除数组中的元素。
 * @param pred 谓词函数
 * @returns 返回移除后的数组
 */
const removeBy = (pred) => {
    return (list) => {
        const index = R.findIndex(pred)(list);
        return R.remove(index, 1)(list);
    };
};
exports.removeBy = removeBy;
/**
 * 根据 _id 更新数组中的元素。
 * @param id 要更新的 _id
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
exports.updateById = R.curry((id, tobe, list) => {
    return (0, exports.updateBy)((0, exports.idEqual)(id))(tobe)(list);
});
/**
 * 根据 _id 移除数组中的元素。
 * @param id 要移除的 _id
 * @returns 返回移除后的数组
 */
exports.removeById = R.curry((id, list) => {
    return (0, exports.removeBy)((0, exports.idEqual)(id))(list);
});
/**
 * 将 Markdown 格式的链接转换为 HTML 格式。
 * @returns 返回转换后的字符串
 */
exports.addLink = R.replace(/\[(.+)\]\(([^()]+)\)/g)('<a href="$2">$1</a>');
/**
 * 打印扁平化的调试信息。
 * @param args 调试信息
 */
const flatLog = (...args) => {
    const serialized = args.map(arg => {
        if (typeof arg === 'object') {
            return JSON.stringify(arg, null, 2);
        }
        else if (typeof arg === 'function') {
            return arg.toString();
        }
        return arg;
    });
    console.log(...serialized); // eslint-disable-line
};
exports.flatLog = flatLog;
/**
 * 强制下载文件。
 * @param blob 文件数据
 * @param name 文件名
 */
const forceFileDownload = (blob, name) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    link.click();
};
exports.forceFileDownload = forceFileDownload;
/**
 * 下载文件。
 * @param uri 文件地址
 * @param name 文件名
 */
const download = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uri, name }) {
    const response = yield fetch(uri);
    const blob = yield response.blob();
    (0, exports.forceFileDownload)(blob, name);
});
exports.download = download;
/**
 * 获取 URL 的主机名。
 * @param url URL 字符串
 * @returns 返回主机名
 */
const getHostname = (url = '') => {
    let start = url.indexOf('://') + 3;
    const pathStart = url.indexOf('/', start);
    let end = pathStart === -1 ? url.length : pathStart;
    return url.slice(start, end);
};
exports.getHostname = getHostname;
/**
 * 获取 URL 的协议部分。
 * @param url URL 字符串
 * @returns 返回协议部分
 */
const getProtocol = (url) => {
    let end = url.indexOf('://') + 3;
    return url.slice(0, end);
};
exports.getProtocol = getProtocol;
/**
 * 分配查询参数到 URL。
 * @param url URL 字符串
 * @returns 返回一个函数，该函数接收参数对象并设置查询参数
 */
const assignQueryParams = (url) => {
    return (paramObj) => {
        (0, exports.setQueryParams)(Object.assign([], (0, exports.getQueryParams)(url), paramObj));
    };
};
exports.assignQueryParams = assignQueryParams;
/**
 * 追加查询参数到当前 URL。
 * @param paramObj 参数对象
 * @returns 返回一个函数，该函数设置查询参数
 */
const appendQueryParams = (paramObj) => {
    return (0, exports.assignQueryParams)(location.href)(paramObj);
};
exports.appendQueryParams = appendQueryParams;
/**
 * 复制文本到剪贴板。
 * @param val 要复制的文本
 */
const copyToClipboard = (val) => {
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
};
exports.copyToClipboard = copyToClipboard;
/**
 * 让 DOM 元素闪烁。
 * @param dom DOM 元素
 */
const blinkDomElement = (dom) => {
    const BORDER_STYLE = '1px solid red';
    const INTERVAL = 500;
    const TIMEOUT = 3000;
    if (!dom) {
        console.warn('[blinkDomElement] Not found blink dom');
        return;
    }
    dom.style.border = BORDER_STYLE;
    const interval = setInterval(() => {
        dom.style.border = dom.style.border === BORDER_STYLE ? '' : BORDER_STYLE;
    }, INTERVAL);
    setTimeout(() => {
        clearInterval(interval);
        dom.style.border = '';
    }, TIMEOUT);
};
exports.blinkDomElement = blinkDomElement;
/**
 * 延迟执行函数。
 * @param timeout 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
const timer = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
exports.timer = timer;
/**
 * 处理 ES 模块的默认导出。
 * @param _module 模块
 * @returns 返回模块的默认导出或模块本身
 */
const esModule = (_module) => {
    return _module.default || _module;
};
exports.esModule = esModule;
/**
 * 移除文件名的扩展名。
 * @param filename 文件名
 * @returns 返回移除扩展名后的文件名
 */
function removeExt(filename) {
    return filename.replace(/\.(\w*)$/, '');
}
/**
 * 获取文件路径中的文件名。
 * @param path 文件路径
 * @param ext 是否包含扩展名，默认为 false
 * @returns 返回文件名
 */
const getFileName = (path, ext = false) => {
    const getFileNameRegex = /[^\\/]+\.[^\\/]+$/;
    const [file = null] = path.match(getFileNameRegex) || [];
    const name = file || path;
    return ext ? name : removeExt(name);
};
exports.getFileName = getFileName;
/**
 * 将换行符转换为 <br /> 标签。
 * @param str 字符串
 * @returns 返回转换后的字符串
 */
const nl2br = (str) => {
    if (!str) {
        return '';
    }
    return str.replace(/\r\n|\n/g, '<br />');
};
exports.nl2br = nl2br;
/**
 * 生成随机字符串。
 * @param length 字符串长度，默认为 5
 * @returns 返回随机字符串
 */
const createRandomString = (length = 5) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    Array.from(Array(length)).forEach(() => {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    });
    return text;
};
exports.createRandomString = createRandomString;
/**
 * 获取 URL 中的查询参数。
 * @param url URL 字符串
 * @returns 返回查询参数对象
 */
const getQueryParams = (url) => {
    const params = {};
    const idx = url.indexOf('?') + 1;
    const fromIdx = url.slice(idx);
    // @ts-ignore
    fromIdx.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
        params[$1] = decodeURI($3);
    });
    return params;
};
exports.getQueryParams = getQueryParams;
/**
 * 设置查询参数到 URL。
 * @param paramObj 查询参数对象
 */
const setQueryParams = (paramObj) => {
    window.history.pushState({}, '', '?' + (0, exports.queryObjToStr)(paramObj));
};
exports.setQueryParams = setQueryParams;
/**
 * 将查询参数对象转换为字符串。
 * @param paramObj 查询参数对象
 * @returns 返回查询参数字符串
 */
const queryObjToStr = (paramObj) => Object.entries(paramObj)
    .map(([key, value]) => {
    if (R.isNil(value)) {
        return;
    }
    let valueStr = value;
    if (Array.isArray(value)) {
        valueStr = value.join(',');
    }
    return key + '=' + valueStr;
})
    .filter(exports.isNotNil)
    .join('&');
exports.queryObjToStr = queryObjToStr;
/**
 * 延迟执行函数。
 * @param fn 要执行的函数
 * @param ms 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
const delay = (fn, ms) => {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            fn();
            resolve(timeout);
        }, ms);
    });
};
exports.delay = delay;
/**
 * 限制输入框只能输入数字。
 * @param event 键盘事件
 */
const onlyNumber = (event) => {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
};
exports.onlyNumber = onlyNumber;
/**
 * 将数字转换为带逗号的字符串。
 * @param num 数字
 * @returns 返回带逗号的字符串
 */
const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
exports.numberWithCommas = numberWithCommas;
/**
 * 将字符串中的 URL 转换为可点击的链接。
 * @param str 字符串
 * @param target 链接打开方式，默认为当前页面
 * @returns 返回转换后的字符串
 */
const enableUrl = (str, target) => {
    if (!str) {
        return '';
    }
    const isUrl = /((?:http|https?|ftps?|sftp):\/\/(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi;
    if (isUrl.test(str)) {
        return str.replace(isUrl, target ? `<a href="$1" target="${target}">$1</a>` : '<a href="$1">$1</a>');
    }
    const wwwStart = /(www\.(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi;
    if (wwwStart.test(str)) {
        return str.replace(wwwStart, target ? `<a href="http://$1" target="${target}">$1</a>` : '<a href="http://$1">$1</a>');
    }
    return str;
};
exports.enableUrl = enableUrl;
/**
 * 动态加载 JavaScript 文件。
 * @param src JavaScript 文件路径
 * @returns 返回一个 Promise
 */
const loadJs = (src) => {
    return new Promise(resolve => {
        const headTag = document.getElementsByTagName('head')[0];
        const newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.onload = () => {
            resolve({ message: `${src} loaded` });
        };
        newScript.src = src;
        headTag.appendChild(newScript);
    });
};
exports.loadJs = loadJs;
/**
 * 对对象的键进行排序。
 * @param obj 对象
 * @param pred 排序函数
 * @returns 返回排序后的对象
 */
const sortKeys = (obj, pred) => {
    const keys = Object.keys(obj);
    const sorted = {};
    keys.sort(pred).forEach(key => {
        sorted[key] = obj[key];
    });
    return sorted;
};
exports.sortKeys = sortKeys;
/**
 * 确保函数只被调用一次。
 * @param fn 要调用的函数
 * @returns 返回一个新的函数
 */
const onlyOneInvoke = (fn) => {
    let invoked = false;
    return (...args) => {
        if (invoked) {
            return;
        }
        invoked = true;
        return fn(...args);
    };
};
exports.onlyOneInvoke = onlyOneInvoke;
/**
 * 转义正则表达式中的特殊字符。
 * @param text 字符串
 * @returns 返回转义后的字符串
 */
const escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&');
};
exports.escapeRegExp = escapeRegExp;
/**
 * 检查对象是否包含指定的属性。
 * @param arr 属性列表
 * @returns 返回一个谓词函数
 */
const hasProps = (arr) => {
    return (obj) => arr.every(prop => obj[prop]);
};
exports.hasProps = hasProps;
/**
 * 根据条件返回第一个匹配的值。
 * @param items 条件列表
 * @param defaultValue 默认值
 * @returns 返回匹配的值或默认值
 */
function oneOf(items, defaultValue) {
    const matched = items.find(item => (typeof item[0] === 'function' ? item[0]() : item[0]));
    const result = matched ? matched[1] : defaultValue;
    return typeof result === 'function' ? result() : result;
}
/**
 * 从剪贴板读取文本。
 * @returns 返回剪贴板中的文本
 */
const textFromClipboard = () => __awaiter(void 0, void 0, void 0, function* () {
    const str = yield navigator.clipboard.readText().catch(err => {
        const msg = 'Failed to read clipboard contents: ';
        console.error(msg, err);
    });
    if (!str) {
        throw Error('No text in clipboard');
    }
    return str.trim();
});
exports.textFromClipboard = textFromClipboard;
/**
 * 防抖函数。
 * @param func 要执行的函数
 * @param timeout 防抖时间（毫秒）
 * @returns 返回一个新的函数
 */
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => func(...args), timeout);
    };
}
/**
 * 动态生成类名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
const classNames = (...params) => {
    const result = params.reduce((acc, value) => {
        if (!value) {
            return acc;
        }
        if (typeof value === 'boolean') {
            throw Error('Boolean type is not acceptable');
        }
        if (typeof value === 'string') {
            return acc + ' ' + value;
        }
        const classes = Object.entries(value).reduce((acc, [key, value]) => acc + (value ? ' ' + key : ''), '');
        return acc + classes;
    }, '');
    return result ? result.trim() : undefined;
};
exports.classNames = classNames;
/**
 * 将驼峰命名转换为短横线命名。
 * @param value 字符串
 * @returns 返回转换后的字符串
 */
const camelToKabab = (value) => value.replace(/[a-z|0-9][A-Z][a-z|0-9]/g, match => match[0] + '-' + match.slice(1).toLowerCase());
exports.camelToKabab = camelToKabab;
/**
 * 动态生成类名并转换为短横线命名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
const clsNms = (...params) => {
    const classString = (0, exports.classNames)(...params);
    return classString ? (0, exports.camelToKabab)(classString) : classString;
};
exports.clsNms = clsNms;
/**
 * 获取文件后缀。
 * @param fileName 文件名
 * @returns 返回文件后缀
 */
const getFileExt = (fileName) => (0, exports.go)(fileName, R.split('.'), R.last);
exports.getFileExt = getFileExt;
/**
 * 过滤对象中的空值。
 * @param obj 对象
 * @returns 返回过滤后的对象
 */
const filterEmpty = (obj) => {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (obj[key]) {
            result[key] = obj[key];
        }
    });
    return result;
};
exports.filterEmpty = filterEmpty;
/**
 * 过滤数组中重复的数据。
 * @param list 数组
 * @param field 字段名
 * @returns 返回过滤后的数组
 */
const filterRepeat = (list, field) => R.uniqBy(R.prop(field), list);
exports.filterRepeat = filterRepeat;
/**
 * 日志打印
 */
const log = (...args) => {
    console.log(...args);
};
exports.log = log;
