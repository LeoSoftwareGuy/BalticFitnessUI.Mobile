import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";

interface OnBoardingSlideProps {
  item: { id: number; title: string };
}

const OnBoardingSlide: React.FC<OnBoardingSlideProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  const slideText = item.title;
  return (
    <View style={[styles.container, { width }]}>
      <Text className="font-pText text-4xl text-white">
        {slideText.includes("optimize") ? (
          <>
            This app is your personal fitness companion, designed to{" "}
            <Text className="text-emerald">track</Text> and{" "}
            <Text className="text-emerald">optimize</Text> your workouts.
          </>
        ) : slideText.includes("progress") ? (
          <>
            Log exercises, sets, and reps with ease, while monitoring your{" "}
            <Text className="text-emerald">progress</Text> over time.
          </>
        ) : (
          <>
            Whether you're a begineer or an experienced athlete, this app helps
            you <Text className="text-emerald">stay on track</Text>.
          </>
        )}
      </Text>
    </View>
  );
};
export default OnBoardingSlide;

const styles = StyleSheet.create({
  container: {
    marginTop: 57,
    padding: 20,
  },
});
