import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate.js'
window.Mustache = {
    render(templateStr, data) {
     const tokens = parseTemplateToTokens(templateStr)
     const domStr = renderTemplate(tokens, data)
     return domStr
    }
}