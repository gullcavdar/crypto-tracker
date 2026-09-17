import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.welcomeText}>Wellcome Back</Text>
        <Text style={styles.usernameText}>Alex Johnson</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20
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
