import 'intl-pluralrules';
import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './src/i18n/i18n';
import TodoScreen from './src/screens/TodoScreen/TodoScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import store, { persistor } from './store';
const initI18n = i18n;
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <TodoScreen />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
