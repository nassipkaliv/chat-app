import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";

type VideoMessageProps = {
  videoUri: string
  duration: number
  isMe: boolean
}

export const VideoMessage = ({ videoUri, duration, isMe}: VideoMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [video, setVideo] = useState<Video | null>(null)

  useEffect(() => {
    return () => {
      if (video) {
        video.unloadAsync()
      }
      setVideo(null)
      setIsPlaying(false)
    }
  }, [videoUri])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = async () => {
    if(video) {
      if(isPlaying) {
        await video.pauseAsync()
        setIsPlaying(false)
      } else {
        await video.playAsync()
        setIsPlaying(true)
      }
    }
  }
  return (
    <TouchableOpacity
      onPress={togglePlay}
      className="relative"
      activeOpacity={0.9}
    >
      <View
        className="w-36 h-36 rounded-full overflow-hidden bg-gray-900"
        style={{ borderRadius: 72 }}
      >
        <Video
          key={videoUri}
          ref={(ref) => setVideo(ref)}
          source={{ uri: videoUri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={async (status) => {
            if (status.isLoaded && status.didJustFinish) {
              setIsPlaying(false)
              if (video) {
                await video.setPositionAsync(0)
              }
            }
          }}
        />
      </View>

      <View
        className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        <Text className="text-white text-xs">
          {formatDuration(duration)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}