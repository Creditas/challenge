import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {
  ItemDescription,
  ItemWrapper,
  ItemText,
} from './RepoList.style';

import { Layout } from '../../Styleguide';

const AnimatedItemWrapper = Animatable.createAnimatableComponent(ItemWrapper);

const RepoListItem = ({
  index,
  repo: { name, description },
  onPress,
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    testID={`RepoItem-${index}`}
  >
    <AnimatedItemWrapper
      animation="fadeInUpBig"
      duration={200}
      delay={index * 200}
      useNativeDriver
    >
      <ItemText>{name}</ItemText>
      <ItemDescription>
        <Text>{description}</Text>
      </ItemDescription>
    </AnimatedItemWrapper>
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
