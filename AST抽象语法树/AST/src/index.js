import parse from './parse'
const htmlStr = `<div class="aa bb cc" data-n="7" id="mybox">
    <h3 name='abc'>你好</h3>
    <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
    </ul>
</div>`
const ast = parse(htmlStr)
console.log(ast)