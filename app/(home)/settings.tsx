import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SignOutButton } from "../components/SignoutButton";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { GlassCard } from "../components/GlassCard";

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#E8F1F2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Name</Text>
            <Text style={styles.settingValue}>{fullName}</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email</Text>
            <Text style={styles.settingValue}>{email}</Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              trackColor={{ false: "rgba(229, 229, 234, 0.3)", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="rgba(229, 229, 234, 0.3)"
              onValueChange={setNotifications}
              value={notifications}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "rgba(229, 229, 234, 0.3)", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="rgba(229, 229, 234, 0.3)"
              onValueChange={setDarkMode}
              value={darkMode}
            />
          </View>
        </GlassCard>

        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Location Services</Text>
            <Switch
              trackColor={{ false: "rgba(229, 229, 234, 0.3)", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="rgba(229, 229, 234, 0.3)"
              onValueChange={setLocationServices}
              value={locationServices}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Data Sharing</Text>
            <Switch
              trackColor={{ false: "rgba(229, 229, 234, 0.3)", true: "#4CAF50" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="rgba(229, 229, 234, 0.3)"
              onValueChange={setDataSharing}
              value={dataSharing}
            />
          </View>
        </GlassCard>

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
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    color: "#E8F1F2",
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E8F1F2",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E8F1F2",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    color: "#E8F1F2",
  },
  settingValue: {
    fontSize: 16,
    color: "rgba(232, 241, 242, 0.7)",
  },
  signOutContainer: {
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 30,
  }
});