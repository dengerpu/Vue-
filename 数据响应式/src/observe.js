import Observer from './Observer.js'
/**
 * 为对象创建__ob__属性
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export default function(value) {
    // 如果value不是对象，什么都不做
    if (typeof value != 'object') {
        return;
    }
    let ob
    if(typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__
    }else {
        ob = new Observer(value)
    }
    return ob
}