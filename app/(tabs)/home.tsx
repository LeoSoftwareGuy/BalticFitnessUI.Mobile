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
import {getAllPosts} from '../../lib/getPosts'

export interface VideoData {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: string | null; 
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}



const Home = () => {
  const [searchingFor, setSearchingFor] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
   const fetchData = async () => {
      setIsLoading(true);
      try {
       const response = await getAllPosts();
      setData(response);
     } catch (error:any) {
      Alert.alert("Error", error.message);
     } finally {
        setIsLoading(false);
      }
    };
    fetchData(); // we cant just do await getAllPosts();, because we cant call async methods in useEffect, we need to declare them inside.
    console.log(data);
 }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    // recall videos api to get latest results
    setRefreshing(false);
  };

  const Search = () => {};
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
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
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
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
