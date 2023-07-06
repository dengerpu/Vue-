import observe from './observe.js'

const obj = {
    a: {
        b: {
            c: {
                d: 3
            }
        }
    },
    text: 123
}
observe(obj)
console.log(obj.a.b)
console.log(obj.a.b.c.d)
obj.text = {
    a:{
        d: 1
    }
}
console.log(obj.text.a.d)