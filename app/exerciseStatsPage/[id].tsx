import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
import StoredExerciseInfo from "../(todaysWorkout)/components/StoredExerciseInfo";
import { largeExerciseImages } from "@/constants/muscleGroupImages";
import useExerciseHistory from "@/hooks/useExerciseHistory";

const ExerciseStatsPage = () => {
  const { id } = useLocalSearchParams();
  const exerciseId = Array.isArray(id) ? id.join(", ") : id || "";
  const {
    data: exerciseHistory,
    isLoading,
    error,
  } = useExerciseHistory(exerciseId);

  const selectedExerciseSets = exerciseHistory
    ? Object.values(exerciseHistory.exerciseHistory).flat()
    : [];

    
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading Exercise History...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load exercise data.</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={images.logo} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="py-[40px] pb-[10px] flex-row align-middle">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              resizeMode="contain"
              style={{ width: 24, height: 24, tintColor: "black" }}
            />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-pText text-xl text-white">
            {exerciseHistory?.exerciseName || "Exercise Stats"}
          </Text>
        </View>

        {selectedExerciseSets.length > 0 ? (
          <Image
            source={
              largeExerciseImages[
              selectedExerciseSets[0].exerciseId ]
            }
            resizeMode="contain"
            className="my-[36px] w-[full] h-[192px] rounded-lg"
          />
        ) : (
          <Text className="text-center text-lg text-white">
            No records found.
          </Text>
        )}

        <Text className="font-pText text-xl text-white">Last 3 months</Text>
        <FlatList
          data={Object.entries(exerciseHistory?.exerciseHistory || {})}
          renderItem={({ item }) => (
            <StoredExerciseInfo
              uniqueExercise={item[1]}
              exerciseInfo={item[0].slice(0, 10)} 
            />
          )}
          keyExtractor={(item) => item[0]}
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ExerciseStatsPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
