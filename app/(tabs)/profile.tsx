import {
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/lib/useAppwrite";
import { getUserPosts } from "@/lib/getUserPosts";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import icons from "@/constants/icons";
import InfoBox from "@/components/InfoBox";
import { signOut } from "@/lib/appwrite";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="mt-6 mb-12 px-4 w-full flex justify-center items-center ">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="flex justify-center items-center w-16 h-16 border border-secondary rounded-lg ">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length.toString() || "0"}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos were found for provided query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
