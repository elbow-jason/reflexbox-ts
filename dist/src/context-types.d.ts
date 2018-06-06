import { Requireable } from 'prop-types';
export interface ReflexBoxShape {
    breakpoints: Requireable<number[]>;
    space: Requireable<number[]>;
}
export interface ContextTypesI {
    reflexbox: Requireable<ReflexBoxShape>;
}
declare const contextTypes: ContextTypesI;
export default contextTypes;
