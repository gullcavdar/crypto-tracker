import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Svg, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { coinDetailStyles as styles } from "../styles/CoinDetailScreenStyles";
import { useCoinDetail } from "../hooks/useCryptoApi"; // Hook'u dahil ettik

export default function CoinDetailScreen({ route, navigation }) {
  const { coin } = route.params;

  const { coinDetail, loading } = useCoinDetail(coin.id);

  const [activeTimeframe, setActiveTimeframe] = useState("24H");
  const timeframes = ["1H", "24H", "1W", "1M", "1Y", "ALL"];

  // Alım / Satım Modalı State'leri
  const [modalVisible, setModalVisible] = useState(false);
  const [tradeType, setTradeType] = useState("Buy");
  const [amount, setAmount] = useState("");

  const handleOpenTradeModal = (type) => {
    setTradeType(type);
    setAmount("");
    setModalVisible(true);
  };

  const handleExecuteTrade = () => {
    alert(
      `Successfully ${tradeType.toLowerCase()}ed $${amount} worth of ${coin.name}!`,
    );
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Üst Navigasyon Barı */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {coin.name} ({coin.symbol})
        </Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="star-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {loading || !coinDetail ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#34C759" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Fiyat ve Değişim Alanı */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{coinDetail.currentPrice}</Text>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: coinDetail.isPositive
                    ? "rgba(52, 199, 89, 0.15)"
                    : "rgba(255, 69, 58, 0.15)",
                },
              ]}
            >
              <Text
                style={[
                  styles.changeText,
                  { color: coinDetail.isPositive ? "#34C759" : "#FF453A" },
                ]}
              >
                {coinDetail.priceChange} (24h)
              </Text>
            </View>
          </View>

          {/* Grafik Alanı */}
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              <Svg height="160" width="100%" viewBox="0 0 350 150">
                <Defs>
                  <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop
                      offset="0%"
                      stopColor={coinDetail.isPositive ? "#34C759" : "#FF453A"}
                      stopOpacity="0.4"
                    />
                    <Stop
                      offset="100%"
                      stopColor={coinDetail.isPositive ? "#34C759" : "#FF453A"}
                      stopOpacity="0.0"
                    />
                  </LinearGradient>
                </Defs>

                <Path
                  d={
                    coinDetail.isPositive
                      ? "M 0 110 Q 70 60, 140 90 T 280 40 T 350 15 L 350 150 L 0 150 Z"
                      : "M 0 40 Q 70 90, 140 60 T 280 110 T 350 135 L 350 150 L 0 150 Z"
                  }
                  fill="url(#gradient)"
                />

                <Path
                  d={
                    coinDetail.isPositive
                      ? "M 0 110 Q 70 60, 140 90 T 280 40 T 350 15"
                      : "M 0 40 Q 70 90, 140 60 T 280 110 T 350 135"
                  }
                  fill="none"
                  stroke={coinDetail.isPositive ? "#34C759" : "#FF453A"}
                  strokeWidth="3"
                />
              </Svg>
            </View>

            <View style={styles.timeframeRow}>
              {timeframes.map((tf) => {
                const isActive = activeTimeframe === tf;
                return (
                  <TouchableOpacity
                    key={tf}
                    style={[
                      styles.timeframeButton,
                      isActive && styles.activeTimeframeButton,
                    ]}
                    onPress={() => setActiveTimeframe(tf)}
                  >
                    <Text
                      style={[
                        styles.timeframeText,
                        isActive && styles.activeTimeframeText,
                      ]}
                    >
                      {tf}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* İstatistikler */}
          <Text style={styles.sectionTitle}>Market Statistics</Text>
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>24h High</Text>
              <Text style={styles.statValue}>{coinDetail.high24h}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>24h Low</Text>
              <Text style={styles.statValue}>{coinDetail.low24h}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Market Cap</Text>
              <Text style={styles.statValue}>{coinDetail.marketCap}</Text>
            </View>
            <View style={[styles.statRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.statLabel}>Volume (24h)</Text>
              <Text style={styles.statValue}>{coinDetail.volume24h}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Alt Butonlar */}
      <View style={styles.footerActionRow}>
        <TouchableOpacity
          style={styles.sellButton}
          onPress={() => handleOpenTradeModal("Sell")}
        >
          <Text style={styles.sellButtonText}>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handleOpenTradeModal("Buy")}
        >
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {tradeType} {coin.name} ({coin.symbol})
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter the amount in USD you want to {tradeType.toLowerCase()}.
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="0.00"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                autoFocus={true}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: tradeType === "Buy" ? "#34C759" : "#FF453A",
                },
              ]}
              onPress={handleExecuteTrade}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  { color: tradeType === "Buy" ? "#0A0F1D" : "#FFFFFF" },
                ]}
              >
                Confirm {tradeType}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
