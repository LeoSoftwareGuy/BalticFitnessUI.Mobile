import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VideoData } from "@/lib/getPosts";
import icons from "@/constants/icons";
import { ResizeMode, Video } from "expo-av";

interface VideoDataProps {
  video: VideoData;
}

const VideoCard: React.FC<VideoDataProps> = ({
  video
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex flex-row  justify-center items-center flex-1">
          <View className=" p-0.5 flex justify-center items-center w-[46px] h-[46px] rounded-lg border border-secondary ">
            <Image
              source={{ uri: video.creator?.avatar! }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="ml-3  flex flex-1 justify-center gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator?.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video.video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          // onPlaybackStatusUpdate={(status) => {
          //   if (status.didJustFinish) {
          //     setPlay(false);
          //   }
          // }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
