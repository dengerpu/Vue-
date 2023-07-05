import createElement from './createElement.js'
import updateChild from './updateChild.js'
/**
 * 同一结点处理
 * @param  {[type]} oldVnode [description]
 * @param  {[type]} newVnode [description]
 * @return {[type]}          [description]
 * vnode{sel, data, children, text, elm, key}
 */
export default function patchVnode(oldVnode, newVnode) {
    // 判断新旧node是否同一个对象
    if(oldVnode === newVnode) {
        console.log('是同一个对象, 不做处理')
        return
    } else if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        console.log('只替换了text')
        // 新node有text
        if (newVnode.text !== oldVnode.text) {
            // 如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即可。如果老的elm中是children，那么也会立即消失掉。
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        // 新node没有text, 有children
        // 判断老的有没有children
        if(oldVnode.children != undefined && oldVnode.children.length > 0) {
            // 新老结点都有children，这是复杂的情况
            console.log('新老结点都有children')
            updateChild(oldVnode.elm, oldVnode.children, newVnode.children)
        }else {
            // 老的没有，新的有
            // 清空老的结点里面的内容
            oldVnode.elm.innerHTML = ''
            // 遍历新的vnode的子节点，创建DOM，上树
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}