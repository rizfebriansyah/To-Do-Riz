import {Text, SafeAreaView, StatusBar, Pressable, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {BLACK, GOLD_YELLOW, GRAY, WHITE} from '../styles/Colors';
import {BOLD, REGULAR} from '../styles/Fonts';
import {useNavigation} from '@react-navigation/native';
import RegularInput from '../components/RegularInput';
import RegularButton from '../components/RegularButton';
import {height, width} from '../styles/Others';
import Context from '../context/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fbLogin } from '../functions/FBAuth';
import { getCurrentUser } from '../functions/FBDB';

export default function Login() {
  const {setUser} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const login = async () => {
    await setLoading(true);

     fbLogin(email, password).then(async(data) => {
      await getCurrentUser(data.user.uid).then(user=>{
        setUser(user);
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      });
    })
    .catch((error) => setLoading(false));

    setLoading(false);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:  WHITE,
      }}>
      <StatusBar
        backgroundColor={ WHITE}
        barStyle={`${'dark'}-content`}
      />

      <KeyboardAwareScrollView contentContainerStyle={{
            alignItems: 'center',
            width,
            height:height,
            paddingHorizontal:15,
            paddingTop:50
          }}>
            <Image source={require('../assets/logo.png')} style={{width:70,height:70,marginBottom:20}}/>
      <Text
        style={{
          fontFamily: BOLD,
          color: GRAY,
          fontSize: 30,
          marginBottom: 30,
        }}>
        Sign In
      </Text>
      <RegularInput
        placeholder="Email address"
        icon="envelope"
        value={email}
        setValue={value => setEmail(value)}
        keyboardType="email-address"
      />
      <RegularInput
        placeholder="Password"
        icon="lock"
        secureTextEntry={!showPassword}
        value={password}
        maxLength={20}
        setValue={value => setPassword(value)}
      />
      <RegularButton
        title="Login"
        style={{width: width - 50}}
        mt={20}
        height={50}
        onPress={login}
        loading={loading}
      />
      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            fontFamily: REGULAR,
            color: GRAY,
            fontSize: 18,
            marginTop: 20,
            textTransform: 'uppercase',
          }}>
          Register
        </Text>
      </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}