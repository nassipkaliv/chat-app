import { useState, useRef } from "react";
import { Camera, CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";

export const useVideo = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [permission, requestPermissions] = useCameraPermissions()
  const isCameraReadyRef = useRef(false)
  const videoUriRef = useRef<string | null>(null)
  const cameraRef = useRef<CameraView>(null)
  const durationInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const startRecording = async () => {
  try {
    if(!permission?.granted) {
      const result = await requestPermissions()
      if(!result.granted) {
        Alert.alert("No camera access")
        return
      }
    }

    setIsRecording(true)

    let attempts = 0
    while (!isCameraReadyRef.current && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    if (cameraRef.current && isCameraReadyRef.current) {
      setRecordingDuration(0)  
      durationInterval.current = setInterval(() => {
        setRecordingDuration(prev => {  
          if (prev >= 60) {
            stopRecording()
            return 60
          }
          return prev + 1;
        })
      }, 1000)

      const video = await cameraRef.current.recordAsync({
        maxDuration: 60,
      })

      if (video && video.uri) {
        videoUriRef.current = video.uri
      }
    }
  } catch (error) {
    Alert.alert('Error')
    console.log(error)
    setIsRecording(false)
  }
  }

  const stopRecording = async () => {
    try {
      if (cameraRef.current && isRecording) {
        setIsRecording(false)
        if(durationInterval.current) {
          clearInterval(durationInterval.current)
        }
        const currentDuration = recordingDuration
        cameraRef.current.stopRecording()
        let attempts = 0
        while (!videoUriRef.current && attempts < 30) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }
        const uri = videoUriRef.current
        videoUriRef.current = null
        return {
          uri,
          duration: currentDuration
        }
      }
      return null
    } catch (error) {
      return null
    }
  }

  const cancelRecording = async () => {
    try {
      if(cameraRef.current && isRecording) {
        setIsRecording(false)
        if(durationInterval.current) {
          clearInterval(durationInterval.current)
        }
        cameraRef.current.stopRecording()
        setRecordingDuration(0)
        videoUriRef.current = null
        isCameraReadyRef.current = false
      }
    } catch(error) {
      console.log(error)
    }
  }

  const onCameraReady = () => {
    isCameraReadyRef.current = true
  }

  const resetVideoUri = () => {
    videoUriRef.current = null
  }

  return {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
    cancelRecording,
    resetVideoUri,
    onCameraReady,
    cameraRef,
    permission
  }
}