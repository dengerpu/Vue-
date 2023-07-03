import h from './mysnabbdom/h.js'

const newVnode = h('a',{props: {href: 'http://www.baidu.com', target: '_blank'}}, '百度')

console.log(newVnode)

// 中间的{}可以省略不写
const newVnode2 = h('ul',{},[
    h('li',{},'我是第一个小li'),
    h('li',{}, [
        h('span',{}, '我是第二个li,我嵌套了一个span')
      ]),
    h('li',{},'我是第三个小li')
  ])
console.log(newVnode2)
