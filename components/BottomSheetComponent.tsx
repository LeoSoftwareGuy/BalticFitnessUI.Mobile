import { StyleSheet, Text, Image } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import BottomSheetUniqueExercise from "./ForCalendar/BottomSheetUniqueExercise";
import { LinearGradient } from "expo-linear-gradient";
import { Training } from "@/constants/types";


interface Props {
  title: string;
  training: Training;
  onClose: () => void;
}
type Ref = BottomSheet;

const BottomSheetComponent = forwardRef<Ref, Props>((props, ref) => {
  const allUniqueExercises = Object.values(props.training.exercisesPerMuscleGroup).flat();
  const snapPoints = useMemo(() => ["40%", "60%", "80%"], []);
  const renderBackdrop = useCallback((props:any)=> <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />,[])

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "transparent" }} 
      backgroundStyle={{ backgroundColor: "transparent" }}
      backdropComponent={renderBackdrop}
    >
      {/* Header with Gradient */}
      <LinearGradient colors={["#05251C", "#0E6149"]} style={styles.headerWrapper}>
        <BottomSheetView style={styles.headerRow}>
          <Text className="pl-3 text-base font-normal leading-5 text-white font-pRegular">{props.title}</Text>
          <Text className="pl-4 text-2xl font-normal leading-6 text-white font-pText">Workout day</Text>
        </BottomSheetView>
      </LinearGradient>

      {/* FlatList with Gray Background */}
      <BottomSheetFlatList
        data={allUniqueExercises}
        renderItem={({ item }) => <BottomSheetUniqueExercise uniqueExercise={item} />}
        keyExtractor={(exercise,index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  headerWrapper: {
     paddingBottom: 30,
     borderRadius:4,
     position:'relative'
  },
  headerRow: {
    paddingHorizontal: 10,
    paddingTop:24,
    flexDirection: "row",
    alignItems: "center"
  },
  headerTitle: {
    paddingLeft:15,
    fontSize: 16,
    fontWeight: "400",
    lineHeight:22,
    color: "white",
    fontFamily:'font-pRegular'
  },
  buttonsWrapper: {
     position:"absolute",
     top:3,
     right:3
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
  contentContainer: {
    // flexGrow: 1,
    backgroundColor: "#131313", // Gray background for the main BottomSheet area
    paddingVertical: 20,
  },
});
