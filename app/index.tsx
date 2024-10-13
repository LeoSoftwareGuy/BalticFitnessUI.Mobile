import { Text, View, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "./../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn){
    return <Redirect href="/home" />;
  } 
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="px-4 w-full min-h-[85vh] justify-center items-center">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-center font-bold text-white">
              Discover Endless Possibilitites with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="mt-7 text-center text-sm text-gray-100 font-pregular">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="mt-7 w-full"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

{
  /* StatusBar is for the very top panel with time and battery of the phone */
  /* <Link href='/(tabs)/home' className="text-blue-600">Go to Home</Link> */
}
