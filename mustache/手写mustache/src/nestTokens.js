/**
 * 将一维token转变为多维
 * @param  {[type]} tokens [description]
 * @return {[type]}        [description]
 */
export default function nestTokens(tokens) {
    // 结果数组
    let nestedTokens = []
    // 栈结构
    let sections = []
    // 当遇见#的时候，收集器会指向这个token的下标为2的新数组
    let collector = nestedTokens

    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        switch(token[0]) {
            case '#':
                collector.push(token)
                // 入栈
                sections.push(token)
                // 改变collector指向，创建一个新的数组
                collector = token[2] = []
                break;
            case '/':
                sections.pop()
                // sections.length > 0 说明还有嵌套的数组
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
                break;
            default:
                // 因为collector指向的是nestTokens，所以就相当于像结果数组里面加入
                collector.push(token)    
        }
    }
    return nestedTokens;
}