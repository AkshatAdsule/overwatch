import { Stack } from 'expo-router/stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: 'white' } 
        }}
      />
    </SafeAreaProvider>
  )
}