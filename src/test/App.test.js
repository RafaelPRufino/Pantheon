import { act, screen } from '@testing-library/react';

import ReactDOM from 'react-dom'

import WithContext, { PantheonContext } from '../utils/WithContext';

import Pantheon from '../pantheon/Pantheon';
import EntityList from '../pantheon/EntityList';


describe('App', () => {
  const entity = {
    id: '2469bdab-23b5-4cb8-90c9-c609a49410b0',
    getEntity: () => {
      return {
        id: '2469bdab-23b5-4cb8-90c9-c609a49410b0',
        name: "Richard Paul M.",
        checked: false,
        indeterminate: true,
        expanded: true,
        children: []
      }
    }
  };
  const context_values = {
    onCheck: () => { },
    onExpand: () => { },
    state: {
      entities:
        [
          entity
        ]
    }
  }


  const props = {
    onCheck: () => { },
    onExpand: () => { },
    entities: context_values.state.entities
  }

  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  const render = (component) => ReactDOM.render(component, container)

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders the pantheon', () => {
    act(() => {
      render(
        <Pantheon {...context_values} />
      )
    });

    expect(screen.queryByTestId("pantheon")).toBeInTheDocument();
  });

  it('renders the entity list', () => {
    act(() => {
      render((
        <Pantheon {...context_values} />
      ));
    });
    expect(screen.queryByTestId("entity-list-egyptian")).toBeInTheDocument();
  });

  it('renders the entity name', () => {
    act(() => {
      render((
        <EntityList  {...props} />
      ));
    });
    expect(container.textContent).toBe("Richard Paul M.");
  });


  it('renders the entity id', () => {
    act(() => {
      render((
        <EntityList   {...props} />
      ));
    });
    expect(screen.queryByTestId(entity.id)).toBeInTheDocument();
  });
})