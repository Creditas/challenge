import {createStackNavigator} from 'react-navigation-stack';

import SearchScreen from '../modules/search/screens/SearchScreen';
import CommitsScreen from '../modules/search/screens/CommitsScreen';

const MainStack = createStackNavigator(
  {
    Search: {screen: SearchScreen},
    Commits: {screen: CommitsScreen},
  },
  {
    initialRouteName: 'Search',
    headerMode: 'none',
  },
);

export default MainStack;
