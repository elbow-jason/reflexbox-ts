import * as React from 'react';
import { ContextTypesI } from './context-types';
declare class ReflexProvider<P> extends React.Component {
    childContextTypes: ContextTypesI;
    constructor(props: P);
    getChildContext(): {
        reflexbox: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
    };
    render(): React.ReactElement<any>;
}
export default ReflexProvider;
