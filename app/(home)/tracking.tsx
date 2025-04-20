import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

export default function TrackingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  useEffect(() => {
    // Generate a random time for the loading state (between 3-15 seconds)
    const loadingTime = Math.floor(Math.random() * 12000) + 3000;
    
    // Set a timeout to switch from loading to countdown
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Generate a random countdown time (less than 30 seconds)
      const randomCountdown = Math.floor(Math.random() * 25) + 5; // 5-29 seconds
      setCountdown(randomCountdown);
      
      // Start the countdown
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
      
      // Clean up interval when component unmounts or when countdown reaches 0
      return () => clearInterval(countdownInterval);
      
    }, loadingTime);
    
    // Clean up timeout when component unmounts
    return () => clearTimeout(loadingTimer);
  }, []);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <>
            <Text style={styles.loadingText}>Dispatching a drone...</Text>
            <ActivityIndicator size="large" color="#000000" style={styles.loader} />
          </>
        ) : (
          <>
            <Text style={styles.countdownTitle}>Drone arriving in:</Text>
            <Text style={styles.countdownTimer}>{countdown} seconds</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  countdownTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  countdownTimer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
});