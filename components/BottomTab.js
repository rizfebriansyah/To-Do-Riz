import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, View, TouchableNativeFeedback} from 'react-native';
import React, {useContext} from 'react';
import {BLACK, GOLD_YELLOW, GRAY, MID_GRAY, WHITE} from '../styles/Colors';
import {width} from '../styles/Others';
import {REGULAR} from '../styles/Fonts';
import {moderateScale} from '../styles/Scalling';
import Context from '../context/Context';

export default function BottomTab({state, descriptors, navigation}) {
  const {darkMode, user} = useContext(Context);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: darkMode ? BLACK : WHITE,
        borderTopColor: MID_GRAY,
        borderTopWidth: 0.4,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;
        const {name} = route;
        let iconName =
          name == 'Search'
            ? 'search'
            : name == 'Profile'
            ? 'user-alt'
            : name == 'Rewards'
            ? 'coins'
            : 'tasks';
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            let path =name;
            if(!user && (name == "Profile")){
              path = "Login";
            }
            navigation.navigate({
              name: path,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableNativeFeedback
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.name}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}>
              <Icon
                name={iconName}
                color={isFocused ? GOLD_YELLOW : MID_GRAY}
                size={moderateScale(isFocused ? 27 : 24)}
              />
              <Text
                style={{
                  fontFamily: REGULAR,
                  color: isFocused ? GOLD_YELLOW : MID_GRAY,
                  marginTop: 4,
                  textTransform: 'uppercase',
                  fontSize: width * 0.03,
                }}>
                {name}
              </Text>
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </View>
  );
}
