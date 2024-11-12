import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";


interface FilterButtonProps {
  title: string;
  onClick: (text: string) => void;
  isSelected: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  onClick,
  isSelected,
}) => {
  return (
    <TouchableOpacity onPress={() => onClick(title)} className="mr-[11px] rounded-lg">
      {isSelected ? (
        <LinearGradient
          colors={["#2AB38E", "#143129"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View className="rounded-md py-[7px] px-[25px] align-middle justify-center">
            <Text className="text-[12px] text-center text-white font-pText">{title}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View className="rounded-md py-[7px] px-[25px] align-middle justify-center bg-grayForStats">
          <Text className="text-[12px] text-center text-white font-pText">{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 8,
    padding: 2, 
  }
});
