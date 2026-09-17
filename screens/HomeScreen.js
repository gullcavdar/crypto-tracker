import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import CategoryTab from "../components/CategoryTab";
import CoinListItem from "../components/CoinListItem";
import { useMarketCoins } from "../hooks/useCryptoApi";
import { homeStyles as styles } from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const { coins: allCoins, loading } = useMarketCoins();
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [activeTab, setActiveTab] = useState("Popular");

  // Modal State'leri
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("Deposit");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (activeTab === "Popular") {
      setFilteredCoins(allCoins);
    } else if (activeTab === "Gainers") {
      setFilteredCoins(allCoins.filter((coin) => coin.isPositive));
    } else if (activeTab === "Volume") {
      setFilteredCoins([...allCoins].reverse());
    }
  }, [activeTab, allCoins]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setAmount("");
    setModalVisible(true);
  };

  const handleAction = () => {
    alert(`${modalType} successful: $${amount}`);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header username="Alex Johnson" />

        <BalanceCard
          balance="$12,450.80"
          change="+4.25%"
          onDeposit={() => handleOpenModal("Deposit")}
          onWithdraw={() => handleOpenModal("Withdraw")}
        />

        <CategoryTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <Text style={styles.sectionTitle}>{activeTab} Cryptos</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#34C759"
            style={{ marginTop: 40 }}
          />
        ) : (
          filteredCoins.map((coin) => (
            <CoinListItem
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.price}
              change={coin.change}
              isPositive={coin.isPositive}
              onPress={() => navigation.navigate("CoinDetail", { coin })}
            />
          ))
        )}
      </ScrollView>

      {/* İşlem Modalı */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalType} Funds</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter the amount you would like to {modalType.toLowerCase()}.
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
              style={styles.actionButton}
              onPress={handleAction}
            >
              <Text style={styles.actionButtonText}>Confirm {modalType}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}