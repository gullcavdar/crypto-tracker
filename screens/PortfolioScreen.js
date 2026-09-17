import React from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { portfolioStyles as styles } from "../styles/PortfolioScreenStyles";
import { usePortfolio } from "../hooks/useCryptoApi";

export default function PortfolioScreen() {
  // Kullanıcının cüzdanında tuttuğu sabit miktarlar
  const userHoldings = [
    { id: "bitcoin", amount: 0.145 },
    { id: "ethereum", amount: 0.85 },
    { id: "solana", amount: 1.2 },
  ];

  const { portfolioAssets, totalPortfolioValue, loading } = usePortfolio(userHoldings);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Ekran Başlığı */}
        <Text style={styles.screenTitle}>Portföyüm</Text>

        {/* Toplam Portföy Kartı */}
        <View style={styles.portfolioCard}>
          <Text style={styles.cardTitle}>Toplam Varlık Değeri</Text>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#34C759"
              style={{ marginVertical: 10 }}
            />
          ) : (
            <Text style={styles.totalBalance}>
              $
              {totalPortfolioValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          )}
          <View style={styles.profitRow}>
            <Text style={styles.profitText}>▲ Canlı Piyasa Verisi</Text>
          </View>
        </View>

        {/* Varlıklarım Başlığı */}
        <Text style={styles.sectionTitle}>Varlıklarım</Text>

        {/* Liste */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#34C759"
            style={{ marginTop: 40 }}
          />
        ) : (
          portfolioAssets.map((asset) => (
            <View key={asset.id} style={styles.assetItem}>
              <View style={styles.assetLeft}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>{asset.symbol[0]}</Text>
                </View>
                <View>
                  <Text style={styles.assetName}>{asset.name}</Text>
                  <Text style={styles.assetAmount}>{asset.amount}</Text>
                </View>
              </View>

              <View style={styles.assetRight}>
                <Text style={styles.assetValue}>{asset.value}</Text>
                <Text
                  style={[
                    styles.assetChange,
                    { color: asset.isPositive ? "#34C759" : "#FF453A" },
                  ]}
                >
                  {asset.change}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}