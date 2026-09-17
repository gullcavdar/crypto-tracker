import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CoinListItem({ name, symbol, price, change, isPositive, onPress}) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      {/* Sol: Simge ve İsim */}
      <View style={styles.leftSide}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{symbol[0]}</Text>
        </View>
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.symbolText}>{symbol}</Text>
        </View>
      </View>

      {/* Sağ: Fiyat ve Yüzde Değişim */}
      <View style={styles.rightSide}>
        <Text style={styles.priceText}>{price}</Text>
        <View style={[styles.badge, { backgroundColor: isPositive ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 69, 58, 0.15)' }]}>
          <Text style={[styles.changeText, { color: isPositive ? '#34C759' : '#FF453A' }]}>
            {change}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B2A4A',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  symbolText: {
    color: '#8E8E93',
    fontSize: 13,
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});