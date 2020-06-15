import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { Buttons } from '../Styleguide';

export default PrimaryButton = ({ onPress, title, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[ ...style, { alignSelf: 'center' }]}
    activeOpacity={0.6}
  >
    <View style={{ ...Buttons.primary }}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);
