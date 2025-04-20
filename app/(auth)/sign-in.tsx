import React, { useCallback, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlassCard } from '../components/GlassCard'
import { Ionicons } from '@expo/vector-icons'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  useWarmUpBrowser()
  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/images/rader.svg')}
          style={styles.radarImage}
          contentFit="contain"
        />
        <Text style={styles.title}>Overwatch</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <GlassCard>
          <TouchableOpacity style={styles.googleButton} onPress={onPress}>
            <Text style={styles.buttonText}>Continue with Google</Text>
            <Ionicons name="arrow-forward" size={24} color="#E8F1F2" style={styles.arrowIcon} />
          </TouchableOpacity>
        </GlassCard>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  topSection: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  radarImage: {
    position: 'absolute',
    top: -100,
    left: -250,
    width: 500,
    height: 500,
    opacity: 0.25
  },
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#E8F1F2',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  googleButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#E8F1F2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 8,
  },
})