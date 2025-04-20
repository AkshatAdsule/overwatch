import { useClerk } from '@clerk/clerk-expo'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { GlassCard } from './GlassCard'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/(auth)/sign-in')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <GlassCard style={styles.container}>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </GlassCard>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
  },
  signOutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  }
})