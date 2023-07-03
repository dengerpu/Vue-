import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const container = document.getElementById("container")
const btn = document.getElementById("btn")

const ul1 = h('ul',{key: 1}, 'text1')


const ul2 = h('ul', {}, [
    h('li', {key: 5}, '5'),
    h('li', {key: 1}, '1'),
    h('li', {key: 2}, '2'),
    h('li', {key: 3}, '3'),
    h('li', {key: 4}, '4')
  ])

patch(container, ul2)



btn.onclick = function() {
  patch(ul2, ul1)
}
