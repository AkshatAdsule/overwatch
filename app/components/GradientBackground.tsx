import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#13293D', '#247BA0', '#1B98E0']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        locations={[0, 0.38, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      {children}
    </View>
  );
};

export default GradientBackground;