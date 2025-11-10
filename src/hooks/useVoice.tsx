 import { useState, useRef } from "react";
 import { Audio } from "expo-av";
 import { Alert, Platform } from 'react-native'

 export const useVoice = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const durationInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync()

      if(!permission.granted) {
        Alert.alert('Error', 'No access to mic')
        return
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )
      setRecording(recording)
      setIsRecording(true)
      setRecordingDuration(0)

      durationInterval.current = setInterval(() => {
        setRecordingDuration(prev => prev +1)
      }, 1000)
    } catch (err) {
      console.error('Failed to start recording', err)
      Alert.alert('Error', 'Fail to start record')
    }
  }

  const stopRecording = async () => {
    if(!recording) return null
    try {
      setIsRecording(false)
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()

      setRecording(null)

      return {
        uri,
        duration: recordingDuration
      }
    } catch (err) {
      console.error('Failed to stop recording', err)
      return null
    }
  }

  const cancelRecording = async () => {
    if(!recording) return
    try {
      setIsRecording(false)
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
      await recording.stopAndUnloadAsync()
      setRecording(null)
      setRecordingDuration(0)
    } catch (err) {
      console.error('Failed to cancel recording', err)
    }
  }

  return {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
    cancelRecording,
  }
 }