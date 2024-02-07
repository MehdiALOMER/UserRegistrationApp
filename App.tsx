import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import store from '@/store';

const App = () => {

  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  }, []);


  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;