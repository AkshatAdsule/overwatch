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

// Define the data for the history cards (as defined above)
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

const ActivityScreen = () => {
  const router = useRouter();

  const handleReviewPress = (item: { id: string; timeLabel: string; duration: string }) => {
    console.log("Review pressed for:", item.id);
    // Add navigation or modal logic here
  };

  const handleStartTrackingPress = () => {
    // Navigate to the tracking page
    router.push("/(home)/tracking");
  };

  const handleSettingsPress = () => {
    router.push("/(home)/settings");
  };

  return (
    // SafeAreaView ensures content isn't hidden by notches or status bars
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar can be used to style the device status bar */}
      <StatusBar barStyle="dark-content" />
      {/* Main container view */}
      <View style={styles.container}>
        {/* Header with greeting and settings button */}
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>Good Evening, Akshat!</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={handleSettingsPress}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* History Section Title */}
        <Text style={styles.historyTitle}>History</Text>

        {/* Scrollable History List */}
        <ScrollView style={styles.scrollView}>
          {historyData.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <Text style={styles.cardTimeLabel}>{item.timeLabel}</Text>
              <Text style={styles.cardDuration}>{item.duration}</Text>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => handleReviewPress(item)}
                activeOpacity={0.7} // Standard opacity feedback
              >
                <Text style={styles.reviewButtonText}>Review</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Start Tracking Button at the bottom */}
        <TouchableOpacity
          style={styles.startTrackingButton}
          onPress={handleStartTrackingPress}
          activeOpacity={0.8}
        >
          <Text style={styles.startTrackingButtonText}>Start Tracking</Text>
          {/* Simple text arrow, consider using an icon library for better visuals */}
          <Text style={styles.startTrackingButtonArrow}>〉</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// StyleSheet for organizing styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures SafeAreaView takes full screen height
    backgroundColor: "#FFFFFF", // White background for the whole screen
  },
  container: {
    flex: 1, // Takes remaining space within SafeAreaView
    paddingHorizontal: 20, // Horizontal padding for content
    paddingTop: 10, // Top padding
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000", // Black color for text
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "600", // Semibold
    color: "#555555", // Dark grey color
    marginBottom: 15,
  },
  scrollView: {
    flex: 1, // Allows ScrollView to take available vertical space
    marginBottom: 15, // Space above the bottom button
  },
  historyCard: {
    backgroundColor: "#F0F0F0", // Light grey background for cards
    borderRadius: 12, // Rounded corners
    padding: 15,
    marginBottom: 15, // Space between cards
  },
  cardTimeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1E", // Slightly off-black
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: 14,
    color: "#3C3C43", // Greyish text color
    marginBottom: 12,
  },
  reviewButton: {
    backgroundColor: "#E5E5EA", // Slightly darker grey for button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center", // Center text horizontally
  },
  reviewButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000", // Black text
  },
  startTrackingButton: {
    backgroundColor: "#E5E5EA", // Same grey as review button for consistency
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row", // Arrange text and arrow side-by-side
    justifyContent: "space-between", // Push text and arrow to opposite ends
    alignItems: "center", // Align items vertically center
    marginBottom: 10, // Bottom margin
  },
  startTrackingButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
  startTrackingButtonArrow: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C3C43", // Greyish color for the arrow
  },
});

export default ActivityScreen;
