import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../store/authStore";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.usernameText}>{user?.fullName || "Kullanıcı"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  welcomeText: {
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 2,
  },
  usernameText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  }
});