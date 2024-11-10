import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ExerciseParameters } from "./BottomSheetSaveExerciseComponent";
import { Picker } from "@react-native-picker/picker";

interface ExerciseParametersPickerProps {
  parameters: ExerciseParameters;
  onChange: (params: Partial<ExerciseParameters>) => void;
}

const ExerciseParametersPicker: React.FC<ExerciseParametersPickerProps> = ({
  onChange,
  parameters,
}) => {
  const repsItems = Array.from({ length: 100 }, (_, i) => i + 1); // Array from 1 to 100
  const setsItems = Array.from({ length: 30 }, (_, i) => i + 1);
  const weightsItems = [
    "BodyWeight",
    ...Array.from({ length: 1000 }, (_, i) => (i + 1).toString()),
  ];

  return (
    <View className="mt-[24px] w-full">
      <View className="pb-[18px] flex-row justify-around">
        <Text className="font-pRegular text-[16px] text-mediumGray">Reps</Text>
        <Text className="font-pRegular text-[16px] text-mediumGray">Sets</Text>
        <Text className="font-pRegular text-[16px] text-mediumGray">
          Weight
        </Text>
      </View>
      <View style={styles.pickerRow}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={parameters.Reps}
            onValueChange={(value) => onChange({ Reps: value })}
            style={styles.pickerItem}
          >
            {repsItems.map((rep) => (
              <Picker.Item
                key={rep}
                label={`${rep}`}
                value={rep}
                color="white"
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={parameters.Sets}
            onValueChange={(value) => onChange({ Sets: value })}
            style={styles.pickerItem}
          >
            {setsItems.map((set) => (
              <Picker.Item
                key={set}
                label={`${set}`}
                value={set}
                color="white"
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={parameters.Weight}
            onValueChange={(value) => onChange({ Weight: value })}
            style={styles.pickerItem}
          >
            {weightsItems.map((weight) => (
              <Picker.Item
                key={weight}
                label={weight}
                value={weight}
                color="white"
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default ExerciseParametersPicker;

const styles = StyleSheet.create({
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#05231B",
    borderRadius: 8,
  },
  pickerContainer: {
    width: "30%",
    height: 200,
  },
  pickerItem: {
    fontSize: 1,
    color: "white",
  },
});
