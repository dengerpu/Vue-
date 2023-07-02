import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const newVnode = h('a',{props: {href: 'http://www.baidu.com', target: '_blank'}}, '百度')

// 中间的{}可以省略不写
const newVnode2 = h('ul',{},[
    h('li','我是第一个小li'),
    h('li', [
        h('span', '我是第二个li,我嵌套了一个span')
      ]),
    h('li','我是第三个小li')
  ])
console.log(newVnode2)
const container = document.getElementById("container");

patch(container, newVnode2); 