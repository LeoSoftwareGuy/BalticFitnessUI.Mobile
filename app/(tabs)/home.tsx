import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import React, { useCallback  } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import MusclesListComponent from "@/components/MuscleGroups/MusclesListComponent";
import { DateSlider } from "@/components/DateSlider";
import { format } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";
import useMuscleGroups from "@/hooks/useMuscleGroups";
import { Cookies } from '@react-native-cookies/cookies';

const home = () => {
  const today = new Date();

  const getDaySuffix = useCallback((day: number) => {
    if (day === 1 || day === 21 || day === 31) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
  }, []);

  const { data: muscleGroups = [], error } = useMuscleGroups();
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
            {format(today, `d'${getDaySuffix(today.getDate())}' 'of' MMMM`)}
          </Text>
          <DateSlider />

          {error ? (
            <View>
              <Text>Something happened! Please refresh the page</Text>
            </View>
          ) : muscleGroups.length === 0 ? (
            <View>
              <Text className="text-white text-center">No muscle groups available.</Text>
            </View>
          ) : (
            <>
              <MusclesListComponent muscleGroups={muscleGroups} type="Upper" />
              <MusclesListComponent muscleGroups={muscleGroups} type="Lower" />
              <MusclesListComponent muscleGroups={muscleGroups} type="Cardio" />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default home;

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
