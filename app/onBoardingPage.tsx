import { SafeAreaView, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "@/constants";
import OnBoardingComponent from "@/components/OnBoarding/OnBoardingComponent";
import { router } from "expo-router";

export default function onBoardingPage() {
  return (
    <LinearGradient
      colors={["#3F3F3F", "#151515"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      locations={[0, 0.35]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={images.FitTrack}
          resizeMode="contain"
          className="mt-5 mx-auto"
        />
        <OnBoardingComponent />
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Text className="pt-[10px] pb-[55px] font-pRegular text-[16px] text-center text-darkGray">
            Skip
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
