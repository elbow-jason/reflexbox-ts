
export interface Config {
  breakpoints: number[]
  space: number[]
}

const defaultConfig = (): Config => ({
  breakpoints: [40, 52, 64],
  space: [0, 8, 16, 32, 64],
})

export default defaultConfig
