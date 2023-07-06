import observe from './observe.js'
/**
 * 侦听对象
 * @param  {[type]} obj [description]
 * @param  {[type]} key [description]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
export default function defineReactive(obj, key, val) {
    if (arguments.length == 2) {
        val = obj[key]
    }
    // 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
    let childObj = observe(val)
    Object.defineProperty(obj, key, {
         // 可枚举
        enumerable: true,
        // 可以被配置，比如可以被delete
        configurable: true,
        get() {
            // let newobj = Object.keys(obj).join(.)
            console.log(`正在访问${obj}下的${key}属性`)
            return val
        },
        set(newValue) {
            if (newValue !== val) {
               console.log(`正在修改${obj}下的${key}属性`)
               val =  newValue
               // 当设置了新值，这个新值也要被observe
               childObj = observe(newValue);
            } 
        }
    })
}