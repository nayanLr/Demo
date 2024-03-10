import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { COLORS, FONT } from "../constant";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface IPropsTypes {
  placeHolderText?: string;
  refs?: any;
  isSecure?: boolean;
  onChange: any;
  isAutoFocus?: boolean;
  isNextFocus?: any;
  keyType?: any;
  textContainer?: any;
  values: string;
  maxLength?: number;
  onBlurInput?: any;
  numofLine?: number;
  isMultiLine?: boolean;
  isError?: any;
}

const InputText = ({
  placeHolderText,
  refs,
  isSecure,
  onChange,
  isAutoFocus,
  isNextFocus,
  keyType,
  textContainer,
  maxLength,
  values,
  onBlurInput,
  numofLine,
  isMultiLine,
  isError,
}: IPropsTypes) => {
  return (
    <View style={textContainer}>
      <TextInput
        ref={refs}
        style={[
          styles.textInputStyles,
          {
            borderColor: isError ? COLORS.danger : COLORS.secondary,
          },
        ]}
        placeholder={placeHolderText}
        autoFocus={isAutoFocus}
        value={values}
        onChangeText={onChange}
        onSubmitEditing={() => {
          setTimeout(() => {
            isNextFocus?.current?.focus();
          }, 300);
        }}
        onBlur={onBlurInput}
        secureTextEntry={isSecure}
        maxLength={maxLength}
        placeholderTextColor={"#979292"}
        keyboardType={keyType}
        numberOfLines={numofLine}
        multiline={isMultiLine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyles: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
    alignSelf: "center",
    width: "90%",
    height: 46,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: COLORS.solidBlack,
    padding: 0,
    fontFamily: FONT.quickSandMedium,
    marginTop: wp(6),
  },
});

export default InputText;
