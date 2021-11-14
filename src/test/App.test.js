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
        <PantheonContext.Provider value="">
          <Pantheon />
        </PantheonContext.Provider>
      )
    });

    expect(screen.queryByTestId("pantheon")).toBeInTheDocument();
  });

  it('renders the entity list', () => {
    act(() => {
      render((
        <PantheonContext.Provider value="">
          <Pantheon />
        </PantheonContext.Provider>
      ));
    });
    expect(screen.queryByTestId("entity-list")).toBeInTheDocument();
  });

  it('renders the entity name', () => {
    act(() => {
      render((
        <EntityList
          onCheck={() => { }}
          onExpand={() => { }}
          entities={[
            entity
          ]} />
      ));
    });
    expect(container.textContent).toBe(entity.name);
  });


  it('renders the entity id', () => {
    act(() => {
      render((
        <EntityList
          onCheck={() => { }}
          onExpand={() => { }}
          entities={[
            entity
          ]}
        />
      ));
    });
    expect(screen.queryByTestId(entity.id)).toBeInTheDocument();
  });
})