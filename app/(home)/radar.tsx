import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import { WS_URL } from '../utils/wsConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { useRouter } from 'expo-router';

export default function RadarScreen() {
  const [loading, setLoading] = useState(true);
  const [userCenter, setUserCenter] = useState<[number, number]>([0, 0]);
  const [threats, setThreats] = useState<Array<[number, number]>>([]);
  const [elapsed, setElapsed] = useState(0);
  const [blink, setBlink] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => setLoading(false);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setUserCenter(data.user_center);
        setThreats(data.threat_centers);
        if (data.image_data) setImageData(data.image_data);
      } catch {}
    };
    ws.onerror = () => ws.close();
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => setElapsed((prev) => prev + 1), 1000);
      const blinkTimer = setInterval(() => setBlink((prev) => !prev), 500);
      return () => {
        clearInterval(timer);
        clearInterval(blinkTimer);
      };
    }
  }, [loading]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };

  const { width } = Dimensions.get('window');
  const size = width - 40;
  const svgPadding = 16;
  const center = size / 2;
  const maxRadius = (size / 2) - svgPadding;
  const bands = 3;
  const spacing = maxRadius / bands;
  const maxThreatDistance = 350; // max distance in px between user and threat
  const scale = maxRadius / maxThreatDistance; // map threat offsets to new radius

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#E8F1F2" />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Tracking</Text>
            <View style={styles.headerRow}>
              <View style={styles.liveBadge}>
                <View style={[styles.dot, blink ? styles.dotOn : styles.dotOff]} />
                <Text style={styles.liveText}>Live</Text>
                </View>
                <Text style={styles.timer}>{formatTime(elapsed)}</Text>

            </View>
          </View>
          <Svg width={size} height={size}>
            {[...Array(bands)].map((_, i) => (
              <Circle
                key={i}
                cx={center}
                cy={center}
                r={spacing * (i + 1)}
                stroke="#E8F1F2"
                strokeWidth={2}
                fill="none"
              />
            ))}
            <Circle
              cx={center}
              cy={center}
              r={16}
              fill="#4ADE80"
              opacity={0.9}
            />
            <Circle
              cx={center}
              cy={center}
              r={28}
              fill="#4ADE80"
              opacity={0.25}
            />
            {threats.map(([x, y], idx) => {
              const dx = (x - userCenter[0]) * scale;
              const dy = (y - userCenter[1]) * scale;
              return (
                <G key={idx}>
                  <Circle
                    cx={center + dx}
                    cy={center + dy}
                    r={13}
                    fill="#b4c1db"
                    opacity={0.18}
                  />
                  <Circle
                    cx={center + dx}
                    cy={center + dy}
                    r={8}
                    fill="#b4c1db"
                    opacity={0.85}
                  />
                </G>
              );
            })}
          </Svg>
          {imageData && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Camera</Text>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${imageData}` }}
                  style={{ width: 300, height: 225, borderRadius: 8 }}
                  resizeMode="cover"
                />
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <GlassCard>
              <TouchableOpacity style={styles.googleButton} onPress={() => router.replace('/')}> 
                <Text style={styles.buttonText}>End tracking</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E8F1F2',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  dotOn: {
    backgroundColor: 'green',
  },
  dotOff: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'green',
  },
  liveText: {
    color: '#E8F1F2',
    fontSize: 14,
  },
  timer: {
    color: '#E8F1F2',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  googleButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#E8F1F2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  imageLabel: {
    color: '#E8F1F2',
    fontSize: 14,
    marginBottom: 4,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8F1F2',
  },
});