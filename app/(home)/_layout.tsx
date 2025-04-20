import { Stack } from 'expo-router/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GradientBackground } from '../components/GradientBackground'

export default function Layout() {
  return (
    <SafeAreaProvider>
      <GradientBackground>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#13293D' }
          }}
        />
      </GradientBackground>
    </SafeAreaProvider>
  )
}