import sheet from './sheet'
import { Config } from "./config"

const REG = /^([wmp][trblxy]?|flex|wrap|column|auto|align|justify|order)$/
const cache: {[key: string]: any} = {}

type CSSFunc = (config: {[key: string]: any}) => (props: {[key: string]: any}) => {[key: string]: string}

const isString = (item: any): item is string => typeof item === "string"

const createRule = (breaks: number[], sx: {[key: string]: Function}) => (key: string, val: any) => {
  const classNames: string[] = []
  const id = '_Rfx' + sheet.cssRules.length.toString(36)
  const k = key.charAt(0)
  const style = sx[key] || sx[k]

  const rules = toArr(val).map((v, i) => {
    const bp = breaks[i]
    const decs = style(key, v)
    const cn = id + '_' + (bp || '')
    const body = `.${cn}{${decs}}`
    const rule = media(bp, body)

    const _key = decs + (bp || '')

    if (cache[_key]) {
      classNames.push(cache[_key])
      return null
    } else {
      classNames.push(cn)
      cache[_key] = cn
      return rule
    }
  }).filter(isString)

  sheet.insert(rules)

  return classNames
}



let configure = <P>(config: Config) => (props: P): P => {
  let next: {[key: string]: string} & Partial<P> = {}
  const classNames: string[] = []

  const breaks = [ 0, ...config.breakpoints ]
  const sx = stylers(config)

  for (let key in props) {
    const val = props[key]
    if (!REG.test(key)) {
      next[key] = val
      continue
    }
    const cx = createRule(breaks, sx)(key, val)
    cx.forEach(cn => classNames.push(cn))
  }

  next.className = join(next.className, ...classNames)
  let result: any = next
  return result as P
}


let reset = () => {
  Object.keys(cache).forEach(key => {
    delete cache[key]
  })
  while (sheet.cssRules.length) {
    sheet.deleteRule(0)
  }
}


// class CSSThing {
//   reset: () => void
//   call: (config: Config) => (props: {[key: string]: any}) => {[key: string]: string}
//   constructor() {
//     this.call = cssCall
//     this.reset = cssReset
//   }
// }

export const css = {
  configure,
  reset,
}



const toArr = (n: any) => Array.isArray(n) ? n : [ n ]
const num = (n: any): n is number => typeof n === 'number' && !isNaN(n)

const join = (...args: string[]) => (
  args
  .filter(a => !!a)
  .join(' ')
)

type Pair = [string, string]
type Rules = string[]
type N = number | string
type Key = string

const dec = (pair: Pair) => pair.join(':')
const rule = (rules: Rules) => rules.join(';')
const media = (bp: number, body: string) => bp ? `@media screen and (min-width:${bp}em){${body}}` : body

const width = (key: Key, n: N) => dec([ 'width', !num(n) || n > 1 ? px(n) : (n * 100) + '%' ])
const px = (n: any) => num(n) ? n + 'px' : n

type Directions = {
  t: [string]
  r: [string]
  b: [string]
  l: [string]
  x: [string, string]
  y: [string, string]
}
const directions: Directions & {[key: string]: Directions[keyof Directions]} = {
  t: [ '-top' ],
  r: [ '-right' ],
  b: [ '-bottom' ],
  l: [ '-left' ],
  x: [ '-left', '-right' ],
  y: [ '-top', '-bottom' ],
}


const space = (scale: number[]) => (key: Key, n: N) => {
  const [ a, b ] = key.split('')
  const prop = a === 'm' ? 'margin' : 'padding'
  const dirs = directions[b] || ['']
  const neg = n < 0 ? -1 : 1
  const val = !num(n) ? n : px((scale[Math.abs(n)] || Math.abs(n)) * neg)
  return rule(dirs.map(d => dec([ prop + d, val ])))
}


const flex = (_key: string,    n?: N) => dec([ 'display', n ? 'flex' : 'block' ])
const wrap = (_key: string,    n?: N) => dec([ 'flex-wrap', n ? 'wrap' : 'nowrap' ])
const auto = (_key: string,    n?: N) => dec([ 'flex', '1 1 auto' ])
const column = (_key: string,  n?: N) => dec([ 'flex-direction', n ? 'column' : 'row' ])
const align = (_key: string,   n: N) => dec([ 'align-items', n.toString() ])
const justify = (_key: string, n: N) => dec([ 'justify-content', n.toString() ])
const order = (_key: string,   n: N) => dec([ 'order', n.toString() ])

const stylers = (config: Config) => ({
  w: width,
  m: space(config.space),
  p: space(config.space),
  flex,
  wrap,
  auto,
  column,
  align,
  justify,
  order
})

export default css