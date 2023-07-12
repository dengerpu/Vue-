/**
 * 定义对象的配置信息，因为__ob__是要对用户不可遍历的，
 * 所以enumerable要设为false
 * @param  {[type]} obj        [description]
 * @param  {[type]} key        [description]
 * @param  {[type]} value      [description]
 * @param  {[type]} enumerable [description]
 * @return {[type]}            [description]
 */
export function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}