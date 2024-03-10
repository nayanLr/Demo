import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { COLORS, FONT } from "../constant";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  isDisable?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  onPress,
  isDisable,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 1, borderColor: COLORS.gray }} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={isDisable}
          style={[styles.buttonStyles, { opacity: isDisable ? 0.6 : 1 }]}
          activeOpacity={0.6}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.lightWhite,
  },
  buttonContainer: {
    marginTop: wp(5),
  },
  buttonStyles: {
    padding: wp(2.5),
    marginHorizontal: wp(10),
    marginBottom: wp(5),
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.quickSandMedium,
    fontSize: wp(4.5),
  },
});

export default SubmitButton;
