import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Picker from './picker';

const COLORS = [
  'red',
  'blue',
  'cyan',
  'gray',
  'blue',
  'green',
  'orange',
  'pink',
  'purple',
  'black',
  'white',
];

const {width} = Dimensions.get('window');

const SIZE_CIRCLE = width * 0.8;

const ColorPicker: React.FC = () => {
  const colorPicker = useSharedValue<number | string>(0);

  const colorPickerChanged = React.useCallback((color: number | string) => {
    'worklet';
    colorPicker.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colorPicker.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <Picker colors={COLORS} onColorPickerChanged={colorPickerChanged} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  circle: {
    width: SIZE_CIRCLE,
    height: SIZE_CIRCLE,
    borderRadius: SIZE_CIRCLE / 2,
    backgroundColor: 'red',
  },
});

export default ColorPicker;
