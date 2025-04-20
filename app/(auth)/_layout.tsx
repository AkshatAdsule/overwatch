import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GradientBackground } from '../components/GradientBackground'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <SafeAreaProvider>
      <GradientBackground>
        <Stack screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#13293D' },
        }} />
      </GradientBackground>
    </SafeAreaProvider>
  )
}