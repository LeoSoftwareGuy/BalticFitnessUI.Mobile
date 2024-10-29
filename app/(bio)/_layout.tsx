import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const BioLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="bio"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#00000" style="dark" />
    </>
  );
};

export default BioLayout;
