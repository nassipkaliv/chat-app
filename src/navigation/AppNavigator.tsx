import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import HomeScreen from '../screens/homeScreen'
import ChatScreen from '../screens/chatScreen'
import ProfileScreen from '../screens/profileScreen'

type TabName = 'Home' | 'Chat' | 'Profile'

export default function AppNavigator() {
  const [activeTab, setActiveTab] = useState<TabName>('Home')

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />
      case 'Chat':
        return <ChatScreen />
      case 'Profile':
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <View className="flex-1">
      {renderScreen()}

      <View className="flex-row bg-slate-950 h-20 border-t border-slate-800">
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={() => setActiveTab('Home')}
        >
          <Text className={activeTab === 'Home' ? 'text-blue-500 font-semibold' : 'text-gray-400'}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={() => setActiveTab('Chat')}
        >
          <Text className={activeTab === 'Chat' ? 'text-blue-500 font-semibold' : 'text-gray-400'}>
            Chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center justify-center"
          onPress={() => setActiveTab('Profile')}
        >
          <Text className={activeTab === 'Profile' ? 'text-blue-500 font-semibold' : 'text-gray-400'}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
