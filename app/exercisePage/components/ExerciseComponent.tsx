import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ExerciseDto } from "@/constants/types";
import { exerciseImages } from "../../../constants/muscleGroupImages";

interface ExerciseComponentProps {
  exercise: ExerciseDto;
  onClick: () => void;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({ exercise,onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} className="mb-4 w-3/6 h-[125px]">
      <Image
        className="w-full h-[88px]"
        source={exerciseImages[exercise.id]}
        resizeMode="contain"
      />
      <Text className="pl-[5px] pt-2 pb-2 font-pText text-[16px] text-white">
        {exercise.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ExerciseComponent;

const styles = StyleSheet.create({});
