import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useCountries from "@/hooks/useCountries";
import { Picker } from "@react-native-picker/picker";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue | null;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  const countries = getAll();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Country:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value?.value}
          onValueChange={(itemValue) => {
            const selectedCountry = countries.find(
              (country) => country.value === itemValue
            );
            if (selectedCountry) {
              onChange(selectedCountry);
            }
          }}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {countries.map((country) => (
            <Picker.Item
              key={country.value}
              label={`${country.flag} ${country.label}`}
              value={country.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 100,
    alignItems: "center",
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  pickerContainer: {
    width: "100%",
    borderRadius: 8,
    // Ensures background doesn't overflow
    //  backgroundColor: "#767676", // Gray background color
  },
  picker: {
    height: 100,
    color: "white",
  },
  pickerItem: {
    textAlign: "left", // Aligns flags to the left within each item
    color: "white",
  },
});

export default CountrySelect;
