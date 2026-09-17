import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BalanceCard({
  balance,
  change,
  onDeposit,
  onWithdraw,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total Balance</Text>
      <Text style={styles.balance}>{balance}</Text>

      <View style={styles.changeRow}>
        <Ionicons name="trending-up" size={16} color="#34C759" />
        <Text style={styles.changeText}>{change} (24h)</Text>
      </View>

      {/* Butonlar */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={onDeposit}>
          <Ionicons name="add-circle-outline" size={18} color="#0A0F1D" />
          <Text style={styles.primaryButtonText}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onWithdraw}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.secondaryButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1B2A4A",
    borderRadius: 24,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    color: "#8E8E93",
    fontSize: 14,
    marginBottom: 6,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  changeText: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#34C759",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#0A0F1D",
    fontSize: 15,
    fontWeight: "bold",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
