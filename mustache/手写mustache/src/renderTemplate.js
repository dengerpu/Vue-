import getValueByPointKey from './getValueByPointKey.js'
import renderTemplateParseArray from './renderTemplateParseArray.js'
/**
 * 让tokens数组变为dom字符串
 * @param  {[type]} tokens [description]
 * @param  {[type]} data   [description]
 * @return {[type]}        [description]
 */
export default function renderTemplate(tokens, data) {
    // 结果字符串
    let resultStr = ''
    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        if (token[0] === 'text') {
            resultStr += token[1]
        } else if (token[0] == 'name') {
            // 如果是name,就说说明是要进行变量替换的
            // 防止有a.b.c这种形式我们引入一个函数getValueByPointKey来处里
            resultStr += getValueByPointKey(data, token[1])
        } else if (token[0] == '#') {
            // 解析数组
             resultStr += renderTemplateParseArray(token, data)
        }
    }
    return resultStr
}