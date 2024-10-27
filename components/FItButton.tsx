import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface CustomFitButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const FitButton: React.FC<CustomFitButtonProps> = ({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={` ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <LinearGradient
        colors={["#05231B", "#0C5542", "#05231B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.48, 1]}
        style={styles.button}
      >
        <Text
          className={`text-center text-white text-lg font-pBold font-medium`}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FitButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 17,
    paddingHorizontal: 130,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
});
