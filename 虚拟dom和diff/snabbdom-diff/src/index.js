import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const container = document.getElementById("container")
const btn = document.getElementById("btn")

const ul1 = h('ul', {}, [
    h('li', {key: 1}, '1'),
    h('li', {key: 2}, '2')
  ])

const ul2 = h('ul', {}, [
    h('li', {key: 5}, '5'),
    h('li', {key: 1}, '1'),
    h('li', {key: 2}, '2')
  ])

patch(container, ul1)



btn.onclick = function() {
  patch(ul1, ul2)
}
