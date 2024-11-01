import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MuscleGroup } from "@/constants/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

interface MuscleGroupComponentProps {
  muscleGroup: MuscleGroup;
}

const MuscleGroupComponent: React.FC<MuscleGroupComponentProps> = ({
  muscleGroup,
}) => {
  return (
    <TouchableOpacity
      className={`mr-2 bg-[url(${muscleGroup.imageUrl})] w-[230px] h-[103px]`}
      onPress={() => router.push(`/exercisePage/${muscleGroup.id}`)}
    >
      <Text className="font-pText text-[15px] text-white text-center">
        {muscleGroup.name}
      </Text>
    </TouchableOpacity>
  );
};

export default MuscleGroupComponent;

const styles = StyleSheet.create({});
