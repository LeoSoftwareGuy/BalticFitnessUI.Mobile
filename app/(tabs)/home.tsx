import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { getAllPosts } from "@/lib/getPosts";
import { getLatestPosts } from "@/lib/getLatestPosts";

const Home = () => {
  const [searchingFor, setSearchingFor] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();
    setRefreshing(false);
  };

  const Search = () => {};
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="mb-6 flex-row items-start justify-between">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  JSMastery
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput value={searchingFor} handleChangeText={Search} />
            <View className="pt-1 pb-8 flex-1 w-full">
              <Text className="mb-3 text-gray-100 text-lg font-pregular">
                Latest Videos
              </Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
