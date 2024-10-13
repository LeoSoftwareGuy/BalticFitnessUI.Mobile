import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";

interface SearchInputProps {
  value: string;
  handleChangeText: (e: string) => void;
  keyboardType?: string;
  placehorder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleChangeText,
  keyboardType,
  placehorder,
}) => {
  return (
    <View
      className="px-4 flex-row items-center w-full h-16 bg-black-100 border-2
       border-black-200 rounded-2xl focus:border-secondary space-x-4"
    >
      <TextInput
        className=" mt-0.5 flex-1 text-white font-pregular text-base"
        value={value}
        placeholder='Search for a video topic'
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={false}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

/* Make flex-row and then flex-1 for element which you want to take all available space */
