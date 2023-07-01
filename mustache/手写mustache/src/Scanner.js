/**
 * 扫描器类
 */

export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        // 指针
        this.pos = 0
        // 尾巴，一开始就是模版字符串原文（当前指针位置到末尾）
        this.tail = templateStr
    }

    // 走过指定内容，没有返回值（跳过{{和}}）
    scan(tag) {
        if (this.tail.indexOf(tag) == 0) {
            // 比如{{长度是2，就让指针后移2位
            this.pos += tag.length
            // 尾巴也要变，改变尾巴从当前这个字符开始，到最后的全部字符
            this.tail = this.templateStr.substring(this.pos)
        }
    }

    // 遇见指定内容停止，并且返回已走过的字符串（比如遇到{{停止，返回这之前的文件）
    scanUtil(stopTag) {
        // 记录执行时候pos的位置
        const start = this.pos

        while(!this.eos() && this.tail.indexOf(stopTag) != 0) {
            this.pos++
            this.tail = this.templateStr.substring(this.pos)
        }
        return this.templateStr.substring(start, this.pos)
    }

    // 判断指针是否到头 （end of string）
    eos() {
        return this.pos >= this.templateStr.length
    }
}