import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom"

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
])

const container = document.getElementById("container")
const btn = document.getElementById("btn")

const ul1 = h('ul', [
    h('li', {key: 1}, '1'),
    h('li', {key: 2}, '2'),
    h('li', {key: 3}, '3'),
    h('li', {key: 4}, '4')
  ])

patch(container, ul1)

const ul2 = h('ul', [
    h('li', {key: 5}, '5'),
    h('li', {key: 1}, '1'),
    h('li', {key: 2}, '2'),
    h('li', {key: 3}, '3'),
    h('li', {key: 4}, '4')
  ])

btn.onclick = function() {
  patch(ul1, ul2)
}