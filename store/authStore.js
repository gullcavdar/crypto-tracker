import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Uygulama açıldığında kayıtlı kullanıcıyı SecureStore'dan yükle
  loadUser: async () => {
    try {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        set({ user: JSON.parse(storedData), isAuthenticated: true });
      }
    } catch (error) {
      console.error('Kullanıcı yüklenirken hata:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Kayıt ol veya Giriş yap
  login: async (userData) => {
    try {
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true });
    } catch (error) {
      console.error('Kayıt hatası:', error);
    }
  },

  // Çıkış yap
  logout: async () => {
    try {
      set({ isAuthenticated: false });
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  },
}));