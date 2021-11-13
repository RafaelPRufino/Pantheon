import React, { Fragment, useState } from 'react';

import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

import EntityList from './EntityList';


export default function Entity({ entry, onCheck, onExpand }) {
    const [entity] = useState(entry.getEntity());

    const handle_on_change = () => {
        onCheck({
            checked: !entity.checked,
            id: entity.id
        })
    };
    const handle_on_click = () => {
        onExpand({
            expanded: !entity.expanded,
            id: entity.id
        })
    };

    const render_expand_button = (entity) => {
        if (entity.isLeaf) {
            return <></>
        }

        return entity.expanded ?
            <FaAngleDown></FaAngleDown> :
            <FaAngleRight></FaAngleRight>
    }

    const render_expand_children = (entity) => {
        if (!entity.expanded) {
            return <></>
        }

        return <div className={`entity-children-${entity.id} entity-children${entity.expanded ? '' : '-hide'}`}>
            <EntityList id={entity.id}
                entities={entity.children}
                onCheck={onCheck}
                onExpand={onExpand}></EntityList>
        </div>
    }

    const render_cosmic_entity = ({ name, id, checked, indeterminate }) => {
        return (
            <Fragment>
                <div className={`cosmic-${id}`}>
                    <input type="checkbox"
                        ref={inputRef => {
                            if (inputRef) {
                                inputRef.indeterminate = checked ? false : indeterminate;
                            }
                        }}
                        name={id}
                        id={`cosmic-${id}`}
                        className={`cosmic-body-${id}`}
                        checked={checked}
                        onChange={handle_on_change} />
                </div>
                <span className={`cosmic-label-${entity.id}`}>
                    {name}
                </span>
            </Fragment>
        );
    }

    return (
        <Fragment >
            <li data-testid={entity.id} className={`entity--${entity.id}  entity-backgroud`}>
                <div className={`entity-body-${entity.id}`}>
                    <div className={`entity-body-otc-${entity.id}`} onClick={handle_on_change}>
                        {render_cosmic_entity(entity)}
                    </div>
                    <span className={`entity-body-htc-${entity.id}`} onClick={handle_on_click}>
                        {render_expand_button(entity)}
                    </span>
                </div>
            </li>
            {render_expand_children(entity)}
        </Fragment >
    )

}



