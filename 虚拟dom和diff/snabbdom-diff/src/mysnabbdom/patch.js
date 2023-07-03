import vnode from './vnode.js'
import createElement from './createElement.js'
import patchVnode from './patchVnode.js'
/**
 * [patch description]
 * @return {[type]} [description]
 * vnode(sel, data, children, text, elm)
 */
export default function patch(oldVnode, newVnode) {
    // 判断传入的第一个参数是DOM结点还是虚拟结点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        // 传入的第一个参数真实DOM结点，要转为虚拟DOM结点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    if(sameVnode(oldVnode, newVnode)) {
        // 如果是同一结点
        console.log('是同一结点')
        patchVnode(oldVnode, newVnode)
    } else {
        console.log('不是同一结点')
        // 创建真正的dom结点
        let newVnodeDom = createElement(newVnode)
        // 插入到老结点之前
        if(oldVnode.elm.parentNode && newVnodeDom) {
            oldVnode.elm.parentNode.insertBefore(newVnodeDom, oldVnode.elm)
        }
        // 删除老结点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}

/**
 * 判断是否是相同的虚拟结点
 * @param  {[type]} oldVnode [description]
 * @param  {[type]} newVnode [description]
 * @return {[type]}          [description]
 */
function sameVnode(oldVnode, newVnode) {
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        return true
    } else {
        return false
    }
}