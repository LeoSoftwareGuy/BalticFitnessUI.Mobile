import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import FitButton from "@/components/Buttons/FItButton";
import { router } from "expo-router";
import FormField from "@/components/Fields/FormField";

const Forgot = () => {
  // const {setUser, setIsLoggedIn } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = async () => {
    if (!email) {
      Alert.alert("Error", "Please provide email address");
      return;
    }

    setIsSubmitting(true);
    try {
      //await sendEmail(email);
      //Important for global state.
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLoggedIn(true);
      // router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Email sending has failed!");
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <Text className="mt-[218px] text-emerald font-pText text-4xl font-normal">
              Forgot password!
            </Text>

            <FormField
              title="Email"
              value={email}
              handleChangeText={(e: string) => setEmail(e)}
              otherStyles="mt-[56px]"
              keyboardType="email-address"
              placehorder="Email"
            />

            <FitButton
              title="Send link"
              handlePress={() => {
                router.push("/sign-in");
              }}
              containerStyles="w-full mt-[80px]"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 0,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});

export default Forgot;
