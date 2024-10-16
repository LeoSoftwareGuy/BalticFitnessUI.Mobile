import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { VideoData } from "@/lib/getLatestPosts";
import { CustomAnimation } from "react-native-animatable";
import icons from "@/constants/icons";
import { ResizeMode, Video } from "expo-av";

interface TrendingProps {
  posts: VideoData[];
}

interface TrendingItemProps {
  activeItem: string;
  item: VideoData;
}

const zoomIn: CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut: CustomAnimation = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
       
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
   if (!posts || posts.length === 0) {
    return <Text>No posts available</Text>; 
  }
  const [activeItem, setActiveItem] = useState(posts[0].$id);

  //This is done so that when we scoll to the right, the element closest to our view is zoomed In
  // As we scroll away from the compoenent it becomes zoomed out
  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
