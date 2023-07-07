import { def } from './utils.js'
// 得到数组原型
const arrPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象，并暴露 
export const arrayMethods = Object.create(arrPrototype)
// 需要改写的7个数组方法
const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

methods.forEach(methodsName => {
    // 备份原来的7个方法，因为功能不变，只是做了增强
    const originMethod = arrPrototype[methodsName]
    // def(obj, key, value, enumerable)
    // 定义新的方法
    def(arrayMethods, methodsName, function(){
        const result = originMethod.apply(this, arguments)
        // 把类对象变为数组
        const args = [...arguments]
        // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？因为数组肯定不是最高层，比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给g属性（就是这个数组）添加了__ob__属性。
        const ob = this.__ob__
        // 有三种方法push\unshift\splice能够插入新项，现在要把插入的新项也要变为observe的
        let inserted = [];
        switch(methodsName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                // splice格式是splice(下标, 数量, 插入的新项)
                inserted = args.splice(2);
                break;
        }
        // 判断有没有要插入的新项，让新项也变为响应的
        if(inserted) {
            // 循环遍历
            ob.observerArray(inserted)
        }
        console.log(`监听到${methodsName}方法正在改变数组：${this}`)
        return result
    }, false)
})