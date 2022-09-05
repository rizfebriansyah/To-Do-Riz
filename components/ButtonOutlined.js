import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { width } from "../styles/Others";
import { BOLD, REGULAR } from "../styles/Fonts";
import { GRAY, LIME_GREEN, MID_GRAY, SKY_BLUE, WHITE } from "../styles/Colors";
import { moderateScale } from "../styles/Scalling";

export default function ButtonOutlined({ title, mb = 0, mt = 0, mv = 0,mr,color=GRAY,secondary,...props}) {
    return (
      <Button
        title={title}
        type="outline"
        containerStyle={{
          borderRadius: 7,
          marginBottom: mb,
          marginTop: mt,
          marginVertical: mv,
          borderWidth:1.3,
          height:35,
          borderColor:secondary?LIME_GREEN:color,
        minWidth:(width-75)/5,
          marginRight:mr
        }}
        buttonStyle={{ height: 35,borderRadius:7,
          paddingHorizontal:10 }}
        titleStyle={{
          fontFamily: REGULAR,
          color: secondary?LIME_GREEN:color,
          fontSize: moderateScale(16),
          textTransform: "capitalize",
        }}
        {...props}
      />
    );
  }
