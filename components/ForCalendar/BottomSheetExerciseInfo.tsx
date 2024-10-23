import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet';

interface BottomSheetExerciseInfoProps {
    reps:number;
    weight:number;
}

const BottomSheetExerciseInfo:React.FC<BottomSheetExerciseInfoProps> = ({reps,weight}) => {
  return (
    <BottomSheetView style={styles.setCircle}>
      <Text style={styles.setText}>
        {reps} x {weight}kg
      </Text>
    </BottomSheetView>
  )
}

export default BottomSheetExerciseInfo

const styles = StyleSheet.create({
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
})