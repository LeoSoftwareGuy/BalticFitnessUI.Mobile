import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const todaysWorkoutLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="todaysWorkout"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#00000" style="dark" />
    </>
  );
};

export default todaysWorkoutLayout;
