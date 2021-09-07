import React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface IPicker {
  colors: string[];
  onColorPickerChanged: (color: number | string) => void;
}

const {width} = Dimensions.get('window');
const WIDTH_PICKER = width * 0.9;
const HEIGHT_PICKER = 40;
const SIZE_CIRCLE_PICKER = 45;

const Picker: React.FC<IPicker> = ({colors, onColorPickerChanged}) => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const adjustTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      WIDTH_PICKER - SIZE_CIRCLE_PICKER,
    );
  }, []);

  const onEnd = React.useCallback(() => {
    'worklet';
    scale.value = withSpring(1);
    translateY.value = withSpring(0);
  }, []);

  const gestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >(
    {
      onStart: (_, context) => {
        context.x = adjustTranslateX.value;
        scale.value = withSpring(1.2);
        translateY.value = withSpring(-SIZE_CIRCLE_PICKER - 5);
      },
      onActive: (event, context) => {
        translateX.value = event.translationX + context.x;
      },
      onEnd,
    },
    [],
  );

  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: event => {
        scale.value = withSpring(1.2);
        translateY.value = withTiming(-SIZE_CIRCLE_PICKER - 5);
        translateX.value = withTiming(event.absoluteX - SIZE_CIRCLE_PICKER);
      },
      onEnd,
    },
    [],
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: adjustTranslateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  const rInnerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, i) => (i / colors.length) * width);

    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors,
    );

    onColorPickerChanged?.(backgroundColor);

    return {
      backgroundColor,
    };
  });

  return (
    <TapGestureHandler numberOfTaps={1} onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={gestureEvent}>
          <Animated.View style={styles.container}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={colors}
              style={styles.linearGradient}
            />
            <Animated.View style={[styles.circlePicker, rStyle]}>
              <Animated.View style={[styles.innerCircle, rInnerStyle]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH_PICKER,
    height: HEIGHT_PICKER,
    borderRadius: HEIGHT_PICKER / 2,
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    borderRadius: HEIGHT_PICKER / 2,
  },
  circlePicker: {
    width: SIZE_CIRCLE_PICKER,
    height: SIZE_CIRCLE_PICKER,
    borderRadius: SIZE_CIRCLE_PICKER / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  innerCircle: {
    width: SIZE_CIRCLE_PICKER / 2,
    height: SIZE_CIRCLE_PICKER / 2,
    borderRadius: SIZE_CIRCLE_PICKER / 4,
    backgroundColor: 'red',
    borderWidth: 1.0,
    borderColor: 'gray',
  },
});

export default Picker;
