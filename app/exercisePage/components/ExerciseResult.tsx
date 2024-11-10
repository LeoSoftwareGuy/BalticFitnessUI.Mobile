import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheetView } from "@gorhom/bottom-sheet";

const ExerciseResult = () => {
  return (
    <LinearGradient
      colors={["rgba(107, 107, 107, 0.1)", "rgba(107, 107, 107, 1)"]}
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 1 }} 
      style={styles.headerWrapper}
    >
      <BottomSheetView style={styles.content}>
        <Text className="py-[4px] text-center text-[18px] font-normal leading-5 text-white font-pRegular">
          Last Result
        </Text>
        <BottomSheetView style={styles.stats__wrapper}>
          <Text className=" pb-[5px] text-[13px] font-normal leading-5 text-white font-pRegular">
            15 reps
          </Text>
          <Text className=" pb-[5px] text-[13px] font-normal leading-5 text-white font-pRegular">
            3 sets
          </Text>
          <Text className=" pb-[5px] text-[13px] font-normal leading-5 text-white font-pRegular">
            15 kg
          </Text>
        </BottomSheetView>
      </BottomSheetView>
    </LinearGradient>
  );
};

export default ExerciseResult;

const styles = StyleSheet.create({
  headerWrapper: {
    marginTop: 8,
    borderRadius: 10,
    position: "relative",
    borderWidth: 2,
    borderColor: "black",
  },
  content: {
    width: "100%",
  },
  stats__wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
