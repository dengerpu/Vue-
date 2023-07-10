/**
 * 解析属性字符串
 */
export default function parseAttrs(attrsString) {
    if(attrsString === undefined) return []
    // 判断当前是否在引号内
    let isQuotation = false
    // 断点
    let point = 0
    // 结果数组
    let result = []

    for(let i = 0; i < attrsString.length; i++) {
        let ch = attrsString[i]
        if(ch == '"' || ch == "'") {
            isQuotation = !isQuotation
        }else if (ch == ' ' && !isQuotation) {
            // 是空格，且不在引号内（代表是分隔符）
            if(!/^\s*$/.test(attrsString.substring(point, i))) {
                result.push(attrsString.substring(point, i).trim())
                point = i
            }
        }
    }
    // 循环结束之后，最后还剩一个属性k="v"
    result.push(attrsString.substring(point).trim())

    // 将["k=v","k=v","k=v"]变为[{name:k, value:v}, {name:k, value:v}, {name:k,value:v}];
    result = result.map(item => {
        // 根据“=”号拆分
        const o = item.match(/^(.+)=["'](.+)["']/)
        return {
            name: o[1],
            value: o[2]
        }
    })
    return result
}