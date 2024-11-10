import {
  ScrollView,
  Image,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link, Redirect, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { LinearGradient } from "expo-linear-gradient";
import FitButton from "@/components/Buttons/FItButton";
import FormField from "@/components/Fields/FormField";

export default function SignIn() {
  // const {setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = async () => {
    // Ensure all fields are filled
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      //Important for global state.
      const result = await getCurrentUser();
      // setUser(result);
      // setIsLoggedIn(true);

      // router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Account creation failed");
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
              Welcome!
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: string) => setForm({ ...form, email: e })}
              otherStyles="mt-[56px]"
              keyboardType="email-address"
              placehorder="Email"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e: string) =>
                setForm({ ...form, password: e })
              }
              otherStyles="mt-[16px]"
              keyboardType="email-password"
              placehorder="Password"
            />

            <TouchableOpacity onPress={() => router.push("/forgot")}>
              <View className="flex-row w-full justify-end">
                <Text className="pt-2 font-pRegular text-[14px] text-darkGray">
                  Forgot password?
                </Text>
              </View>
            </TouchableOpacity>

            <FitButton
              title="Sign in"
              handlePress={() => {
                router.push("/sign-in");
              }}
              containerStyles="w-full mt-[80px]"
            />

            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className="pt-[130px] font-pRegular text-[16px] text-darkGray">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 0,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});
