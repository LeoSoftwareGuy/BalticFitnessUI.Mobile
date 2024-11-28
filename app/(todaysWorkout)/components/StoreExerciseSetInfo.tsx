import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";

interface StoreExerciseSetInfoProps {
  reps: number;
  weight: string;
}

const StoreExerciseSetInfo: React.FC<StoreExerciseSetInfoProps> = ({
  reps,
  weight,
}) => {
  const info = useMemo(() => {
    if (weight === "BodyWeight") {
      return `${reps} x BodyWeight`;
    } else {
      return `${reps} x ${weight} kg`;
    }
  }, [reps, weight]);

  return (
    <View style={styles.setCircle}>
      <Text className="font-pText text-[12px] text-white leading-[22px] font-normal">
        {info}
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
