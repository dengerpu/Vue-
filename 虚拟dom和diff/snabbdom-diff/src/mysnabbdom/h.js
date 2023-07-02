import vnode from './vnode.js'
/**
 * [h description]
 * @param  {[type]} sel  [description]
 * @param  {[type]} data [description]
 * @param  {[type]} c    [description]
 * @return {[type]}      [description]
 * 也就是说，调用的时候形态必须是下面的三种之一：
 * 形态① h('div', {}, '文字')
 * 形态② h('div', {}, [])
 * 形态③ h('div', {}, h())
 */
export default function h(sel, data, c) {
    // 检查参数的个数
    if(arguments.length != 3) {
        throw new Error('必须传递三个参数')
    }
    // 检查参数c的类型
    if (typeof c == 'string' || typeof c == 'number') {
        // 形态① h('div', {}, '文字')
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) { 
        // 形态② h('div', {}, [])
        let children = []
        for (let i = 0; i < c.length; i++) {
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('传入的参数中某一项不是h函数')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        // 形态③ h('div', {}, h())
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('传入的参数有误')
    }
}
