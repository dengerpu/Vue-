import Watcher from './Watcher'
export default class Compile {
    constructor(el, vue) {
        console.log('vue实例被创建了')
        // vue实例
        this.$vue = vue
        // 挂载点
        this.$el = document.querySelector(el)
        // 如果用户传入了挂载点
        if(this.$el) {
            // 调用函数，让节点变为fragment，类似于mustache中的tokens。实际上用的是AST，这里就是轻量级的，fragment
            let $fragment = this.node2Fragment(this.$el);
            this.compile($fragment)
            // 替换好的内容要上树
            this.$el.appendChild($fragment);
        }
        console.log(this.$el, vue)
    }
    // 创建文档碎片（虚拟结点对象）
    node2Fragment(el) {
        let fragment = document.createDocumentFragment()
        let child
        // 让所有DOM节点，都进入fragment
        while (child = el.firstChild) {
            // 添加了之后，el.firstChild就会被删除了
            fragment.appendChild(child)
        }
        return fragment
    }
    // 编译
    compile(el) {
        console.log('编译', el)
        let childNodes = el.childNodes
        let self = this

        // 匹配{{}}中间的变量正则表达式
        let reg = /\{\{(.*)\}\}/
        childNodes.forEach(node => {
            let text = node.textContent
            console.log('text', text, node)
            if(node.nodeType == 1) {
                // nodeType为1为元素节点
                self.compileElement(node)
            } else if(node.nodeType == 3 && reg.test(text)) {
                // nodeType为3
                let name = text.match(reg)[1]
                self.compileText(node, name)
            }
            // console.log('node结点', node.textContent)
        })
    }
    // 编译元素结点
    compileElement(node) {
        console.log('元素结点', node)
        // 获取元素上的所有属性
        let nodeAttrs = node.attributes
        let self = this
        console.log('元素上的属性', nodeAttrs)
        let reg = /\{\{(.*)\}\}/
        let content = node.textContent
        if(reg.test(content)) {
            let name = content.match(reg)[1]
            new Watcher(self.$vue, name, name => {
                node.textContent = name
            })
            // attrValue 可能是a.b.c这种形式
            let v = self.getVueVal(self.$vue, name)
            node.textContent = v
        }
        // 类数组对象变为数组
        const arr = []
        arr.slice.call(nodeAttrs).forEach(attr => {
            // 分析指令 (type="text", v-model="msg")
            let attrName = attr.name // type   v-model
            let attrValue = attr.value // text  msg
            // 指令都是v-开头的
            let dir = attrName.substring(2)
            if(attrName.indexOf('v-') == 0) {
                console.log(console.log('识别到的指令', dir))
                // v-开头的就是指令
                if(dir == 'model') {
                    new Watcher(self.$vue, attrValue, attrValue => {
                        node.value = attrValue
                    })
                    // attrValue 可能是a.b.c这种形式
                    let v = self.getVueVal(self.$vue, attrValue)
                    node.value = v

                    // 添加监听
                    node.addEventListener('input', e => {
                        const newVal = e.target.value
                        self.setVueVal(self.$vue, attrValue, newVal)
                        v = newVal
                    })
                }else if (dir == 'if') {
                    console.log("if指令")
                }
            }
        })
    }
    // 编译文本结点
    compileText(node, name) {
        node.textContent = this.getVueVal(this.$vue, name)
        new Watcher(this.$vue, name, value => {
            node.textContent = value
        })
    }

    // 获取值 比如(a.b.c)
    getVueVal(vue, exp) {
        let val = vue
        exp = exp.split('.')
        exp.forEach(k=> {
            val = val[k]
        })
        return val
    }
    // 设置值
    setVueVal(vue, exp, value) {
        let val = vue
        exp = exp.split('.')
        exp.forEach((k, i) => {
            if (i < exp.length - 1) {
                val = val[k]
            } else {
                val[k] = value
            }
        })
    }
}