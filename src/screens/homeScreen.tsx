import React from 'react'
import { View, Text, ScrollView, Button, TouchableOpacity, Image } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'


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
      </View>

  )
}

export default HomeScreen
