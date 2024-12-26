import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MuscleGroupDto } from "@/constants/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { muscleGroupImages } from "../../constants/muscleGroupImages";

interface MuscleGroupComponentProps {
  muscleGroup: MuscleGroupDto;
}

const MuscleGroupComponent: React.FC<MuscleGroupComponentProps> = ({
  muscleGroup,
}) => {
  const imageSource = muscleGroupImages[muscleGroup.id];
  return (
    <TouchableOpacity
      className={`mr-2 w-[230px] h-[103px]`}
      onPress={() => router.push(`/exercisePage/${muscleGroup.id}`)}
    >
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Text className="font-pText text-[15px] text-white text-center">
          {muscleGroup.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MuscleGroupComponent;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
});
