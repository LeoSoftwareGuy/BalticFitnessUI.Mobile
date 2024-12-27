import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import useBestResult from "@/hooks/useBestResult";

interface ExerciseResultProps {
  resultType: "Best" | "Last";
  exerciseId: number;
}

const ExerciseResult: React.FC<ExerciseResultProps> = ({
  resultType,
  exerciseId,
}) => {
  const resultName = useMemo(() => {
    if (resultType === "Best") {
      return "Best Result";
    }
    return "Last Result";
  }, [resultType]);

  const { data: exerciseStats, error, isLoading } = useBestResult(exerciseId, {
    type: resultType,
  });

  if (isLoading) {
    return (
      <BottomSheetView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </BottomSheetView>
    );
  }

  if (error) {
    return (
      <BottomSheetView style={styles.loaderContainer}>
        <Text style={styles.errorText}>
          Failed to load data. Please try again.
        </Text>
      </BottomSheetView>
    );
  }

  return (
    <LinearGradient
      colors={["rgba(107, 107, 107, 0.1)", "rgba(107, 107, 107, 1)"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.headerWrapper}
    >
      <BottomSheetView style={styles.content}>
        <Text className="py-[4px] text-center text-[18px] font-normal leading-5 text-white font-pRegular">
          {resultName}
        </Text>
        <BottomSheetView style={styles.stats__wrapper}>
          <Text className=" pb-[5px] text-[13px] font-normal leading-5 text-white font-pRegular">
            {exerciseStats?.reps} reps
          </Text>
          <Text className=" pb-[5px] text-[13px] font-normal leading-5 text-white font-pRegular">
            {exerciseStats?.sets} sets
          </Text>
          <Text className=" pb-[5px] text-[13px] font-normal leading-5 text-white font-pRegular">
            {exerciseStats?.weight} kg
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  noDataText: {
    color: "#cccccc",
    marginTop: 10,
    fontSize: 16,
  },
});
