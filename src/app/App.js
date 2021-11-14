import Pantheon from '../pantheon/Pantheon';
import WithContext from '../utils/WithContext';
import './App.scss';

function App() {
  return (
    <main className='app'>
      <WithContext>
        {(values) => (
          <Pantheon  {...values}></Pantheon>
        )}
      </WithContext>
    </main>
  );
}

export default App;
