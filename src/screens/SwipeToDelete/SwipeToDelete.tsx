import React, {useCallback, useRef, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from './ListItem';

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({title, index}));

const BACKGROUND_COLOR = '#FAFBFF';

const SwipeToDelete: React.FC = () => {
  const [tasks, setTasks] = useState(TASKS);
  const scrollRef = useRef(null);

  const onDismissed = useCallback((task: TaskInterface) => {
    setTasks(tasks =>
      tasks.filter((item: TaskInterface) => item.index != task.index),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtTitle}>Tasks</Text>
      <ScrollView ref={scrollRef} style={styles.scrollView}>
        {tasks.map((task: TaskInterface) => {
          return (
            <ListItem simultaneousHandlers={scrollRef}  key={task.index} onDismissed={onDismissed} task={task} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  txtTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 20,
  },
  scrollView: {
    flex: 1,
  },
});

export default SwipeToDelete;
