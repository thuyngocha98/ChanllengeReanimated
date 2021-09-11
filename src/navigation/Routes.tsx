import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { RootStackParamList } from './routesNames';
import HomeScreen from '@screens/HomeScreen';
import ColorPicker from '@screens/ColorPicker';
import CircularProgress from '@screens/CircularProgress';
import SwipeToDelete from '@screens/SwipeToDelete';
const Stack = createStackNavigator<RootStackParamList>();

const MyStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={"HOME"}>
      <Stack.Screen name={"HOME"} component={HomeScreen} />
      <Stack.Screen name={"COLOR_PICKER"} component={ColorPicker} />
      <Stack.Screen name={'CIRCULAR_PROGRESS'} component={CircularProgress} />
      <Stack.Screen name={'SWIPE_TO_DELETE'} component={SwipeToDelete} />
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
