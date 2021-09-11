import React, {useCallback, useEffect} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {withTiming} from 'react-native-reanimated';
import {useAnimatedProps} from 'react-native-reanimated';
import {useDerivedValue} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';

const {width, height} = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI * R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onRun = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, {duration: 3000});
  }, []);

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{position: 'absolute'}}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={onRun} style={styles.btnRun}>
        <Text style={styles.txtRun}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'white',
    width: 200,
    textAlign: 'center',
  },
  btnRun: {
    position: 'absolute',
    bottom: 70,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRun: {
    fontSize: 25,
    color: 'white',
  },
});

export default CircularProgress;
