import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import OnBoardingComponent from "@/components/OnBoarding/OnBoarding";

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
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View style={styles.headerWrapper}>
            <Image
              source={images.FitTrack}
              resizeMode="contain"
              className="mt-5 mx-auto"
            />
            <OnBoardingComponent />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#000000" style="dark" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 0,
    alignItems: "flex-start",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});
