import { Text, View, ScrollView, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "./../constants";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FitButton from "@/components/Buttons/FItButton";

export default function App() {
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
              className="mt-5"
            />
            <Text className="mt-[24px] font-pText text-xl font-normal text-white">
              Track Progress.{" "}
            </Text>
            <Text className="mb-[56px] font-pText text-xl font-normal text-white">
                Crush Goals.
              </Text>
            <FitButton
              title="Get Started"
              handlePress={() => {
                router.push("/sign-in");
              }}
              containerStyles="w-full"
            />
            <Image
              source={images.zyzz}
              resizeMode="contain"
              className="min-h-[400px]"
            />
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
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});
