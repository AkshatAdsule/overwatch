import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TrackingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const loadingTime = Math.floor(Math.random() * 12000) + 3000;
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      const randomCountdown = Math.floor(Math.random() * 25) + 5;
      setCountdown(randomCountdown);
      
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(countdownInterval);
            return 0;
          }
        });
      }, 1000);
      
      return () => clearInterval(countdownInterval);
    }, loadingTime);
    
    return () => clearTimeout(loadingTimer);
  }, []);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {isLoading ? (
            <>
              <Text style={styles.loadingText}>Dispatching a drone...</Text>
              <ActivityIndicator size="large" color="#E8F1F2" style={styles.loader} />
            </>
          ) : (
            <>
              <Text style={styles.countdownTitle}>Drone arriving in:</Text>
              <Text style={styles.countdownTimer}>{countdown} seconds</Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#E8F1F2',
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E8F1F2',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E8F1F2',
  },
  loader: {
    marginTop: 20,
  },
  countdownTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#E8F1F2',
  },
  countdownTimer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E8F1F2',
  },
});