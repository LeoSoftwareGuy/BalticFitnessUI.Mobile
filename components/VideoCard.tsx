import { View, Text } from 'react-native'
import React from 'react'
import { VideoData } from '@/lib/getPosts'


interface VideoDataProps {
    video: VideoData
}


const VideoCard:React.FC<VideoDataProps> = ({video}) => {
  return (
    <View>
      <Text>VideoCard</Text>
    </View>
  )
}

export default VideoCard