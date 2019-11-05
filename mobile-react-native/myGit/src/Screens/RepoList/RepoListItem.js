import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { Transition } from 'react-navigation-fluid-transitions';

import { Layout } from '../../Styleguide'

{/* <Transition shared={`container-${slug}`}>
<View style={styles.container} />
</Transition> */}

const RepoListItem = ({
  index,
  repo: { name, description },
  onPress,
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    testID={`RepoItem-${index}`}
  >
    <Animatable.View
      animation="fadeInUp"
      duration={200}
      delay={index * 200}
      useNativeDriver
      style={{ width: '100%', borderBottomWidth: 1 }}
    >
      <Text style={{ fontSize: 21, color: '#212121' }}>{name}</Text>
      <View style={{ borderRadius: Layout.Global.radius, borderWidth: 1, alignItems: 'center', padding: 24, marginTop: 4, marginBottom: 24 }}>
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
