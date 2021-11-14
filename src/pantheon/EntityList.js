import React from 'react';

import Entity from './Entity';

export default function EntityList({ entities, onCheck, onExpand, id }) {
    return (
        <ul data-testid={`entity-list-${id || 'egyptian'}`} className={`pantheon-${id || 'egyptian'}`}>
            {
                entities.map((entry, key) => {
                    return (
                        <Entity key={key} entry={entry} onCheck={onCheck} onExpand={onExpand}></Entity>
                    )
                })
            }
        </ul>
    )
}

