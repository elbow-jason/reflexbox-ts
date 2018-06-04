
// todo: make node version
const style = document.createElement('style')
style.id = 'reflexbox'
style.type = 'text/css'
document.head.appendChild(style)

export interface CustomSheet extends CSSStyleSheet {
  insert: (css: string[]) => void
}

const sheet = style.sheet as CustomSheet

sheet.insert = (css: string[]) => css.map(rule => {
  const l = sheet.cssRules.length
  sheet.insertRule(rule, l)
})

export default sheet