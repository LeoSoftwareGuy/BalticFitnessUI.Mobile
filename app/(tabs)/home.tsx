import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import MusclesListComponent from "@/components/MuscleGroups/MusclesListComponent";

const home = () => {
  return (
    <ImageBackground source={images.logo} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View className="my-0 py-0 px -10 w-full">
          <View className="w-full flex-row justify-between align-middle">
            <TouchableOpacity onPress={() => router.push("/calendar")}>
              <Image
                source={icons.calendar}
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
     
          <MusclesListComponent type="Upper" />
          <MusclesListComponent type="Lower" />
          <MusclesListComponent type="Cardio" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});
