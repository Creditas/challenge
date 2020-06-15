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
      <Icon name="search" size={24} color={Colors.secondary} />
      <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.primary}
          autoCorrect={false}
          autoCompleteType="off"
          autoCapitalize="none"
          {...props}
      />
      <TouchableOpacity onPress={() => props.onChange('')}>
        <Icon name="close" style={{ opacity }} size={24} color={Colors.secondary} />
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
    borderColor: Colors.secondary,
  },
  input: {
    textAlign: 'center',
    flex: 1,
  },
});
