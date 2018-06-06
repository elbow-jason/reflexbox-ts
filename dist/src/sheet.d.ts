export interface CustomSheet extends CSSStyleSheet {
    insert: (css: string[]) => void;
}
declare const sheet: CustomSheet;
export default sheet;
