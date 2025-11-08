import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-slate-950">
      <View className="px-4 pt-12 pb-3 flex-row items-center">
        <View className="flex-1">
          <TouchableOpacity className="w-9 h-9 rounded-full bg-slate-800 items-center justify-center">
            <Ionicons name="qr-code" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-end">
          <TouchableOpacity className="rounded-full bg-slate-800 items-center justify-center h-9 px-3">
            <Text className="text-base text-white font-semibold">
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center mt-6">
          <TouchableOpacity>
            <Image
              source={require('../../assets/avatar.png')}
              className="w-28 h-28 rounded-full"
            />
          </TouchableOpacity>

          <Text className="mt-4 text-white font-bold text-4xl">
            username
          </Text>
          <View className="flex-row gap-1">
            <Text className="text-slate-400 text-sm">
              +7 777 777 77 77
            </Text>
            <Text className="text-slate-400 text-sm">
              ◦
            </Text>
            <Text className="text-slate-400 text-sm">
              @username
            </Text>
          </View>
        </View>


        <View className="flex-1 px-4 py-3 mt-3 bg-slate-800 mx-4 rounded-2xl">
          <TouchableOpacity className='py-2 px-2'>
            <View className='flex-row gap-3 items-center'>
              <Image source={require('../../assets/avatar.png')} className="w-8 h-8 rounded-full" />
              <Text className="text-white font-semibold text-lg">Yernur Nassipkali</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 flex-row gap-4 items-center'>
            <Feather name='plus' size={24} color="#3b82f6" />
            <Text className='text-blue-500 font-semibold text-lg'>Add Account</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-4 py-3 mt-4 bg-slate-800 mx-4 rounded-2xl">
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <FontAwesome name='user-circle-o' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>My Profile</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-4 py-3 mt-4 bg-slate-800 mx-4 rounded-2xl">
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Ionicons name='wallet' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Wallet</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-4 py-3 mt-4 bg-slate-800 mx-4 rounded-2xl">
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Feather name='bookmark' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Saved Messages</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Feather name='phone-call' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Recent Calls</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Ionicons name='laptop-outline' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Devices</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Feather name='folder' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Chat folders</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-4 py-3 mt-4 bg-slate-800 mx-4 rounded-2xl">
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Ionicons name='notifications' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Notificatins and Sounds</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Feather name='lock' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Privacy and Security</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Feather name='database' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Data and Storage</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
          <TouchableOpacity className='py-2 px-2 justify-between flex-row'>
            <View className="flex-row items-center gap-4">
              <Ionicons name='language' size={24} color="#fff" />
              <Text className='text-white font-semibold text-lg'>Language</Text>
            </View>
            <Feather name='chevron-right' size={24} color="#a2a2a6" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default ProfileScreen
