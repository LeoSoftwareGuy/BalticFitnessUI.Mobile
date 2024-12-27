import {
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { icons, images } from "@/constants";
import CookieManager from "@react-native-cookies/cookies";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import StatsBasedOnTimePeriod from "../../components/TabsPages/StatsBasedOnTimePeriod";
import EachMuscleGroupTrainingHistory from "@/components/TabsPages/EachMuscleGroupTrainingHistory";

const statistics = () => {
    // CookieManager.clearAll();
  return (
    <ImageBackground source={images.logo} style={styles.background}>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <ScrollView className="my-0  w-full">
          <View className="px-[7px] w-full flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.push("/calendar")}>
              <Image
                source={icons.calendar}
                resizeMode="contain"
                className="mt-5 mx-auto"
              />
            </TouchableOpacity>

            <View className="flex-row items-center space-x-1">
              <TouchableOpacity onPress={() => router.push("/todaysWorkout")}>
                <Image
                  source={icons.dumbel}
                  resizeMode="contain"
                  className="mt-5 mx-auto"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/calendar")}>
                <Image
                  source={icons.bio}
                  resizeMode="contain"
                  className="mt-5 mx-auto"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-center font-pText text-xl text-white">
            Analyze your workout
          </Text>
          <StatsBasedOnTimePeriod />
          <EachMuscleGroupTrainingHistory />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default statistics;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  container: {},
});
