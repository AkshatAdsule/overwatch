import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect specifically to sign-in page instead of root
      router.replace('/(auth)/sign-in')
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
      <Text style={styles.signOutText}>Sign out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  signOutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30', // Red color for signout
  }
})