/**
 * 功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
    比如，dataObj是
    {
        a: {
            b: {
                c: 100
            }
        }
    }
    getValueByPointKey(dataObj, 'a.b.c')结果就是100
 * @return {[type]} [description]
 */
export default function getValueByPointKey(dataObj, keyName) {
    // 如果keyName包含.并且不是.,
    if (keyName.indexOf('.') != -1 && keyName != '.') {
        let keys = keyName.split('.')
        let temp = dataObj
        for(let i = 0; i < keys.length; i++) {
            temp = temp[keys[i]]
        }
        return temp
    }
    // 如果没有点符号
    return dataObj[keyName]
}
