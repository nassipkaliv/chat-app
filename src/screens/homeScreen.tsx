import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

type ChatInfoProps = {
  id: string
  title: string
  lastMessage: string
  lastTime: string
}

const myChats: ChatInfoProps[] = [
  {
    id: '1',
    title: 'Yernur Nassipkali',
    lastMessage: 'React Native qiyn',
    lastTime: '4:07PM',
  },
  {
    id: '2',
    title: 'Darkan',
    lastMessage: 'Ya lox',
    lastTime: '4:08PM',
  },
  {
    id: '3',
    title: 'Yerkin',
    lastMessage: 'congr, your salary is 500K',
    lastTime: '4:20AM',
  },
  {
    id: '4',
    title: 'Kendrik Lamar',
    lastMessage: 'backdoor',
    lastTime: '15:35PM',
  },
  {
    id: '5',
    title: 'Drake',
    lastMessage: 'ovo',
    lastTime: '6:66AM',
  },
]

const ChatInfo = ({title, lastMessage, lastTime }: ChatInfoProps) => {
  return (
    <TouchableOpacity>
      <View className="flex-row items-center px-4 py-3 border-b border-gray-900">
      <View className="w-11 h-11 rounded-full bg-slate-700 items-center justify-center mr-3">
       <Text className='text-white text-bold text-xl'>
        {title[0]}
       </Text>
      </View>

      <View className="flex-1">
        <Text className="text-white font-semibold">
          {title}
        </Text>
        <Text className="text-xs text-slate-300">
          {lastMessage}
        </Text>
      </View>
      <Text className="text-xs text-slate-400 ml-2">
        {lastTime}
      </Text>
    </View>
    </TouchableOpacity>
  )
}

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-slate-950">
      <View className="px-4 pt-12 mt-3 pb-3 flex-row items-center">
        <View className="flex-1">
          <TouchableOpacity>
            <Text className="text-blue-600 text-xl">Edit</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-2xl font-bold">Chats</Text>
            <Image
              source={require('../../assets/Telegram_Premium.png')}
              className="w-6 h-6 rounded-full"
            />
          </View>
        </View>

        <View className="flex-1 items-end">
          <View className="flex-row gap-3">
            <TouchableOpacity className="w-7 h-7 rounded-full border border-blue-500 items-center justify-center">
              <Ionicons name="add" size={18} color="#3b82f6" />
            </TouchableOpacity>
            <TouchableOpacity className="w-7 h-7 rounded-md border border-blue-500 items-center justify-center">
              <Feather name="edit" size={18} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="h-px bg-slate-800" />

      <ScrollView className="flex-1">
        {myChats.map(chat => (
          <ChatInfo
            key={chat.id}
            title={chat.title}
            lastMessage={chat.lastMessage}
            lastTime={chat.lastTime} id={''}         
             />
        ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen
