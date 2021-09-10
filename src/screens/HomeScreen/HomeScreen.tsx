import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IHomeScreen} from './HomeScreen.interface';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.7;
const BUTTON_HEIGHT = 50;

const HomeScreen: React.FC<IHomeScreen> = ({navigation}): JSX.Element => {
  const navigateToColorPicker = () => {
    navigation.navigate('COLOR_PICKER');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToColorPicker} style={styles.viewBtn}>
        <Text style={styles.txt}>Color Picker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtn: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'green',
    marginBottom: 16,
  },
  txt: {
    fontSize: 16,
    color: '#ffffff',
  }
});

export default HomeScreen;
