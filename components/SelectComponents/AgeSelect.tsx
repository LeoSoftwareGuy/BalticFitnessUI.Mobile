import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface AgeSelectProps {
  age: string;
  onAgeChange: (age: string) => void;
}

const AgeSelect: React.FC<AgeSelectProps> = ({ age, onAgeChange }) => {
  const handleAgeInput = (input: string) => {
    // Allow only numbers or empty string
    if (
      /^\d*$/.test(input) &&
      (input === "" || (parseInt(input, 10) >= 1 && parseInt(input, 10) <= 200))
    ) {
      onAgeChange(input);
    }
  };

  const incrementAge = useCallback(() => {
    const ageNumber = age === "" ? 0 : parseInt(age, 10);
    if (ageNumber < 200) {
      onAgeChange((ageNumber + 1).toString());
    }
  }, [age]);

  const decrementAge = useCallback(() => {
    const ageNumber = age === "" ? 1 : parseInt(age, 10);
    if (ageNumber > 1) {
      onAgeChange((ageNumber - 1).toString());
    }
  },[age]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Age</Text>
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={decrementAge} style={styles.arrowButton}>
          <Text style={styles.arrowText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={age}
          keyboardType="numeric"
          placeholder="Enter Age"
          placeholderTextColor="white"
          onChangeText={handleAgeInput}
        />
        <TouchableOpacity onPress={incrementAge} style={styles.arrowButton}>
          <Text style={styles.arrowText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#767676",
    borderRadius: 8,
  },
  arrowButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  arrowText: {
    fontSize: 18,
    color: "white",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});

export default AgeSelect;
