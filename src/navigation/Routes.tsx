import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { RootStackParamList } from './routesNames';
import HomeScreen from '@screens/HomeScreen';
import ColorPicker from '@screens/ColorPicker';
const Stack = createStackNavigator<RootStackParamList>();

const MyStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={"HOME"}>
      <Stack.Screen name={"HOME"} component={HomeScreen} />
      <Stack.Screen name={"COLOR_PICKER"} component={ColorPicker} />
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
