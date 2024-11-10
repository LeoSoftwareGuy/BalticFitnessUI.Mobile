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
import FormField from "@/components/FormField";
import { router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { LinearGradient } from "expo-linear-gradient";
import FitButton from "@/components/Buttons/FItButton";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/SelectComponents/CountrySelect";
import AgeSelect from "@/components/SelectComponents/AgeSelect";
import GenderSelect from "@/components/SelectComponents/GenderSelect";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  whereAreYouFrom: CountrySelectValue | null;
  age: string;
  gender: string;
}

const SignUp = () => {
  // const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    whereAreYouFrom: null,
    age: "", // convert to int upon sending
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = async () => {
    // Ensure all fields are filled
    // if (!form.name || !form.email || !form.password) {
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
      router.push("/bio");
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
            <Text className="mt-[160px] text-emerald font-pText text-4xl font-normal">
              Create account
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: string) => setForm({ ...form, email: e })}
              otherStyles="mt-[36px]"
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

            <FormField
              title="Confirm password"
              value={form.confirmPassword}
              handleChangeText={(e: string) =>
                setForm({ ...form, confirmPassword: e })
              }
              otherStyles="mt-[16px]"
              keyboardType="email-password"
              placehorder="Confirm password"
            />

            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e: string) => setForm({ ...form, name: e })}
              otherStyles="mt-[16px]"
              keyboardType=""
              placehorder="Name"
            />

            <FitButton
              title="Register"
              handlePress={() => Submit()}
              containerStyles="w-full mt-[48px]"
            />

            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="pt-[130px] font-pRegular text-[16px] text-darkGray">
                Already have an account?
              </Text>
            </TouchableOpacity>
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

export default SignUp;
