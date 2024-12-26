import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FilterButton from "./FilterButton";
import FilteredBox from "./FilteredBox";
import usePerformanceStats from "@/hooks/usePerformanceStats";

const StatsBasedOnTimePeriod = () => {
  const [filter, setFilter] = useState<"Week" | "Month" | "All">("Week");

  const { data: stats, error, isLoading } = usePerformanceStats(filter);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>
          Failed to load data. Please try again.
        </Text>
      </View>
    );
  }

  let sessionsCount = stats?.sessionsCount || 0;
  let exercisesCount = stats?.exercisesCount || 0;
  let muscleGroupsCount = stats?.muscleGroupsCount || 0;

  return (
    <View className="mt-[32px] w-full">
      <View className="w-full flex-row">
        <Text className="mr-[10px] text-lg text-white font-pText">
          Statistics
        </Text>
        <View className="flex-1 flex-row">
          <FilterButton
            title={"Week"}
            onClick={() => setFilter("Week")}
            isSelected={filter === "Week"}
          />
          <FilterButton
            title={"Month"}
            onClick={() => setFilter("Month")}
            isSelected={filter === "Month"}
          />
          <FilterButton
            title={"All"}
            onClick={() => setFilter("All")}
            isSelected={filter === "All"}
          />
        </View>
      </View>

      <View className="mt-[20px] w-full flex-row">
        <FilteredBox title={"Sessions Done"} data={sessionsCount} />
        <FilteredBox title={"Exercises Done"} data={exercisesCount} />
        <FilteredBox title={"Muscle Groups"} data={muscleGroupsCount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default StatsBasedOnTimePeriod;
