import React, { Fragment, useContext } from 'react';
import WithContext from '../utils/WithContext';

import EntityList from './EntityList';

function PantheonList({ state: { entities }, onCheck, onExpand }) {
    return <EntityList entities={entities} onCheck={onCheck} onExpand={onExpand}>
    </EntityList>
}

export default function Pantheon() {
    return <Fragment>
        <div data-testid="pantheon"></div>
        <WithContext>
            {(values) => (
                <PantheonList  {...values}>
                </PantheonList>
            )}
        </WithContext>
    </Fragment>
}



