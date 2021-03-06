import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/routesNames';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HOME'>;

export interface IHomeScreen {
  navigation: HomeScreenNavigationProp;
}
