import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SignOutButton } from "../components/SignoutButton";
import { useUser, useAuth } from "@clerk/clerk-expo";

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
  
  // State for toggle switches
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  // Get user data from Clerk
  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = user?.emailAddresses[0]?.emailAddress || "No email found";
  const imageUrl = user?.imageUrl;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Name</Text>
            <Text style={styles.settingValue}>{fullName}</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email</Text>
            <Text style={styles.settingValue}>{email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              trackColor={{ false: "#E5E5EA", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5EA"
              onValueChange={setNotifications}
              value={notifications}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#E5E5EA", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5EA"
              onValueChange={setDarkMode}
              value={darkMode}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Location Services</Text>
            <Switch
              trackColor={{ false: "#E5E5EA", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5EA"
              onValueChange={setLocationServices}
              value={locationServices}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Data Sharing</Text>
            <Switch
              trackColor={{ false: "#E5E5EA", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E5EA"
              onValueChange={setDataSharing}
              value={dataSharing}
            />
          </View>
        </View>

        <View style={styles.signOutContainer}>
          <SignOutButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  backText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // To offset the back button width and keep title centered
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
    alignItems: "center", // Center items vertically for switches
  },
  settingLabel: {
    fontSize: 16,
    color: "#000000",
  },
  settingValue: {
    fontSize: 16,
    color: "#8E8E93",
  },
  signOutContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 30,
  }
});