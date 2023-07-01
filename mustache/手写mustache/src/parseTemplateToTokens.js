import Scanner from './Scanner.js'
import nestTokens from './nestTokens.js'
/**
 * 将模板字符串变为tokens数组
 * @param  {[type]} templateStr [description]
 * @return {[type]}             [description]
 */
export default function parseTemplateToTokens(templateStr) {
    let tokens = []
    // 创建扫描器
    const scanner = new Scanner(templateStr)
    let words
    while(!scanner.eos()) {
        // 获取开始标记（{{）之前的文字
        words = scanner.scanUtil('{{')
        if (words != '') {
            // 新添加处理空白字符开始
            // 标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格
            let isInTag = false // 标记是否在标签里
            let _words = ''
            for (let i = 0; i < words.length; i++) {
                // 判断是否在标签里
                if(words[i] == '<') {
                    isInTag = true
                } else if (words[i] == '>') {
                    isInTag = false
                }
                // 如果这项不是空格, 拼接上
                if(!/\s/.test(words[i])) {
                    _words += words[i]
                } else {
                    // 如果这项是空格,只有当它在标签内的时候，才拼接上
                    if (isInTag) {
                        _words += ' '
                    }
                }
            }
            //  新添加处理空白字符结束
            tokens.push(['text', _words])
        }
        // 跳过开始标记（{{）
        scanner.scan('{{')
        // 获取开始标记（{{）到结束标记（}}）之间的文字
        words = scanner.scanUtil('}}')
        if (words != '') {
            // 这个words就是{{}}中间的东西。判断一下首字符
            if (words[0] == '#') {
                // 存起来，从下标为1的项开始存，因为下标为0的项是#
                tokens.push(['#', words.substring(1)])
            } else if (words[0] == '/') {
                // 存起来，从下标为1的项开始存，因为下标为0的项是/
                tokens.push(['/', words.substring(1)])
            } else {
                tokens.push(['name', words])
            }
        }
        // 跳过结束标记（}}）
        scanner.scan('}}')
    }
    return nestTokens(tokens)
}