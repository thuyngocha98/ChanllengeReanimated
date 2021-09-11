import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IHomeScreen} from './HomeScreen.interface';

interface IButtons {
  title: string;
  onPress: () => void;
}
const {width} = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.9;
const BUTTON_HEIGHT = 60;
const BACKGROUND_COLOR = '#FAFBFF';

const HomeScreen: React.FC<IHomeScreen> = ({navigation}): JSX.Element => {
  const navigateToColorPicker = () => {
    navigation.navigate('COLOR_PICKER');
  };
  const navigateToCircularProgress = () => {
    navigation.navigate('CIRCULAR_PROGRESS');
  };
  const navigateToSwipeToDelete = () => {
    navigation.navigate('SWIPE_TO_DELETE');
  };

  const BUTTONS = [
    {
      title: 'Color Picker 🌈',
      onPress: navigateToColorPicker,
    },
    {
      title: 'Circular Progress 🔄',
      onPress: navigateToCircularProgress,
    },
    {
      title: 'Swipe To Delete 🗑️',
      onPress: navigateToSwipeToDelete,
    },
  ] as IButtons[];

  return (
    <SafeAreaView style={styles.container}>
      {BUTTONS.map((item: IButtons) => (
        <TouchableOpacity
          key={item.title}
          onPress={item.onPress}
          style={styles.viewBtn}>
          <Text style={styles.txt}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  viewBtn: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  txt: {
    fontSize: 16,
  },
});

export default HomeScreen;
