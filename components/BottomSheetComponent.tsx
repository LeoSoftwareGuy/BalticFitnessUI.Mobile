import { StyleSheet, Text, Image } from "react-native";
import React, { forwardRef } from "react";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { icons } from "@/constants";
import { Training } from "@/app/(tabs)/bookmark";
import BottomSheetUniqueExercise from "./ForCalendar/BottomSheetUniqueExercise";

interface Props {
  title: string;
  training: Training;
  onClose: () => void;
}
type Ref = BottomSheet;

const BottomSheetComponent = forwardRef<Ref, Props>((props, ref) => {
  const allUniqueExercises = Object.values(props.training.exercisesPerMuscleGroup).flat();

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={["40%", "60%", "80%"]}
      backgroundStyle={{ backgroundColor: "#50C878" }} 
      handleIndicatorStyle={{ backgroundColor: "#50C878" }}
    >
      {/* Header with Emerald Background */}
      <BottomSheetView style={styles.headerWrapper}>
        <BottomSheetView style={styles.headerRow}>
          <Text style={styles.headerTitle}>{props.title}</Text>
          <Text style={styles.headerSubtitle}>Your workout</Text>
          <TouchableOpacity style={styles.buttonsWrapper} onPress={props.onClose}>
            <Image
              source={icons.logout}
              style={styles.closeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetView>

      {/* FlatList with Gray Background */}
      <BottomSheetFlatList
        data={allUniqueExercises}
        renderItem={({ item }) => <BottomSheetUniqueExercise uniqueExercise={item} />}
        keyExtractor={(exercise) => exercise.name}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#50C878", // Emerald green background for the top
    paddingBottom: 17,
  },
  headerRow: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
   
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
  buttonsWrapper: {
    paddingLeft:40,
    alignItems: "flex-end",
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#2C2C2C", // Gray background for the content below the header
    paddingVertical: 20,
  },
});
