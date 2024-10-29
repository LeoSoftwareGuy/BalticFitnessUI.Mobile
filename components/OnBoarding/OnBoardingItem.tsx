import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { InformationProps } from "./OnBoarding";

interface OnBoardingSlideProps {
  item: InformationProps;
}

const OnBoardingSlide: React.FC<OnBoardingSlideProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width,backgroundColor: '#333'  }]}>
      <Text className="text-[36px] font-pText text-white">{item.title}</Text>
    </View>
  );
};

export default OnBoardingSlide;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
