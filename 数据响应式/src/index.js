import observe from './observe.js'
import Watcher from './Watcher.js'

const obj = {
    a: {
        b: {
            c: {
                d: 3
            }
        }
    },
    text: 123,
    arr: [1, [2,3], {
        name: 'zhangsan'
    }]
}
observe(obj)
// console.log(obj.a.b)
// console.log(obj.a.b.c.d)
// obj.text = {
//     a:{
//         d: 1
//     }
// }
// console.log(obj.text.a.d)
// obj.arr.push(4)
// obj.arr.pop()
new Watcher(obj, 'a.b.c', (val) => {
    console.log('★我是watcher，我在监控a.m.n', val)
})
obj.a.b.c = 100
console.log(obj)