import { ScrollView, Image, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = () => {
    // Cal to The API,
    // We also need to save the responce (access token)
    // Save this access token to zustand local storage and use with each request
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-6 px-4 w-full h-full justify-center">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="mt-10 text-2xl text-semibold text-white font-semibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="email-password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={Submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="pt-5 flex-row justify-center gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg text-secondary font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
