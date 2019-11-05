import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Margins, Colors, Layout } from '../Styleguide';

export default SearchKeywordInput = (props) => {
  const opacity = props.defaultValue ? 1 : 0;
  return (
    <View style={styles.searchSection}>
      <Icon name="search" size={24} color={Colors.primary} />
      <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.primary}
          autoCorrect={false}
          autoCompleteType="off"
          autoCapitalize={false}
          {...props}
      />
      <TouchableOpacity onPress={() => props.onChange('')}>
        <Icon name="close" style={{ opacity }} size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Margins.small,
    borderWidth: 1,
    borderRadius: Layout.Global.radius,
    marginBottom: Margins.base,
  },
  input: {
    textAlign: 'center',
    flex: 1,
  },
});
