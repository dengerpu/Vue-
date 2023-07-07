import defineReactive from './defineReactive.js'
import { def } from './utils.js'
import { arrayMethods } from './array.js'
import observe from './observe.js'
/**
 * 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)
 */
export default class Observer {
    constructor(value) {
        // 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例
        def(value, '__ob__', this, false)
        // 0bserver类的目的是:将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
        // 检查它是数组还是对象
        if (Array.isArray(value)) {
            // 如果是数组，将这个数组的原型，指向arrayMethods
            Object.setPrototypeOf(value, arrayMethods);
            this.observerArray(value)
            
        } else {
            this.walk(value)
        }
    }
    // 循环遍历，为对象的每个属性添加侦听
    walk(obj) {
        for(let key in obj) {
            defineReactive(obj, key)
        }
    }
    // 数组循环遍历
    observerArray(arr) {
        // 这里用个len存储数组的长度，是为了防止数组的长度发生变化
        for (let i = 0, len = arr.length; i < len; i++) {
            observe(arr[i])
        }
    }
}