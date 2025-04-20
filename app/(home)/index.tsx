import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "../components/GlassCard";
import { useUser } from "@clerk/clerk-expo";

const historyData = [
  {
    id: "h1",
    timeLabel: "Thursday Night",
    duration: "27 minute walk",
  },
  {
    id: "h2",
    timeLabel: "Thursday Night",
    duration: "27 minute walk",
  },
  {
    id: "h3",
    timeLabel: "Thursday Night",
    duration: "27 minute walk",
  },
  {
    id: "h4",
    timeLabel: "Wednesday Night",
    duration: "35 minute run",
  },
  {
    id: "h5",
    timeLabel: "Tuesday Evening",
    duration: "45 minute walk",
  },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 22) return "Good Evening";
  return "Good Night";
};

const ActivityScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const firstName = user?.firstName || "User";
  const greeting = getGreeting();

  const handleReviewPress = (item: { id: string; timeLabel: string; duration: string }) => {
    console.log("Review pressed for:", item.id);
  };

  const handleStartTrackingPress = () => {
    router.push("/(home)/tracking");
  };

  const handleSettingsPress = () => {
    router.push("/(home)/settings");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>{greeting}, {firstName}!</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSettingsPress}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="#E8F1F2" />
          </TouchableOpacity>
        </View>

        <Text style={styles.historyTitle}>History</Text>

        <ScrollView style={styles.scrollView}>
          {historyData.map((item) => (
            <GlassCard key={item.id} style={styles.historyCard}>
              <Text style={styles.cardTimeLabel}>{item.timeLabel}</Text>
              <Text style={styles.cardDuration}>{item.duration}</Text>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => handleReviewPress(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.reviewButtonText}>Review</Text>
              </TouchableOpacity>
            </GlassCard>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.startTrackingButton}
          onPress={handleStartTrackingPress}
          activeOpacity={0.8}
        >
          <Text style={styles.startTrackingButtonText}>Start Tracking</Text>
          <Ionicons name="chevron-forward" size={24} color="#E8F1F2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E8F1F2",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E8F1F2",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  historyCard: {
    marginBottom: 10,
  },
  cardTimeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E8F1F2",
    marginBottom: 2,
  },
  cardDuration: {
    fontSize: 14,
    color: "rgba(232, 241, 242, 0.7)",
    marginBottom: 8,
  },
  reviewButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  reviewButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#E8F1F2",
  },
  startTrackingButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  startTrackingButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#E8F1F2",
  },
});

export default ActivityScreen;
