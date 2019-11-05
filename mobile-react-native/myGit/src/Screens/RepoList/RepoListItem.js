import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { withNavigationFocus } from 'react-navigation';
// import { Transition } from 'react-navigation-fluid-transitions';

// import { Text } from 'components/styleguide';

{/* <Transition shared={`gym-container-${slug}`}>
<View style={styles.container} />
</Transition> */}

const RepoListItem = ({
  index,
  repo: { name, description },
  onPress,
}) =>
  (
    <TouchableWithoutFeedback
      onPress={onPress}
      testID={`RepoItem-${index}`}
    >
      <Animatable.View
        animation="fadeInUp"
        // duration={animationDuration}
        delay={index * 200}
        useNativeDriver
        style={{ width: '100%', borderBottomWidth: 1 }}
      >
        <Text style={{ fontSize: 21, color: '#212121' }}>{name}</Text>
        <View style={{ borderWidth: 1, alignItems: 'center', padding: 24, marginTop: 4, marginBottom: 24 }}>
          <Text>{description}</Text>
        </View>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );

  RepoListItem.propTypes = {
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    repo: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
};

export default RepoListItem;
