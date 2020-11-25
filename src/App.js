import Home from './components/pages/home';
import Header from "./components/header";
import { store, persistor } from './configs/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import './App.scss';

function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="App">
                <Header/>
                <Home/>
            </div>
          </PersistGate>
      </Provider>
  );
}

export default App;
