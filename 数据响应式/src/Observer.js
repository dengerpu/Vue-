import defineReactive from './defineReactive.js'
/**
 * 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)
 */
export default class Observer {
    constructor(value) {
        // 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例
        def(value, '__ob__', this, false)
        // 0bserver类的目的是:将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
        this.walk(value)

    }
    // 循环遍历，为对象的每个属性添加侦听
    walk(obj) {
        for(let key in obj) {
            defineReactive(obj, key)
        }
    }
}


/**
 * 定义对象的配置信息，因为__ob__是要对用户不可遍历的，
 * 所以enumerable要设为false
 * @param  {[type]} obj        [description]
 * @param  {[type]} key        [description]
 * @param  {[type]} value      [description]
 * @param  {[type]} enumerable [description]
 * @return {[type]}            [description]
 */
function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}