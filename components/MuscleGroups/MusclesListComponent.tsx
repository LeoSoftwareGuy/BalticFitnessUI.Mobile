import { StyleSheet, Text, View, Image } from "react-native";
import React, { useMemo } from "react";
import { MuscleGroup } from "@/constants/types";
import { FlatList } from "react-native-gesture-handler";
import MuscleGroupComponent from "./MuscleGroupComponent";

interface MusclesListComponentProps {
  type: "Upper" | "Lower" | "Cardio";
  muscleGroups: MuscleGroup[];
}

const MusclesListComponent: React.FC<MusclesListComponentProps> = ({
  type,
  muscleGroups,
}) => {
  const muscleGroupsFiltered = useMemo(
    () => muscleGroups.filter((g) => g.type === type),
    [muscleGroups, type]
  );

  return (
    <View className="my-1 min-h-[160px]">
      <Text className="mb-1 font-pText text-[16px] text-white">
        {type} body
      </Text>
      <FlatList
        data={muscleGroupsFiltered}
        renderItem={({ item }) => <MuscleGroupComponent muscleGroup={item} />}
        keyExtractor={(MuscleGroup, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MusclesListComponent;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
  },
});
