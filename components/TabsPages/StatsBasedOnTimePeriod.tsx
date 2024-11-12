import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import FilteredBox from "./FilteredBox";
import { StatsSummaryBasedOnFilter } from "@/constants/types";

const StatsBasedOnTimePeriod = () => {
  const [filter, setFilter] = useState<string>("Week");
  const [data, setData] = useState<StatsSummaryBasedOnFilter>({
    sessionsDone: 10,
    exercisesDone: 20,
    muscleGroups: 5,
  });

  useEffect(() => {
    // api call with filteredData
    // const dataFromTheApi  = get...
    // setData(dataFromTheApi)
  }, [filter]);
  return (
    <View className="mt-[32px] w-full">
      <View className="w-full flex-row">
        <Text className="mr-[10px] text-lg text-white font-pText">Statistics</Text>
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
        <FilteredBox title={"Sessions Done"} data={data.sessionsDone} />
        <FilteredBox title={"Exercises Done"} data={data.exercisesDone} />
        <FilteredBox title={"Muscle Groups"} data={data.muscleGroups} />
      </View>
    </View>
  );
};

export default StatsBasedOnTimePeriod;
