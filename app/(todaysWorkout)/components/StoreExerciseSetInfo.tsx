import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface StoreExerciseSetInfoProps {
  reps: number;
  weight: number;
}

const StoreExerciseSetInfo: React.FC<StoreExerciseSetInfoProps> = ({
  reps,
  weight,
}) => {
  return (
    <View style={styles.setCircle}>
      <Text className="font-pText text-[12px] text-white leading-[22px] font-normal">
        {reps} x {weight} kg
      </Text>
    </View>
  );
};

export default StoreExerciseSetInfo;

const styles = StyleSheet.create({
  setCircle: {
    marginBottom: 10,
    paddingHorizontal: 15,
    width: 100,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#081B16",
    justifyContent: "center",
    alignItems: "center",
  },
});
