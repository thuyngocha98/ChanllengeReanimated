import {Images} from 'assets';
import React, {memo} from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {TaskInterface} from './SwipeToDelete';

interface IListItem
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDismissed: (task: TaskInterface) => void;
}

const {width} = Dimensions.get('window');
const WIDTH_ITEM = width * 0.9;
const HEIGHT_ITEM = 70;
const TRANSLATE_X_THRESHOLD = -width * 0.35;

const ListItem: React.FC<IListItem> = ({
  task,
  onDismissed,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const heightItem = useSharedValue(HEIGHT_ITEM);
  const marginBottom = useSharedValue(20);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive: event => {
        translateX.value = event.translationX;
      },
      onEnd: () => {
        const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
        if (shouldBeDismissed) {
          translateX.value = withTiming(-width);
          heightItem.value = withTiming(0);
          marginBottom.value = withTiming(0);
          opacity.value = withTiming(0, undefined, isFinished => {
            if (isFinished) {
              runOnJS(onDismissed)(task);
            }
          });
        } else {
          translateX.value = withSpring(0);
        }
      },
    },
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const rStyleIconOpacity = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD / 1.5 ? 1 : 0,
    );
    return {
      opacity,
    };
  });

  const rStyleContainer = useAnimatedStyle(() => {
    return {
      height: heightItem.value,
      marginBottom: marginBottom.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyleContainer]}>
      <Animated.View style={[styles.viewIcon, rStyleIconOpacity]}>
        <Images.icTrash width={40} height={40} fill={'red'} />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.txtItem}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
  },
  task: {
    width: WIDTH_ITEM,
    height: HEIGHT_ITEM,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 20,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  txtItem: {
    fontSize: 16,
  },
  viewIcon: {
    width: HEIGHT_ITEM,
    height: HEIGHT_ITEM,
    position: 'absolute',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ListItem);
