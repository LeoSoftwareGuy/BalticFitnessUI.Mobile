import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ExerciseSet } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import StoreExerciseSetInfo from "./StoreExerciseSetInfo";

interface StoredExerciseInfoProps {
  uniqueExercise: ExerciseSet[];
  exerciseInfo: string;
}

const StoredExerciseInfo: React.FC<StoredExerciseInfoProps> = ({
  uniqueExercise,
  exerciseInfo
}) => {
  return (
    <View style={styles.exerciseContainer}>
      {/* FlatList for horizontal scrolling of exercise sets */}
      <LinearGradient
        colors={["rgba(107, 107, 107, 0.1)", "rgba(107, 107, 107, 0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="rounded-xl"
      >
        <Text className="pl-[8px] pt-[8px] pb-[8px] font-pText text-[12px] leading-[22px] font-normal text-white">
          {exerciseInfo}
        </Text>
        <FlatList
          data={uniqueExercise}
          renderItem={({ item }) => (
            <StoreExerciseSetInfo reps={item.reps} weight={item.weight} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.setsContainer}
        />
      </LinearGradient>
    </View>
  );
};

export default StoredExerciseInfo;

const styles = StyleSheet.create({
  exerciseContainer: {
    marginBottom: 16,

    height: 80,
    backgroundColor: "transparent",
    borderRadius: 15,
    width: "100%",
    alignSelf: "flex-start",
  },
  setsContainer: {
    paddingHorizontal: 9,
    paddingBottom: 9,
    flexDirection: "row",
    columnGap: 8,
  },
});
