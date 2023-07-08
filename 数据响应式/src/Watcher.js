import Dep from './Dep.js'
let uid = 0
export default class Watcher {
    constructor(target, expression, callback) {
        console.log('Watcher构造方法')
        this.id = uid++
        this.target = target
        this.getter = parsePath(expression)
        this.callback = callback
        this.value = this.get()
    }
    update() {
        this.run()
    }
    get() {
        // 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
        Dep.target = this
        const obj = this.target
        let value
        // 只要能找，就一直找
        try {
            value = this.getter(obj)
        } finally {
            Dep.target = null
        }
        return value
    }
    run() {
        this.getAndInvoke(this.callback)
    }
    getAndInvoke(cb) {
        const value = this.get()

        if (value !== this.value || typeof value == 'object') {
            const oldValue = this.value
            this.value = value
            cb.call(this.target, value, oldValue)
        }
    }
}

/**
 * 解析点对象语法， a.b.c.d
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function parsePath(str) {
    let segments = str.split('.')

    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            if (!obj)  return
            obj = obj[segments[i]]
        }
        return obj
    }
}