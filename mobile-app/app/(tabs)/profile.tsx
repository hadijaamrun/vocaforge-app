import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import storage from '../../src/utils/storage'; 
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const dataStr = await storage.getItem('userData');
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        const userFinal = parsed?.data || parsed?.user || parsed;
        setUserData(userFinal);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await storage.removeItem('userToken');
      await storage.removeItem('userData');
      router.replace('/login');
    } catch (error) {
      // Ignore
    }
  };

  const displayUserName = userData?.name || 'Pengguna';
  const displayEmail = userData?.email || 'Tidak ada email terdaftar';
  const initialLetter = displayUserName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Saya</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{initialLetter}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="id-card-outline" size={20} color="#888888" style={styles.icon} />
              <Text style={styles.name}>{displayUserName}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={18} color="#888888" style={styles.icon} />
              <Text style={styles.email}>{displayEmail}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#FFFFFF" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Keluar Aplikasi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    minHeight: 400,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 40,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#121212',
  },
  email: {
    fontSize: 16,
    color: '#666666',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});