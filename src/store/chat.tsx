import { create } from "zustand";

export type ChatInfoProps = {
  id: string
  title: string
  lastMessage: string
  lastTime: string
  unread: number
  ticked: boolean
}

export type MessageInfoProps = {
  id: string
  chatId: string
  author: 'me' | 'user'
  text: string
  time: string
  isRead: boolean
  type?: 'text' | 'voice'
  duration?: number
  audioUri?: string
}

type ChatStore = {
  chats: ChatInfoProps[]
  messages: MessageInfoProps[]
  activeChatId: string | null
  openChat: (chatId: string) => void
  sendMessage: (chatId: string, text: string) => void
  receiveMessage: (msg: MessageInfoProps) => void 
  isChatRead: (chatId: string) => void
  sendVoiceMessage: (chatId: string, audioUri: string, duration: number) => void
}


const myChats: ChatInfoProps[] = [
  {
    id: '1',
    title: 'Yernur',
    lastMessage: 'React Native',
    lastTime: '4:07',
    unread: 2,
    ticked: false,
  },
  {
    id: '2',
    title: 'Darkan',
    lastMessage: 'Ya lox',
    lastTime: '4:08',
    unread: 0,
    ticked: true,
  },
  {
    id: '3',
    title: 'Yerkin',
    lastMessage: 'congrutalions',
    lastTime: '4:20',
    unread: 2,
    ticked: false,
  },
  {
    id: '4',
    title: 'Kanye West',
    lastMessage: 'Hey it is Kanye west',
    lastTime: '15:35',
    unread: 1,
    ticked: false,
  },
  {
    id: '5',
    title: 'Drake',
    lastMessage: 'ovo',
    lastTime: '6:16',
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

const myMessages: MessageInfoProps[] = [
  {
    id: 'm1',
    chatId: '1',
    author: 'user',
    text: 'Hey',
    time: '4:20',
    isRead: true,
  },
  {
    id: 'm2',
    chatId: '2',
    author: 'me',
    text: 'Hey it is me',
    time: '4:21',
    isRead: true,
  },
  {
    id: 'm3',
    chatId: '3',
    author: 'me',
    text: 'Hey it is Yernur',
    time: '5:30',
    isRead: false,
  },
  {
    id: 'm4',
    chatId: '4',
    author: 'user',
    text: 'Hey it is Kanyye west',
    time: '6:16',
    isRead: true,
  },
]

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: myChats,
  messages: myMessages,
  activeChatId: null,

  openChat: (chatId) => {
    set({ activeChatId: chatId })
    get().isChatRead(chatId)

    set(state => ({
      chats: state.chats.map(chat => chat.id === chatId ? { ...chat, unread: 0} : chat),
    }))
  },

sendMessage: (chatId, text) => {
  const now = new Date()
  const time = now.toLocaleTimeString().slice(0, 5)

  const newMessage: MessageInfoProps = {
    id: now.getTime().toString(),
    chatId,
    author: 'me',
    text,
    time,
    isRead: false
  }

  set(state => ({
    messages: [...state.messages, newMessage],
    chats: state.chats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            lastMessage: text,
            lastTime: time,
            ticked: false,
          }
        : chat
    ),
  }))

  setTimeout(() => {
    set(state => ({
      messages: state.messages.map(msg =>
        msg.id === newMessage.id
        ? {...msg, isRead: true} : msg
      ),
      chats: state.chats.map(chat => 
        chat.id === chatId ? {...chat, ticked: true} : chat
      )
    }))
  }, 2000)

  const jsonLoad = {
    chatId,
    messageId: newMessage.id,
    text,
    author: 'me',
    createdAt: now.toISOString(),
  }

  console.log('Json:', JSON.stringify(jsonLoad))
},


receiveMessage: (msg) => {
  set(state => ({
    messages: [...state.messages, msg],
    chats: state.chats.map(chat => 
      chat.id === msg.chatId
      ? {
        ...chat,
        lastMessage: msg.text,
        lastTime: msg.time,
        unread: chat.unread + (msg.author === 'user' ? 1 : 0),
      } : chat
    ),
  }))
},

isChatRead: (chatId) => {
  set(state => ({
    messages: state.messages.map(msg => 
      msg.chatId === chatId && msg.author == 'user' ? {...msg, isRead: true} : msg
    ),
    chats: state.chats.map(chat => 
      chat.id === chatId ? {...chat, unread: 0} : chat
    )
  }))
},

sendVoiceMessage: (chatId, audioUri, duration) => {
  const now = new Date()
  const time = now.toLocaleTimeString().slice(0, 5)
  
  const newMessage: MessageInfoProps = {
    id: now.getTime().toString(),
    chatId,
    author: 'me',
    text: '',
    time,
    isRead: false,
    type: 'voice',
    duration,
    audioUri
  }
  set(state => ({
    messages: [...state.messages, newMessage],
    chats: state.chats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            lastMessage: 'Voice message',
            lastTime: time,
            ticked: false,
          }
        : chat
    ),
  }))
  setTimeout(() => {
    set(state => ({
      messages: state.messages.map(msg =>
        msg.id === newMessage.id
        ? {...msg, isRead: true} : msg
      ),
      chats: state.chats.map(chat => 
        chat.id === chatId ? {...chat, ticked: true} : chat
      )
    }))
  }, 2000)
}
}))