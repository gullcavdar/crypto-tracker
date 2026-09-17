import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CategoryTab({ activeTab, setActiveTab }) {
  const categories = ['Popular', 'Gainers', 'Volume'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isActive = activeTab === category;

        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              isActive ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab(category)}
          >
            <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#34C759',
  },
  inactiveTab: {
    backgroundColor: '#1B2A4A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#0A0F1D',
  },
  inactiveText: {
    color: '#8E8E93',
  },
});