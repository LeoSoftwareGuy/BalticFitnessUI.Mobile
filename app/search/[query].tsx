import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchForPosts } from "@/lib/searchPosts";
import useAppwrite from "@/lib/useAppwrite";

const Search = () => {
  const { query } = useLocalSearchParams();

  const searchQuery = Array.isArray(query) ? query.join(", ") : query || "";
  const { data: posts, refetch } = useAppwrite(() =>
    searchForPosts(searchQuery)
  );

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-sm text-gray-100 font-pmedium">
              Search Results
            </Text>
            <Text className="text-2xl text-white font-psemibold">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={searchQuery} />
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

export default Search;
