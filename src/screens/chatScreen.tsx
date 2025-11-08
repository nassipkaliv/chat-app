import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'


const ChatScreen = () => {
  return (
    <View className="flex-1 bg-slate-950">
      <View className="px-4 pt-12 pb-3 flex-row items-center bg-slate-950">
        <View className="flex-1">
          <TouchableOpacity className="w-9 h-9 rounded-full items-center justify-center">
            <FontAwesome name="angle-left" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-1 items-center">
          <View className="flex-row items-center gap-2 mb-[0px]">
            <Text
              className="text-white text-lg font-semibold"
            >
              username
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
          <TouchableOpacity className="w-11 h-11 rounded-full bg-slate-700 items-center justify-center">
            <Text className="text-white font-bold text-lg">
              U
            </Text>
        </TouchableOpacity> 
        </View>
      </View>
      <View className="h-px bg-slate-800" />

      <View className='mt-auto px-3 pb-4 pt-2 flex-row items-end gap-2'>
        <TouchableOpacity className='w-9 h-9 rounded-full bg-slate-800 items-center justify-center'>
          <Feather name='paperclip' size={18} color="#7f7f7f" />
        </TouchableOpacity>

        <TextInput className="flex-1 max-h-24 bg-slate-800 text-white rounded-2xl px-3 py-2" placeholder="Something" placeholderTextColor="#6b7280" />

        <TouchableOpacity className="w-9 h-9 rounded-full bg-slate-800 items-center justify-center">
          <Feather name="mic" size={18} color="#7f7f7f" />
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default ChatScreen
