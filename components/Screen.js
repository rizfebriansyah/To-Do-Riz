import {Text, SafeAreaView, StatusBar, View} from 'react-native';
import React, {useContext} from 'react';
import {BLACK, GRAY, WHITE} from '../styles/Colors';
import {BOLD} from '../styles/Fonts';
import {useNavigation} from '@react-navigation/native';
import {height} from '../styles/Others';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

export default function Screen({title, children}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: WHITE,
        alignItems: 'center',
        height: height + StatusBar.currentHeight,
      }}>
      <StatusBar
        backgroundColor={WHITE}
        barStyle={`${'dark'}-content`}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <FontIcon
          name="chevron-left"
          size={24}
          style={{
            color:GRAY,
            alignSelf: 'flex-start',
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontFamily: BOLD,
            color:GRAY,
            width: '100%',
            textAlign: 'center',
            fontSize: 22,
          }}>
          {title}
        </Text>
      </View>
      {children}
    </SafeAreaView>
  );
}
