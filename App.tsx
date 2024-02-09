import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import store from '@/store';

const App = () => {

  useEffect(() => {
    LogBox.ignoreLogs([
      'RCTBridge required dispatch_sync to load RCTAccessibilityManager. This may lead to deadlocks',
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
      'Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`'
    ]);
  }, []);


  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;