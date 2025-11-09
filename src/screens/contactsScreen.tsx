import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'


type ContactsProps = 
  {
    id: string
    title: string
    status: string
  }


const myContacts: ContactsProps[] = [
{
  id: '1',
  title: 'Yernur Nassipkali',
  status: 'online'
},
{
  id: '2',
  title: 'Kendrik Lamar',
  status: 'last seen recently'
},
{
  id: '3',
  title: 'Drake',
  status: 'last seen just now'
},
{
  id: '4',
  title: 'Frank Ocean',
  status: 'last seen long time ago'
},
{
  id: '5',
  title: 'Darkhan',
  status: 'last seen 6 minutes ago'
},
]

const ContactRow = ({title, status}: ContactsProps) => {

  const isStatus = status.toLocaleLowerCase().includes('online')

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
           <Text
            className={`text-xs ${
              isStatus ? 'text-blue-400' : 'text-slate-400'
            }`}
            numberOfLines={1}
          >
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const ContactsScreen = () => {
  return (
    <View className="flex-1 bg-tg-bg">
      <View className="px-4 pt-12 mt-3 pb-3 flex-row items-center bg-tg-elevated">
        <View className="flex-1">
          <TouchableOpacity>
            <Text className="text-blue-600 text-xl">Sort</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-2xl font-bold">Contacts</Text>
          </View>
        </View>

        <View className="flex-1 items-end">
          <TouchableOpacity className="flex-row gap-3">
            <Ionicons name="add" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView>
        <View className="px-4 pt-3 pb-2 bg-tg-elevated">
          <View className="flex-row items-center justify-center bg-tg-bg rounded-xl px-3 py-2">
            <Ionicons name="search" className='ml-1' size={18} color="#6b7280" />
            <TextInput
              className="ml-4 flex-1 text-white"
              placeholder="Search"
              placeholderTextColor="#6b7280"
            />
          </View>
        </View>

        <View className="pt-3 px-6 border-b">
          <TouchableOpacity className="flex-row gap-4 items-center">
            <Ionicons name='location-sharp' size={24} color="#3b82f6" />
            <Text className='text-blue-500 font-semibold'>Add Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row gap-4 items-center mt-4">
            <Ionicons name='person-add-sharp' size={24} color="#3b82f6" />
            <Text className='text-blue-500 font-semibold'>Invite Friends</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 mt-1">
          {myContacts.map(contact => (
            <ContactRow 
              key={contact.id}
              title={contact.title}
              status={contact.status}
              id={""}
            />
          ))}
        </View>

      </ScrollView>

    </View>
  )
}

export default ContactsScreen
