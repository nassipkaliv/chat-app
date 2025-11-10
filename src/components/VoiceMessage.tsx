import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Audio } from 'expo-av'


type VoiceMessageProps = {
  audioUri: string
  duration: number
  isMe: boolean
}


export const VoiceMessage = ({ audioUri, duration, isMe }: VoiceMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [fileSizeKB, setFileSizeKB] = useState<number | null>(null)
  const waveformBars = Array.from({length: 40}, () => Math.floor(Math.random() * 20) + 4)
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  const playSound = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    })
    if (isPlaying && sound) {
      // Пауза
      await sound.pauseAsync()
      setIsPlaying(false)
    } else if (sound) {
      // Продолжаем воспроизведение
      await sound.playAsync()
      setIsPlaying(true)
    } else {
      // Создаем новый звук
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      )
      
      setSound(newSound)
      setIsPlaying(true)
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            setIsPlaying(false)
            setCurrentPosition(0)
            await newSound.unloadAsync()
            setSound(null)
          } else if (status.positionMillis && status.durationMillis) {
            setCurrentPosition(status.positionMillis / status.durationMillis)
          }
        }
      })
    }
  } catch (error) {
    console.error('Error playing sound:', error)
  }
}

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [sound])

  return (
    <View className="flex-row items-center gap-2 min-w-[200px] py-1">
      <TouchableOpacity
        onPress={playSound}
        className={`w-10 h-10 rounded-full items-center justify-center ${
          isMe ? 'bg-blue-500' : 'bg-gray-700'
        }`}
      >
        <Feather
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      <View className="flex-1">
        <View className="flex-row items-center h-6 gap-[2px] mb-1">
          {waveformBars.map((height, index) => {
            const isPlayed = currentPosition > (index / waveformBars.length)
            return (
              <View
                key={index}
                className={`w-[2px] rounded-[1px] ${
                  isPlayed
                    ? (isMe ? 'bg-blue-300' : 'bg-gray-600')
                    : 'bg-white/30'
                }`}
                style={{ height }}
              />
            )
          })}
        </View>

        <Text className="text-[11px] text-white/60">
          {formatDuration(isPlaying ? Math.floor(duration * currentPosition) : duration)}
          {fileSizeKB && `, ${fileSizeKB.toFixed(1)} KB`}
        </Text>
      </View>

      <TouchableOpacity className="px-1 mt-6">
        <Text className={`text-xs ${isMe ? 'text-blue-300' : 'text-gray-600'}`}>
          1x
        </Text>
      </TouchableOpacity>
    </View>
  )
}