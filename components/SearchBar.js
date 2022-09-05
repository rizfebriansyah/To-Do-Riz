import React, {useContext} from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Context from '../context/Context';
import {BLACK, GRAY, gray1, LIGHT_GRAY, WHITE} from '../styles/Colors';
import {width} from '../styles/Others';
import {caption} from '../styles/Typography';

export default ({
  placeholder = 'Search property...',
  navigation,
  onSearch,
  style,
  ...props
}) => {
  const {darkMode} = useContext(Context);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: width - 40,
        height: 50,
        ...style,
      }}>
      <Icon
        name="search"
        size={26}
        color={GRAY}
        style={{position: 'absolute', right: 15, top: 10, zIndex: 22}}
        onPress={onSearch}
      />
      <TextInput
        style={{
          width: '100%',
          ...caption,
          fontSize: 18,
          height: 50,
          color: BLACK,
          backgroundColor: WHITE,
          letterSpacing: 0.4,
          borderRadius: 15,
          paddingLeft:25,
        }}
        placeholder={placeholder}
        placeholderTextColor={GRAY}
        onSubmitEditing={onSearch}
        {...props}
      />
    </View>
  );
};
