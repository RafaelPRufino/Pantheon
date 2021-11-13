import React, { useReducer, createContext, useEffect } from 'react';

import Pantheon from '../app/common/Pantheon';
import data from '../app/proxy/data.json';

import Cache from './Cache';

const CACHED = 'attributes';
const ON_CHECK = 'ON_CHECK';
const ON_CREATED = 'ON_CREATED';
const ON_EXPAND = 'ON_EXPAND';

export const PantheonContext = createContext();

const checked_function = (prevState, { nodeInfo }) => {
    const { pantheon } = prevState;
    const attributes = pantheon.setChecked(nodeInfo.id, nodeInfo.checked).getAttributesChanges()
    Cache.write(attributes, CACHED)
    return { ...prevState, attributes, pantheon };
}


const expanded_function = (prevState, { nodeInfo }) => {
    const { pantheon } = prevState;
    const attributes = pantheon.setExpand(nodeInfo.id, nodeInfo.expanded).getAttributesChanges()
    Cache.write(attributes, CACHED)
    return { ...prevState, attributes, pantheon };
}

const created_function = (prevState, { pantheon, entities, attributes }) => {
    return { ...prevState, pantheon: pantheon, entities: entities, attributes: attributes };
}

const reducer_function = (prevState, action) => {
    const actions = {
        [ON_CHECK]: checked_function,
        [ON_EXPAND]: expanded_function,
        [ON_CREATED]: created_function,
        'default': () => prevState
    }
    return (actions[action.type] || actions['default'])(prevState, action);
}

const WithContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer_function, {
        entities: [],
        pantheon: {},
        attributes: {}
    });

    const onCheck = (nodeInfo) => {
        dispatch({
            type: ON_CHECK, nodeInfo
        });
    };

    const onExpand = (nodeInfo) => {
        dispatch({
            type: ON_EXPAND, nodeInfo
        });
    };

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const attributes = await Cache.read(CACHED)
                let {
                    pantheon,
                    entities
                } = Pantheon.from(data);
                pantheon = pantheon.fill(attributes);
                dispatch({
                    type: ON_CREATED,
                    entities,
                    pantheon,
                    attributes
                });
            } catch (error) {

            }
        }
        bootstrap();
    }, [])

    return (
        <PantheonContext.Provider value="">
            {
                children({
                    state,
                    onCheck,
                    onExpand
                })
            }
        </PantheonContext.Provider>
    );
};

export default WithContext;