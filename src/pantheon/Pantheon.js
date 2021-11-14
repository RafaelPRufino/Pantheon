import React, { Fragment } from 'react';

import EntityList from './EntityList';

export default function Pantheon({ state: { entities }, onCheck, onExpand }) {
    return <Fragment>
        <div data-testid="pantheon"></div>
        <EntityList entities={entities} onCheck={onCheck} onExpand={onExpand}>
        </EntityList>
    </Fragment>
}



