import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface GenderSelectProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  return (
    <View className="mt-2 w-full">
      <Text className="mb-[8px] text-[16px] text-white">Gender</Text>
      <View className="flex-row justify-between">
        <TouchableOpacity
          className={`px-[12px] py-[12px] items-center rounded-[20px] bg-gray
        ${selectedGender === "Male" && "bg-emerald"}`}
          onPress={() => onGenderChange("Male")}
        >
          <Text className="text-white text-[16px]">Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-[12px] py-[12px] items-center rounded-[20px] bg-gray
            ${selectedGender === "Female" && "bg-emerald"}`}
          onPress={() => onGenderChange("Female")}
        >
          <Text className="text-white text-[16px]">Female</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GenderSelect;
