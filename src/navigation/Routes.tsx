import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from 'src/screens/HomeScreen';

import Routes from './routesNames';
import ColorPicker from 'src/screens/colorPicker';

const Stack = createStackNavigator();

const MyStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={Routes.HOME}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      <Stack.Screen name={Routes.COLOR_PICKER} component={ColorPicker} />
    </Stack.Navigator>
  );
};

const MainRouter = (): JSX.Element => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default MainRouter;
