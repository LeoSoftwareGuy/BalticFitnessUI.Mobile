import {
  ScrollView,
  Image,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FitButton from "@/components/Buttons/FItButton";
import FormField from "@/components/Fields/FormField";
import APIClient from "@/api/api-client";
import useAuthStore from "@/hooks/stores/useAuthStore";

interface FormState {
  email: string;
  password: string;
}

export default function SignIn() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authStore = useAuthStore((s) => s.setAccessToken);
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace("/home");
    }
  }, [accessToken]);

  const Submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiClient = new APIClient<FormState>("/Auth/login");
      const accessToken = await apiClient.register({
        ...form,
      });

      authStore(accessToken);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Account creation failed");
    } finally {
      setIsSubmitting(false);
      setForm({
        email: "",
        password: "",
      });
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
              handlePress={Submit}
              isLoading={isSubmitting}
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
