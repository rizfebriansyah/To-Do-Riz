import React from 'react';
import {Button} from '@rneui/base';
import {REGULAR} from '../styles/Fonts';
import {SKY_BLUE, LIME_GREEN, WHITE} from '../styles/Colors';
import {moderateScale} from '../styles/Scalling';
import {width} from '../styles/Others';

export default function RegularButton({
  loading,
  title,
  height = 35,
  mb = 0,
  secondary,
  mt = 0,
  mv = 0,
  mr = 0,
  buttonStyle,
  style,
  ...props
}) {
  return (
    <Button
      loading={loading}
      title={title}
      containerStyle={{
        height,
        borderRadius: 7,
        marginBottom: mb,
        marginTop: mt,
        marginVertical: mv,
        marginRight: mr,
        minWidth: (width - 75) / 5,
        ...style,
      }}
      buttonStyle={{
        height,
        backgroundColor: secondary ? LIME_GREEN : SKY_BLUE,
        borderRadius: 7,
        ...buttonStyle
      }}
      titleStyle={{
        fontFamily: REGULAR,
        color: WHITE,
        fontSize: moderateScale(16),
        textTransform: 'capitalize',
        paddingHorizontal: 7,
      }}
      {...props}
    />
  );
}
