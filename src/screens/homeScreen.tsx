import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

type Chat = {
  id: string
  title: string
  lastMessage: string
  lastTime: string
  unread: number
  ticked: boolean
}

const myChats: Chat[] = [
  {
    id: '1',
    title: 'Yernur Nassipkali',
    lastMessage: 'React Native',
    lastTime: '4:07PM',
    unread: 2,
    ticked: false,
  },
  {
    id: '2',
    title: 'Darkan',
    lastMessage: 'Ya lox',
    lastTime: '4:08PM',
    unread: 0,
    ticked: true,
  },
  {
    id: '3',
    title: 'Yerkin',
    lastMessage: 'congr, your salary is 500K',
    lastTime: '4:20AM',
    unread: 2,
    ticked: false,
  },
  {
    id: '4',
    title: 'Kendrik Lamar',
    lastMessage: 'backdoor',
    lastTime: '15:35PM',
    unread: 1,
    ticked: false,
  },
  {
    id: '5',
    title: 'Drake',
    lastMessage: 'ovo',
    lastTime: '6:66AM',
    unread: 0,
    ticked: true,
  },
  {
    id: '6',
    title: 'Oraz',
    lastMessage: 'menin bittarym huynya',
    lastTime: '16:33',
    unread: 0,
    ticked: true,
  },
]

type ChatInfoProps = {
  title: string
  lastMessage: string
  lastTime: string
  unread: number
  ticked: boolean
}

const ChatInfo = ({ title, lastMessage, lastTime, unread, ticked }: ChatInfoProps) => {
  return (
    <TouchableOpacity>
      <View className="flex-row items-center px-4 py-3 border-b border-gray-900">
        <View className="w-11 h-11 rounded-full bg-slate-700 items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">
            {title[0]?.toUpperCase()}
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
        <View className="flex-col items-end gap-1">
          <View className="flex-row items-center gap-1">
            {ticked && (
              <Ionicons
                name={ticked ? 'checkmark-done' : 'checkmark'}
                size={14}
                color={ticked ? '#037ee5' : '#037ee5'}
              />

            )}
            <Text className="text-xs text-slate-400">
              {lastTime}
            </Text>
          </View>

          {unread > 0 && (
            <View className="self-end min-w-[20px] h-4 rounded-full bg-gray-500 items-center justify-center px-1">
              <Text className="text-[10px] text-white font-semibold">
                {unread}
              </Text>
            </View>
          )}
        </View>
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

      <View className="flex-1">
        {myChats.map(chat => (
          <ChatInfo
            key={chat.id}
            title={chat.title}
            lastMessage={chat.lastMessage}
            lastTime={chat.lastTime}
            unread={chat.unread}
            ticked={chat.ticked}
          />
        ))}
      </View>
    </View>
  )
}

export default HomeScreen
