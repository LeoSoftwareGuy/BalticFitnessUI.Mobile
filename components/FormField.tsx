import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyboardType?: string;
  placehorder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placehorder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className="px-4 flex-row items-center w-full h-16 bg-black-100 border-2
       border-black-200 rounded-2xl focus:border-secondary"
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placehorder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

/* Make flex-row and then flex-1 for element which you want to take all available space */