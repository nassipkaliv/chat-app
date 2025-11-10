# Mini Chat Application

Test assignment for **Jobespace** company.

## Description
This is a mini chat application similar to Telegram. You can view chat list, send text messages, voice messages, and video messages.

## Tech Stack

- **React Native** 0.81.5 + **Expo** SDK 54
- **TypeScript** 5.9.2
- **NativeWind v4**
- **Zustand** for state management
- **expo-av** for audio
- **expo-camera** for video

## Features Implemented

### Required functionality from the assignment:
- ✅ Chat list with unread message counters
- ✅ View messages in chat
- ✅ Send text messages
- ✅ Adaptive styling
- ✅ JSON logging when sending messages (console.log)
- ✅ TypeScript
- ✅ Zustand for state management

### Additional features (beyond requirements):
- ✅ Read/unread status (checkmarks like Telegram)
- ✅ Voice messages (record and playback)
- ✅ Video messages as circles (like Telegram)
- ✅ Profile screen
- ✅ Contacts screen

## Installation and Running

```bash
# Clone repository
git clone https://github.com/nassipkaliv/chat-app.git
cd chat-app

# Install dependencies
npm install

# Start
npm start

# For iOS
npm run ios

# For Android
npm run android
```

## Project Structure

```
src/
├── components/       # Components (VoiceMessage, VideoMessage)
├── hooks/           # Hooks (useVoice, useVideo)
├── screens/         # Screens (homeScreen, chatScreen, etc.)
├── store/           # Zustand store
└── navigation/      # Navigation
```

## Implementation Details

### Voice Messages
- Press and hold microphone button → recording starts
- Release → sends
- Swipe left → cancel
- Maximum 60 seconds

### Video Messages
- Switch to camera (tap icon)
- Press and hold → records video
- Release → sends as circle
- Maximum 60 seconds

### JSON Format
When sending a message, JSON is logged to console:

```json
{
  "chatId": "1",
  "messageId": "1234567890",
  "text": "Hello",
  "author": "me",
  "createdAt": "2025-01-10T10:30:00.000Z"
}
```

## Author
Yernur Nassipkali
GitHub: https://github.com/nassipkaliv
