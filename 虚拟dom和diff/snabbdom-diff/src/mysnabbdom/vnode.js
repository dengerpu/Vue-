/**
 * 生成虚拟结点
 * @param  {[type]} sel      [description]
 * @param  {[type]} data     [description]
 * @param  {[type]} children [description]
 * @param  {[type]} text     [description]
 * @param  {[type]} elm      [description]
 * @return {[type]}          [description]
 */
export default function vnode(sel, data, children, text, elm) {
    const key = data === undefined ? undefined : data.key
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}