export interface Config {
    breakpoints: number[];
    space: number[];
}
declare const defaultConfig: () => Config;
export default defaultConfig;
