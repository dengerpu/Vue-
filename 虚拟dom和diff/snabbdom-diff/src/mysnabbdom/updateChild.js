import patchVnode from './patchVnode.js'
import createElement from './createElement.js'
/**
 * [updateChild description]
 * @param  {[type]} parentELm [description]
 * @param  {[type]} oldCh     [description]
 * @param  {[type]} newCh     [description]
 * @return {[type]}           [description]
 */
export default function updateChild(parentELm, oldCh, newCh) {

    // 新前
    let newStartIdx = 0
    // 旧前
    let oldStartIdx = 0
    // 新后
    let newEndIdx = newCh.length - 1
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新前结点
    let newStartVnode = newCh[0]
    // 旧前结点
    let oldStartVnode = oldCh[0]
    // 新后结点
    let newEndVnode = newCh[newEndIdx]
    // 旧后结点
    let oldEndVnode = oldCh[oldEndIdx]

    let keyMap = null

    while(newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        console.log('☆')
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else if(checkSameVnode(newStartVnode, oldStartVnode)) {
            // 新前与旧前
            console.log("命中①：新前与旧前")
            // 会递归进行比较
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if(checkSameVnode(newEndVnode, oldEndVnode)) {
            // 新后与旧后
            console.log("命中②：新后与旧后")
            patchVnode(oldEndVnode, newEndVnode)
            newEndVnode = newCh[--newEndIdx]
            oldEndVnode = oldCh[--oldEndIdx]
        }else if(checkSameVnode(newEndVnode, oldStartVnode)) {
            // 新后与旧前
            console.log("命中③：新后与旧前")
            patchVnode(oldStartVnode, newEndVnode)
            // 当③新后与旧前命中的时候，此时要移动节点。移动新后值向的这个节点到老节点的旧后的后面
            // 如何移动节点？？只要你插入一个已经在DOM树上的节点，它就会被移动
            // 新后指向的节点，也就是旧前指向的节点，这里要用旧前，因为新后的elm为undefined,也就是说当同一结点的时候，并不会为让新的虚拟结点变为真实的dom结点
            parentELm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            newEndVnode = newCh[--newEndIdx]
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
            // 新前与旧后
            console.log("命中④：新前与旧后")
            patchVnode(oldEndVnode, newStartVnode)
            //   当④新前和旧后命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧前的前面
            parentELm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
            oldEndVnode = oldCh[--oldEndIdx]
        }else {
            // 四种命中都没有命中
            console.log("四种都没有命中")
            // 制作keyMap一个映射对象，这样就不用每次都遍历老对象了。
            if (!keyMap) {
                keyMap = {}
                // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
                for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key
                    if (key != undefined) {
                        keyMap[key] = i
                    }
                }
            }
            console.log(keyMap)
            // 寻找当前这项（newStartIdx）这项在keyMap中的映射的位置序号
            const idxInOld = keyMap[newStartVnode.key]
            if (idxInOld == undefined) {
                // 判断，如果idxInOld是undefined表示它是全新的项
                // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
                parentELm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                // 如果不是undefined，不是全新的项，而是要移动
                const oldMoveDom = oldCh[idxInOld]
                patchVnode(oldMoveDom, newStartVnode)
                // 把这项设置为undefined，表示我已经处理完这项了
                oldCh[idxInOld] = undefined;
                // 移动，调用insertBefore也可以实现移动。
                parentELm.insertBefore(oldMoveDom, oldStartVnode.elm)
            }
            // 指针下移，只移动新的头
            newStartVnode = newCh[++newStartIdx];
        }
    }
     // 看看有没有剩余的
    if (newStartIdx <= newEndIdx) {
        // 有需要新增的结点
        console.log("新结点还有剩余结点，要把所有剩余的节点，都要插入到oldStartIdx之前")
        // 插入的标杆
        const before = oldCh[oldStartIdx] == null ? null : oldCh[oldStartIdx].elm
        // 遍历新的newCh，添加到老的没有处理的之前
        for(let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore方法可以自动识别null，如果是null就会自动排到队尾去。和appendChild是一致了。
            // newCh[i]现在还没有真正的DOM，所以要调用createElement()函数变为DOM
            parentELm.insertBefore(createElement(newCh[i]), before)
        }
    }else if (oldStartIdx <= oldEndIdx) {
        console.log('old还有剩余节点没有处理，要删除项');
        // 批量删除oldStart和oldEnd指针之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if(oldCh[i]){
                parentELm.removeChild(oldCh[i].elm)
            } 
        }
    }
}

/**
 * 判断是不是同一结点
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
function checkSameVnode(a, b) {
    if (a.sel === b.sel && a.key === b.key) {
        return true
    }
    return false
}