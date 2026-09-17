import { useState, useEffect } from 'react';

// Tüm piyasa listesini çeken hook
export function useMarketCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const data = await response.json();
        
        const formattedCoins = data.map((item) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol.toUpperCase(),
          price: `$${item.current_price.toLocaleString()}`,
          change: `${item.price_change_percentage_24h >= 0 ? '+' : ''}${item.price_change_percentage_24h.toFixed(2)}%`,
          isPositive: item.price_change_percentage_24h >= 0,
        }));

        setCoins(formattedCoins);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { coins, loading, error };
}

// Belirli bir coinin detayını çeken hook
export function useCoinDetail(coinId) {
  const [coinDetail, setCoinDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) return;

    const fetchDetail = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const data = await response.json();
        const marketData = data.market_data;

        const formattedDetail = {
          name: data.name,
          symbol: data.symbol.toUpperCase(),
          currentPrice: `$${marketData.current_price.usd.toLocaleString()}`,
          priceChange: `${marketData.price_change_percentage_24h >= 0 ? '+' : ''}${marketData.price_change_percentage_24h.toFixed(2)}%`,
          isPositive: marketData.price_change_percentage_24h >= 0,
          high24h: `$${marketData.high_24h.usd.toLocaleString()}`,
          low24h: `$${marketData.low_24h.usd.toLocaleString()}`,
          marketCap: `$${(marketData.market_cap.usd / 1e9).toFixed(2)}B`,
          volume24h: `$${(marketData.total_volume.usd / 1e9).toFixed(2)}B`,
        };

        setCoinDetail(formattedDetail);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [coinId]);

  return { coinDetail, loading, error };
}

// Kullanıcının cüzdan varlıklarını ve toplam değerini hesaplayan hook
export function usePortfolio(userHoldings) {
  const [portfolioAssets, setPortfolioAssets] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        const data = await response.json();

        let calculatedTotal = 0;

        const updatedAssets = userHoldings.map((holding) => {
          const coinInfo = data.find((item) => item.id === holding.id);
          
          if (coinInfo) {
            const currentPrice = coinInfo.current_price;
            const totalValue = holding.amount * currentPrice;
            calculatedTotal += totalValue;

            return {
              id: coinInfo.id,
              name: coinInfo.name,
              symbol: coinInfo.symbol.toUpperCase(),
              amount: `${holding.amount} ${coinInfo.symbol.toUpperCase()}`,
              value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${coinInfo.price_change_percentage_24h >= 0 ? '+' : ''}${coinInfo.price_change_percentage_24h.toFixed(2)}%`,
              isPositive: coinInfo.price_change_percentage_24h >= 0,
            };
          }
          return null;
        }).filter(Boolean);

        setPortfolioAssets(updatedAssets);
        setTotalPortfolioValue(calculatedTotal);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [userHoldings]);

  return { portfolioAssets, totalPortfolioValue, loading, error };
}