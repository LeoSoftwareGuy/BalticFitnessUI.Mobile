import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

interface TrendingProps {
  posts: any;
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    ></FlatList>
  );
};

export default Trending;
