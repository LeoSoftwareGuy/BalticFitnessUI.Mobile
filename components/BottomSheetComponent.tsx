import { StyleSheet, Text, Image } from "react-native";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { icons } from "@/constants";
import { ExerciseSet, Training } from "@/app/(tabs)/bookmark";

interface Props {
  title: string;
  training: Training;
  onClose: () => void;
}
type Ref = BottomSheet;

const BottomSheetComponent = forwardRef<Ref, Props>((props, ref) => {
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={["40%", "60%", "80%"]}
      backgroundStyle={{ backgroundColor: "#fff" }}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
    >
      <BottomSheetView style={styles.bottomSheetContent}>
        <TouchableOpacity style={styles.buttonsWrapper} onPress={props.onClose}>
          <Image
            source={icons.logout}
            style={styles.closeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <BottomSheetScrollView style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>{props.title}</Text>

          <BottomSheetView style={styles.muscleGroupContainer}>
            <Text style={styles.muscleGroupLabel}>Muscle Groups:</Text>
            <Text style={styles.muscleGroupValue}>
              {Object.keys(props.training.exercisesPerMuscleGroup).join(", ")}
            </Text>
          </BottomSheetView>

          {/* Iterate through muscle groups */}
          {Object.entries(props.training.exercisesPerMuscleGroup).map(
            ([muscleGroup, exerciseGroups], idx) => (
              <BottomSheetView key={idx} style={styles.exerciseGroupContainer}>
                <Text style={styles.exerciseGroupTitle}>{muscleGroup}</Text>

                {/* Iterate through exercises within each muscle group */}
                {exerciseGroups.map((exerciseGroup, exerciseIdx) => (
                  <BottomSheetView
                    key={exerciseIdx}
                    style={styles.exerciseContainer}
                  >
                    <Text style={styles.exerciseName}>
                      {exerciseGroup.name}
                    </Text>

                    {/* Display individual sets in circles */}
                    <BottomSheetView style={styles.setsContainer}>
                      {exerciseGroup.exerciseSets.map(
                        (set: ExerciseSet, setIdx: number) => (
                          <BottomSheetView
                            key={setIdx}
                            style={styles.setCircle}
                          >
                            <Text style={styles.setText}>
                              {set.reps} x {set.weight}kg
                            </Text>
                          </BottomSheetView>
                        )
                      )}
                    </BottomSheetView>
                  </BottomSheetView>
                ))}
              </BottomSheetView>
            )
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
  },
  buttonsWrapper: {
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1, // Ensure it takes up remaining space
    padding: 20,
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  // Muscle Group Styling
  muscleGroupContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  muscleGroupLabel: {
    fontSize: 20,
    fontWeight: "600",
  },
  muscleGroupValue: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
  },

  // Exercise Group Styling
  exerciseGroupContainer: {
    marginBottom: 20,
  },
  exerciseGroupTitle: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: 5,
  },

  // Exercise and Sets Styling
  exerciseContainer: {
    marginBottom: 20,
    marginLeft: 15,
    paddingLeft: 10,
    width: 350,
    backgroundColor: "#5f7064",
    borderRadius: 15,
  },
  exerciseName: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  setsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
  },
  setCircle: {
    marginBottom: 10,
    paddingHorizontal: 15,
    width: 100,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#e0e0e0", // Light background for the circle
    justifyContent: "center",
    alignItems: "center",
  },
  setText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
