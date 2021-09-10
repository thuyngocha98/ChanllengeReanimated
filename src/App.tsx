import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import store from './store';
import * as theme from './theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from '@navigation/Routes';


const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" />
          <Routes />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
