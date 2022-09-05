import { Pressable, Text } from "react-native";
import React, { useContext } from "react";
import  { BOLD, REGULAR } from "../styles/Fonts";
import { BLACK, BLUE, GRAY, MID_GRAY, WHITE } from "../styles/Colors";
import { width } from "../styles/Others";
import { moderateScale } from "../styles/Scalling";
import Context from "../context/Context";

export const PrimaryHeader = ({ text,regular,style,mv=15,mb=0,mt=25, ...props }) => {
  const {darkMode}  = useContext(Context)
  return (
    <Text
      style={{
        fontFamily: regular?REGULAR:BOLD,
        color: darkMode?WHITE:BLACK,
        fontSize: moderateScale(regular?18:22),
        marginTop:mt,
        letterSpacing:.1,
        marginVertical: mv,
        // marginBottom:mb,
        ...style,
      }}
      {...props}
    >
      {text}
    </Text>
  );
};
export const Caption = ({ text,style,mv=8,mb=0,color=MID_GRAY, ...props }) => {
  return (
    <Text
        style={{
          width: "100%",
          color,
          fontFamily: BOLD,
          fontSize: moderateScale(17),
          marginVertical: 10,
        }}
      >
        Add Artwork (3)
      </Text>
  );
};
export const HeaderCaption = ({ text, ...props }) => {
  return (
    <Text
      style={{
        fontFamily: BOLD,
        color: GRAY,
        marginBottom: 5,
        fontSize: width*.04,
        letterSpacing:.02,
      }}
      {...props}
    >
      {text}
    </Text>
  );
};
export const Label = ({ text,color=MID_GRAY,mv=7,mt=0,...props }) => {
  return (
    <Text
      style={{
        fontFamily: REGULAR,
        color,
        marginVertical:mv,
        marginTop:mt,
        fontSize: moderateScale(16),
        letterSpacing:.5,
      }}
      {...props}
    >
      {text}
    </Text>
  );
};
export const RegularText = ({ text,...props }) => {
  return (
    <Text
      style={{
        fontFamily: REGULAR,
        color:BLACK,
        fontSize:16,
        marginVertical: 5,
        fontSize: width*.037,
        letterSpacing:.5,
      }}
      {...props}
    >
      {text}
    </Text>
  );
};

export const Link = ({text,textStyle,...props}) => (
  <Pressable  {...props}>
    <Text
      style={{
        fontFamily: REGULAR,
        fontSize: 18,
        letterSpacing:.043,
        color: BLACK,
        ...textStyle
      }}>
      {text}
    </Text>
  </Pressable>
);
export const ImportantLink = ({text,textStyle,...props}) => (
  <Pressable  {...props}>
    <Text
      style={{
        fontFamily: Fonts.regular,
        fontSize: 18,
        letterSpacing:.02,
        color: BLUE,
        ...textStyle
      }}>
      {text}
    </Text>
  </Pressable>
);
    export const SecText = ({size=18,text,mt=0,mb=0,mv=0,...props}) => (
      <Pressable  {...props}>
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: size,
            letterSpacing:.043,
            color: BLACK,
            marginTop:mt,
            marginBottom:mb,
            marginVertical:mv,
            textAlign:'center',
            paddingHorizontal:10
          }}>
          {text}
        </Text>
      </Pressable>
    );