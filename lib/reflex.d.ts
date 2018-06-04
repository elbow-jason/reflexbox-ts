/// <reference types="react" />
import * as React from 'react';
import { ContextTypesI } from './context-types';
export declare type ContextTyped = {
    contextTypes: ContextTypesI;
};
export declare type ReflexFunc<P> = <P>(props: P, context: ContextTypesI) => React.SFCElement<P>;
export declare type ReflexI<P> = ContextTyped & ReflexFunc<P>;
declare const reflex: <P>(component: any) => ReflexI<P>;
export default reflex;
