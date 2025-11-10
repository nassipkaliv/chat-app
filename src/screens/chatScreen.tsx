import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ImageBackground,
} from 'react-native'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useChatStore } from '../store/chat'
import { useVoice } from '../hooks/useVoice'
import { VoiceMessage } from '../components/VoiceMessage'
import { useVideo } from '../hooks/useVideo'
import { VideoMessage } from '../components/VideoMessage'
import { CameraView } from 'expo-camera'

type ChatScreenProps = {
  onClose?: () => void
}

const ChatScreen = ({ onClose }: ChatScreenProps) => {
  const activeChatId = useChatStore(state => state.activeChatId)
  const messages = useChatStore(state => state.messages)
  const chats = useChatStore(state => state.chats)
  const sendMessage = useChatStore(state => state.sendMessage)
  const sendVoiceMessage = useChatStore(state => state.sendVoiceMessage)
  const sendVideoMessage = useChatStore(state => state.sendVideoMessage)
  const [text, setText] = useState('')
  const [recordMode, setRecordMode] = useState<'voice' | 'video'>('voice')
  if(!activeChatId) {
    return (
      <Text className="text-white text-center">No chat</Text>
    )
  }
  
  const chat = chats.find(state=> state.id == activeChatId)
  const chatMessages = messages.filter(state => state.chatId === activeChatId)

  const handleSend = () => {
    const trimmed = text.trim()
    if(!trimmed) return
    sendMessage(activeChatId, trimmed)
    setText('')
  }
  const {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
    cancelRecording
  } = useVoice()
  const handleVoiceMessage = async () => {
    if(!activeChatId) return
    const result = await stopRecording()

    if(result && result.uri) {
      sendVoiceMessage(activeChatId, result.uri, result.duration)
    }
  }
  const {
    isRecording: isRecordingVideo,
    recordingDuration: videoRecordingDuration,
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    cancelRecording: cancelVideoRecording,
    resetVideoUri,
    onCameraReady,
    cameraRef,
    permission: useCameraPermissions,
  } = useVideo()
  const handleVideoMessage = async () => {
    if (!activeChatId) return
    const result = await stopVideoRecording()

    if (result && result.uri) {
      sendVideoMessage(activeChatId, result.uri, result.duration)
      resetVideoUri()
    }
  }

  const handleLongPress = () => {
    if(recordMode === 'voice') {
      startRecording()
    } else {
      startVideoRecording()
    }
  }
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleRecordMode = () => {
    setRecordMode(prev => prev === 'voice' ? 'video' : 'voice')
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-tg-bg"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View className="flex-1 bg-tg-bg">
        <View className="px-4 pt-12 pb-2 flex-row items-center bg-tg-elevated">
          <View className="flex-1">
            <TouchableOpacity onPress={onClose} className="w-9 h-9 rounded-full items-center justify-center">
              <FontAwesome name="angle-left" size={24} color="#3b82f6" />
            </TouchableOpacity>
          </View>


          <TouchableOpacity className="flex-1 items-center">
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-lg font-semibold">
                {chat?.title ?? 'Chat'}
              </Text>
              <Image
                source={require('../../assets/Telegram_Premium.png')}
                className="w-5 h-5 rounded-full"
              />
            </View>
            <Text className="text-xs text-slate-400">
              last seen recently
            </Text>
          </TouchableOpacity>

          <View className="flex-1 flex-row justify-end gap-3">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-slate-700 items-center justify-center">
              <Text className="text-white font-bold text-lg">
                {chat?.title[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageBackground source={require("../../assets/chatbg.png")} className="flex-1" resizeMode='cover' imageStyle={{ opacity: 0.2 }}>
          <ScrollView className="flex-1 px-3 py-2">
            {chatMessages.map(msg => {
              const isMe = msg.author === 'me'

              return (
                <View key={msg.id} className={`mb-2 flex-row ${isMe ? 'justify-end': 'justify-start'}`}>
                  {msg.type === 'video' && msg.videoUri ? (
                    <View className="items-end">
                      <VideoMessage
                        videoUri={msg.videoUri}
                        duration={msg.duration || 0}
                        isMe={isMe}
                      />
                      <View className="flex-row items-center gap-1 mt-1">
                        <Text className="text-[10px] text-slate-400">
                          {msg.time}
                        </Text>
                        {isMe && (
                          <Ionicons
                            name={msg.isRead ? 'checkmark-done' : 'checkmark'}
                            size={12}
                            color="#fff"
                          />
                        )}
                      </View>
                    </View>
                  ) : (
                    <View className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                      isMe ? 'bg-blue-500 rounded-br-sm' : 'bg-tg-elevated rouned-bl-sm'
                    }`}>
                      {msg.type === 'voice' && msg.audioUri ? (
                        <VoiceMessage
                          audioUri={msg.audioUri}
                          duration={msg.duration || 0}
                          isMe={isMe}
                        />
                      ) : (
                        <Text className="text-white">{msg.text}</Text>
                      )}

                      <View className="flex-row items-center justify-end gap-1 mt-1">
                        <Text className="text-[10px] text-slate-300">
                          {msg.time}
                        </Text>
                        {isMe && (
                          <Ionicons
                            name={msg.isRead ? 'checkmark-done' : 'checkmark'}
                            size={12}
                            color="#fff"
                          />
                        )}
                      </View>
                    </View>
                  )}
                </View>
              )
            })}
          </ScrollView>
        </ImageBackground>

        <View className="mt-auto px-3 pb-8 pt-2">
          {isRecording || isRecordingVideo ? (
            <View className="flex-row items-center gap-2 bg-tg-elevated rounded-2xl px-4 py-3">
              {isRecordingVideo ? (
                <>
                  <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 mr-2">
                    <CameraView
                      ref={cameraRef}
                      facing="front"
                      mode="video"
                      style={{ width: 128, height: 128 }}
                      onCameraReady={onCameraReady}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-lg font-semibold mb-1">Video Message</Text>
                    <View className="flex-row items-center gap-2">
                      <View className="w-3 h-3 rounded-full bg-red-500" />
                      <Text className="text-white">
                        {formatDuration(videoRecordingDuration)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2">
                    <TouchableOpacity onPress={cancelVideoRecording}>
                      <Feather name="x" size={24} color="#ef4444" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleVideoMessage} className="h-10 w-10 rounded-full bg-blue-500 items-center justify-center">
                      <Feather name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={cancelRecording}>
                    <Feather name="x" size={24} color="#ef4444" />
                  </TouchableOpacity>
                  
                  <View className="flex-1 flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-red-500" />
                    <Text className="text-white text-lg">
                      {formatDuration(recordingDuration)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={handleVoiceMessage} className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center">
                    <Feather name="send" size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ): (
            <View className="flex-row items-end gap-2">
              <TouchableOpacity className="w-9 h-9 rounded-full bg-tg-elevated items-center justify-center">
            <Feather name="paperclip" size={18} color="#7f7f7f" />
          </TouchableOpacity>

          <TextInput
            className="flex-1 max-h-24 bg-tg-elevated text-white rounded-2xl px-3 py-2"
            placeholder="Message"
            placeholderTextColor="#636366"
            value={text}
            onChangeText={setText}
            multiline
          />

          <TouchableOpacity className="w-9 h-9 rounded-full bg-tg-elevated items-center justify-center"
          onPress={text.trim() ? handleSend : toggleRecordMode}
          onLongPress={text.trim() ? undefined : handleLongPress}
          disabled={isRecording}
          >
            <Feather name={text.trim() ? 'send' : (recordMode === 'voice' ? 'mic' : 'video')} size={18} color="#7f7f7f" />
          </TouchableOpacity>
            </View>
          )}
          
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen
