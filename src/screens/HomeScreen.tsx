import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import routesNames from 'src/navigation/routesNames';

interface IHome {
  navigation: any;
}

const HomeScreen: React.FC<IHome> = ({navigation}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Button
        title="Color Picker"
        onPress={() => navigation.navigate(routesNames.COLOR_PICKER)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
