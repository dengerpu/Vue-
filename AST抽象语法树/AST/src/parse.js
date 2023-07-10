import parseAttrs from './parseAttrs'
/**
 * 解析html字符串为抽象语法树
 * @param {*} htmlStr 
 */
export default function parse(htmlStr) {
    // 指针
    let index = 0
    // 剩余部分
    let rest= ''
    // 标签开始正则
    let tagStartRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
    // 标签结束正则
    let tagEndRegExp = /^\<\/([a-z]+[1-6]?)\>/
    // 开始标签和结束标签之间的文字
    let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/

    // 栈1，存储标签
    // 栈2，存储内容
    const stack1 = []
    // 这里初始有内容，是为了解决最后全部会弹出栈的问题
    const stack2 = [{'children': []}]
    while(index < htmlStr.length - 1) {
        rest = htmlStr.substring(index)
        if(tagStartRegExp.test(rest)) {
            // 匹配到开始标签
            const tag = rest.match(tagStartRegExp)[1]
            let attrsString = rest.match(tagStartRegExp)[2]
            // console.log('属性', attrsString)
            // 开始标签入栈
            stack1.push(tag)
            stack2.push({'tag': tag, 'children': [], 'attrs': parseAttrs(attrsString)})
            // console.log('匹配到开始标签', '<' + tag + '>')
            const attrLength = attrsString  ? attrsString.length : 0
            // +2是要加上<>
            index += tag.length + 2 + attrLength
        } else if (tagEndRegExp.test(rest)) {
            // 匹配到结束标签
            const tag = rest.match(tagEndRegExp)[1]
            let pop_tag = stack1.pop()
            if(tag === pop_tag) {
                // console.log('匹配到结束标签', '</' + tag + '>')
                let pop_arr = stack2.pop()
                if(stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(pop_arr)
                }
            } else {
                throw Error(stack1[stack1.length - 1] + '标签匹配错误')
            }
            index += tag.length + 3
        }  else if(wordRegExp.test(rest)) {
            const word = rest.match(wordRegExp)[1]
            // 判断word是不是全空
            if(!/^\s+$/.test(word)) {
                // console.log('匹配文字', word)
                // 改变此时stack2栈顶元素中
                stack2[stack2.length - 1].children.push({'text': word, 'type': 3})
            }
            index += word.length
        } else {
            index++
        }
    }
    return stack2[0].children[0]
}