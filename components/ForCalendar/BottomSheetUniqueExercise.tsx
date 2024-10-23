import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ExerciseGroupDto } from '@/app/(tabs)/bookmark'
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet'
import BottomSheetExerciseInfo from './BottomSheetExerciseInfo'

interface BottomSheetUniqueExerciseProps{
    uniqueExercise:ExerciseGroupDto
}


const BottomSheetUniqueExercise:React.FC<BottomSheetUniqueExerciseProps> = ({uniqueExercise}) => {
  return(
    <BottomSheetView style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{uniqueExercise.name}</Text>

      {/* FlatList for horizontal scrolling of exercise sets */}
      <BottomSheetFlatList
        data={uniqueExercise.exerciseSets}
        renderItem={({item})=> <BottomSheetExerciseInfo reps={item.reps} weight={item.weight} />}
        keyExtractor={(item) =>item.exercise.id }
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.setsContainer}
      />
    </BottomSheetView>)
}

export default BottomSheetUniqueExercise

const styles = StyleSheet.create({
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
})