import getValueByPointKey from './getValueByPointKey.js'
import renderTemplate from './renderTemplate.js'
/**
 * 循环遍历解析数组变为dom字符串
 * @param  {[type]} token [description]
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 * 处理数组，结合renderTemplate实现递归
    注意，这个函数收的参数是token！而不是tokens！
    token是什么，就是一个简单的['#', 'students', [

    ]]
    
    这个函数要递归调用renderTemplate函数，调用多少次？？？
    千万别蒙圈！调用的次数由data决定
    比如data的形式是这样的：
    {
        students: [
            { 'name': '小明', 'hobbies': ['游泳', '健身'] },
            { 'name': '小红', 'hobbies': ['足球', '蓝球', '羽毛球'] },
            { 'name': '小强', 'hobbies': ['吃饭', '睡觉'] },
        ]
    };
    renderTemplateParseArray()函数就要递归调用renderTemplate函数3次，因为数组长度是3
 */
export default function renderTemplateParseArray(token, data) {
    // 结果字符串
    let resultStr = ''
    // 得到对应的数组 ['#', 'students', []]  // 也就是得到students
    let arr = getValueByPointKey(data, token[1])

    for(let i = 0; i < arr.length; i++) {
        // 这里要补一个“.”属性
        resultStr += renderTemplate(token[2], {
            ...arr[i],
            '.': arr[i]
        })
    }
    return resultStr
}