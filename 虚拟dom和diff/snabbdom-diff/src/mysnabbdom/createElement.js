/**
 * 创建DOM结点，将vnode转为真正的DOM
 * vnode: {el,data,children,text,elm,key}
 * @param  {[type]} vnode [description]
 * @return {[type]}       [description]
 */
export default function createElement(vnode) {
    let DomNode = document.createElement(vnode.sel)
    // 添加属性
    if (vnode.data && vnode.data.props) {
        const keys = Object.keys(vnode.data.props)
        for(let i = 0; i < keys.length; i++) {
            DomNode.setAttribute(keys[i], vnode.data.props[keys[i]])
        }
    }
    // 只有文字，没有children
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)){
        DomNode.innerText = vnode.text
    } else if(Array.isArray(vnode.children) && vnode.children.length > 0){
        for (let i = 0; i < vnode.children.length; i++) {
            let vnode1 = vnode.children[i]
            // 真实的DOM
            let node = createElement(vnode1)
            DomNode.appendChild(node)
        }
    }
    // 补充elm属性
    vnode.elm = DomNode

    return  vnode.elm
}