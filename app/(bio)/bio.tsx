import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { LinearGradient } from "expo-linear-gradient";
import FitButton from "@/components/Buttons/FItButton";
import CountrySelect, {
  CountrySelectValue,
} from "@/app/(bio)/components/CountrySelect";
import AgeSelect from "@/app/(bio)/components/AgeSelect";
import GenderSelect from "@/app/(bio)/components/GenderSelect";

interface FormState {
  whereAreYouFrom: CountrySelectValue | null;
  age: string;
  gender: string;
}

export default function Bio() {
  // const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState<FormState>({
    whereAreYouFrom: null,
    age: "", // convert to int upon sending
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = async () => {
    // Ensure all fields are filled
    // if (!form.whereAreYouFrom || !form.age || !form.gender) {
    //   Alert.alert("Error", "Please fill in all fields");
    //   return;
    // }

    setIsSubmitting(true);
    try {
      // const result = await createUser({
      //   email: form.email,
      //   password: form.password,
      //   username: form.name,
      // });

      // Redirect to home page upon successful sign-up
      // setUser(result);
      // setIsLoggedIn(true);
      router.push("/onBoardingPage");
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
            <View className="w-full">
              <Text className="mt-[150px] text-center text-emerald font-pText text-4xl font-normal">
                Create account
              </Text>
            </View>

            <AgeSelect
              age={form.age}
              onAgeChange={(e: string) => setForm({ ...form, age: e })}
            />

            <GenderSelect
              selectedGender={form.gender}
              onGenderChange={(e: string) => setForm({ ...form, gender: e })}
            />

            <CountrySelect
              onChange={(e: CountrySelectValue) =>
                setForm({ ...form, whereAreYouFrom: e })
              }
              value={form.whereAreYouFrom}
            />

            <FitButton
              title="Update Bio"
              handlePress={() => Submit()}
              containerStyles="w-full mt-[80px]"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  headerWrapper: {
    marginVertical: 0,
    alignItems: "flex-start",
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
});
