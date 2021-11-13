import { act, render, screen } from '@testing-library/react';

import ReactDOM from 'react-dom'

import WithContext, { PantheonContext } from '../utils/WithContext';

import Pantheon from '../pantheon/Pantheon';
import EntityList from '../pantheon/EntityList';


describe('App', () => {
  const entity = {
    id: 'Richard Paul M.',
    getEntity: () => {
      return {
        id: 'Richard Paul M.',
        name: "Richard Paul M.",
        checked: false,
        indeterminate: false,
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

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders the pantheon', () => {
    act(() => {
      ReactDOM.render((
        <PantheonContext.Provider value="">
          <Pantheon />
        </PantheonContext.Provider>
      ), container);
    });

    expect(screen.queryByTestId("pantheon")).toBeInTheDocument();
  });

  it('renders the entity list', () => {
    act(() => {
      ReactDOM.render((
        <PantheonContext.Provider value="">
          <Pantheon />
        </PantheonContext.Provider>
      ), container);
    });
    expect(screen.queryByTestId("entity-list")).toBeInTheDocument();
  });

  it('renders the entity name', () => {
    act(() => {
      ReactDOM.render((
        <EntityList onCheck={() => { }}
          onExpand={() => { }} entities={[
            entity
          ]} />
      ), container);
    });
    expect(container.textContent).toBe(entity.id);
  });


  it('renders the entity id', () => {
    act(() => {
      ReactDOM.render((
        <EntityList onCheck={() => { }}
          onExpand={() => { }} entities={[
            entity
          ]} />
      ), container);
    });
    expect(screen.queryByTestId(entity.id)).toBeInTheDocument();
  });
})