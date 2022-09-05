import React from "react";
import {Input} from "@rneui/themed";
import {MID_GRAY, WHITE} from "../styles/Colors";
import {REGULAR} from "../styles/Fonts";
import {moderateScale} from "../styles/Scalling";

export default ({icon, value, setValue, secondary, lg, ...props}) => (
	<Input
		leftIcon={{
			type: "font-awesome",
			name: icon,
			color: secondary ? WHITE : MID_GRAY,
			size: 20,
			containerStyle: {width: 22},
		}}
		// errorStyle={{ color: "red" }}
		// errorMessage="ENTER A VALID ERROR HERE"

		inputStyle={{
			fontFamily: REGULAR,
			color: secondary ? WHITE : MID_GRAY,
			fontSize: moderateScale(18),
			letterSpacing: 1.2,
		}}
		{...props}
		value={value}
		onChangeText={(text) => setValue(text)}
		inputContainerStyle={{
			borderColor: secondary ? WHITE : MID_GRAY,
			borderBottomWidth: 1,
			paddingBottom: lg ? 45 : 5,
		}}
		placeholderTextColor={secondary ? WHITE : MID_GRAY}
	/>
);
