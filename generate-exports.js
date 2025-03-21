const fs = require('fs')
const path = require('path')

// 目标目录（假设是当前目录下的 `src` 目录）
const targetDir = path.join(__dirname, 'src')

// 输出文件路径
const outputFile = path.join(__dirname, 'src', 'index.ts')

// 读取目录下的文件
fs.readdir(targetDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err)
        return
    }

    // 过滤出需要导出的文件（排除 index.js 和非 JS 文件）
    const exportFiles = files.filter(file => {
        return file !== 'index.ts' && file.endsWith('.ts')
    })

    // 生成导出语句
    const exportStatements = exportFiles.map(file => {
        const moduleName = path.basename(file, '.ts')
        return `export { default as ${moduleName} } from './${moduleName}'`
    }).join('\n')

    // 将导出语句写入 index.js
    fs.writeFile(outputFile, exportStatements, (err) => {
        if (err) {
            console.error('Error writing file:', err)
        } else {
            console.log(`Exports generated successfully in ${outputFile}`)
        }
    })
})