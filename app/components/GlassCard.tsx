import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ style, children }) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={20} tint="light" style={styles.blur}>
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  blur: {
    width: '100%',
    // height: '100%',
  },
  content: {
    padding: 12,
  },
});