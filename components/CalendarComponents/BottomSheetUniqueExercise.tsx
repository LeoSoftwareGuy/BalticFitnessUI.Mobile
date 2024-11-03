import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheetExerciseInfo from "./BottomSheetExerciseInfo";
import { ExerciseGroupDto } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";

interface BottomSheetUniqueExerciseProps {
  uniqueExercise: ExerciseGroupDto;
}

const BottomSheetUniqueExercise: React.FC<BottomSheetUniqueExerciseProps> = ({
  uniqueExercise,
}) => {
  return (
    <BottomSheetView style={styles.exerciseContainer}>
      {/* FlatList for horizontal scrolling of exercise sets */}
      <LinearGradient
        colors={["rgba(107, 107, 107, 0.1)", "rgba(107, 107, 107, 0.6)"]}
        className="rounded-xl"
      >
        <Text className="pl-[8px] pt-[8px] pb-[8px] font-pText text-[12px] leading-[22px] font-normal text-white">
          {uniqueExercise.name}
        </Text>
        <BottomSheetFlatList
          data={uniqueExercise.exerciseSets}
          renderItem={({ item }) => (
            <BottomSheetExerciseInfo reps={item.reps} weight={item.weight} />
          )}
          keyExtractor={(item,index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.setsContainer}
        />
      </LinearGradient>
    </BottomSheetView>
  );
};

export default BottomSheetUniqueExercise;

const styles = StyleSheet.create({
  exerciseContainer: {
    marginBottom: 16,
    marginLeft: 15,
    height: 80,
    backgroundColor: "transparent",
    borderRadius: 15,
    alignSelf: "flex-start", // width stretches to fit the content not more.
  },
  setsContainer: {
    paddingHorizontal: 9,
    paddingBottom: 9,
    flexDirection: "row",
    columnGap: 8,
  },
});
