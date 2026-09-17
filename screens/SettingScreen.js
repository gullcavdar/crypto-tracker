import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import { settingStyles as styles } from "../styles/SettingScreenStyles";

export default function SettingScreen({ navigation }) {
  const { user, logout } = useAuthStore();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

  const handleLogout = async () => {
    await logout(); // Store'dan ve SecureStore'dan veriyi temizler
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const getInitials = (name) => {
    if (!name) return "KV";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Settings</Text>

        {/* Global Store'dan gelen gerçek kullanıcı verisi */}
        <View style={styles.profileCard}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>{getInitials(user?.fullName)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>
              {user?.fullName || "Kullanıcı"}
            </Text>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {user?.email || "kullanici@example.com"}
            </Text>
          </View>
        </View>

        <Text style={styles.groupTitle}>Account</Text>
        <View style={styles.groupContainer}>
          <TouchableOpacity style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="person-outline" size={20} color="#34C759" />
              <Text style={styles.rowText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#34C759"
              />
              <Text style={styles.rowText}>Security & Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <Text style={styles.groupTitle}>Preferences</Text>
        <View style={styles.groupContainer}>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#34C759"
              />
              <Text style={styles.rowText}>Push Notifications</Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: "#1B2A4A", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="finger-print-outline" size={20} color="#34C759" />
              <Text style={styles.rowText}>Face ID / Biometrics</Text>
            </View>
            <Switch
              value={isBiometricsEnabled}
              onValueChange={setIsBiometricsEnabled}
              trackColor={{ false: "#1B2A4A", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
