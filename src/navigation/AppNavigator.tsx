import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import HomeScreen from '../screens/homeScreen'
import ChatScreen from '../screens/chatScreen'
import ProfileScreen from '../screens/profileScreen'
import ContactsScreen from '../screens/contactsScreen'
import { useChatStore } from '../store/chat'

type TabName = 'Contacts' | 'Home' | 'Profile' | 'Chat'

const AppNavigator = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Home')
  const openChatInStore = useChatStore(c => c.openChat)

  const handleOpenChat = (chatId : string) => {
    openChatInStore(chatId)
    setActiveTab('Chat')
  }

  const handleCloseChat = () => {
    setActiveTab('Home')
  }

  const renderScreen = () => {
    switch(activeTab) {
      case 'Contacts':
        return ( <ContactsScreen  />)
      case 'Chat':
        return ( <ChatScreen onClose={handleCloseChat} />)
      case 'Home':
        return ( <HomeScreen onOpenChat={handleOpenChat} />)
      case 'Profile':
        return ( <ProfileScreen  />)
      default: 
        return ( <HomeScreen onOpenChat={handleOpenChat} />)
    }
  }

  return (
    <View className="flex-1 bg-tg-bg">
      {renderScreen()}

      {activeTab !== 'Chat' && (
        <View className="flex-row bg-tg-elevated h-16 border-t border-tg-border">
        {(['Contacts', 'Home', 'Profile'] as TabName[]).map(tab => (
          <TouchableOpacity key={tab} className="flex-1 items-center justify-center" onPress={() => setActiveTab(tab)}>
            <Text className={activeTab === tab ? 'text-blue-500 font-semibold' : 'text-slate-400'}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      )}
    </View>
  )
}

export default AppNavigator