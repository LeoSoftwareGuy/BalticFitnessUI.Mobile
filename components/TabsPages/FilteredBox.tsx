import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface FilteredBoxProps {
  title: string;
  data: number;
}

const FilteredBox: React.FC<FilteredBoxProps> = ({ title, data }) => {
  return (
    <LinearGradient
      colors={["rgba(107, 107, 107, 0.1)", "rgba(107, 107, 107, 0.6)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="mr-[16px] rounded-lg"
    >
      <View className="w-[110px] h-[87px]">
        <Text className=" text-white font-pText text-center text-[45px] ">
          {data}
        </Text>
        <Text className="py-[6px] text-center text-[12px] text-white font-pText ">
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default FilteredBox;

const styles = StyleSheet.create({});
