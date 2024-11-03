import {
    addDays,
    eachDayOfInterval,
    eachWeekOfInterval,
    format,
    startOfWeek,
  } from "date-fns";
  import React from "react";
  import { View, StyleSheet, Text } from "react-native";
  import PagerView from "react-native-pager-view";
  
  const today = new Date();
  
  const dates = eachWeekOfInterval(
    {
      start: startOfWeek(today, { weekStartsOn: 1 }), // Start from the beginning of this week
      end: addDays(today, 14), // Extend 14 days ahead from today
    },
    {
      weekStartsOn: 1,
    }
  ).reduce((acc: Date[][], current) => {
    const allDays = eachDayOfInterval({
      start: current,
      end: addDays(current, 6), // Display all 7 days in the current week interval
    });
  
    acc.push(allDays);
    return acc;
  }, []);
  
  export const DateSlider = () => {
    return (
      <PagerView style={styles.container}>
        {dates.map((week, index) => (
          <View key={index}>
            <View style={styles.row}>
              {week.map((day) => {
                const isToday = day.toDateString() === today.toDateString();
                const txt = format(day, "EEE");
                return (
                  <View key={day.toISOString()} style={styles.day}>
                    <Text className={`text-gray font-pText text-[13px] uppercase ${isToday && `text-white`}`}>
                      {txt}
                    </Text>
                    <Text className={`text-gray font-pText text-xl ${isToday && `text-white`}`}>
                      {day.getDate()}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </PagerView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: "transparent",
      minHeight: 80,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    day: {
      alignItems: "center",
    }
  });
  