import { Config } from "./config";
export declare const css: {
    configure: <P>(config: Config) => (props: P) => P;
    reset: () => void;
};
export default css;
